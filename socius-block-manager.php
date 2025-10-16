<?php
/**
 * Plugin Name: Socius Block Manager
 * Plugin URI: https://your-website.com
 * Description: Manage Gutenberg block restrictions for different user roles with React interface. Includes Socius Pro Blocks.
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SOCIUS_BLOCK_MANAGER_VERSION', '1.0.0');
define('SOCIUS_BLOCK_MANAGER_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SOCIUS_BLOCK_MANAGER_PLUGIN_PATH', plugin_dir_path(__FILE__));

class SociusBlockManager {
    
    private $filtering_users = false; // Prevent recursive filtering
    private $available_blocks = array(); // Store available blocks
    private $used_blocks = array(); // Store blocks used on current page
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_ajax_get_blocks', array($this, 'ajax_get_blocks'));
        add_action('wp_ajax_save_block_restrictions', array($this, 'ajax_save_block_restrictions'));
        add_action('wp_ajax_get_block_restrictions', array($this, 'ajax_get_block_restrictions'));
        add_action('wp_ajax_toggle_super_admin_creation', array($this, 'ajax_toggle_super_admin_creation'));
        add_action('wp_ajax_get_super_admin_settings', array($this, 'ajax_get_super_admin_settings'));
        add_action('wp_ajax_get_available_blocks', array($this, 'ajax_get_available_blocks'));
        
        // Hook to filter available blocks in editor
        add_filter('allowed_block_types_all', array($this, 'filter_allowed_blocks'), 10, 2);
        
        // Restrict Super Admin role assignment
        add_filter('editable_roles', array($this, 'filter_editable_roles'));
        add_action('user_profile_update_errors', array($this, 'prevent_super_admin_creation'), 10, 3);
        
        // Hide Super Admin users from non-Super Admins
        add_action('pre_get_users', array($this, 'filter_users_query'));
        add_action('pre_user_query', array($this, 'filter_users_list_table'));
        add_filter('views_users', array($this, 'filter_user_count'));
        add_filter('wp_users_list_table_query_args', array($this, 'filter_list_table_args'));
        add_filter('users_list_table_query_args', array($this, 'filter_list_table_args'));
        add_action('load-users.php', array($this, 'debug_user_filtering'));
        add_action('admin_init', array($this, 'restrict_super_admin_profile_access'));
        
        // Block management
        add_action('init', array($this, 'register_block_category'));
        add_action('init', array($this, 'register_plugin_blocks'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_blocks'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_blocks'));
        add_filter('render_block', array($this, 'track_used_blocks'), 10, 2);

        // Theme Settings
        add_action('wp_ajax_get_button_styles', array($this, 'ajax_get_button_styles'));
        add_action('wp_ajax_save_button_styles', array($this, 'ajax_save_button_styles'));
        // Enqueue dynamic button styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_dynamic_button_styles'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_dynamic_button_styles'));

        // Settings Ajax
        add_action('wp_ajax_get_settings', array($this, 'ajax_get_settings'));
        add_action('wp_ajax_save_settings', array($this, 'ajax_save_settings'));

        // Add hooks to output custom scripts and CSS
        add_action('wp_head', array($this, 'output_head_scripts'), 999);
        add_action('wp_body_open', array($this, 'output_body_top_scripts'), 1);
        add_action('wp_footer', array($this, 'output_additional_css'), 998);
        add_action('wp_footer', array($this, 'output_body_bottom_scripts'), 999);

        // Socius Forms
        add_action('wp_ajax_get_socius_form_settings', array($this, 'ajax_get_socius_form_settings'));
        add_action('wp_ajax_regenerate_site_id', array($this, 'ajax_regenerate_site_id'));

        // Add the shortcode and scripts
        add_action("init", array($this, 'register_form_scripts'));
        add_shortcode('sociusform', array($this, 'display_socius_base_form_root_component'));

        // Add the filter for site ID
        add_filter("socius_form_site_id", array($this, 'get_socius_form_site_id'));

        // PPC Ajax
        add_action('wp_ajax_get_ppc_settings', array($this, 'ajax_get_ppc_settings'));
        add_action('wp_ajax_save_ppc_settings', array($this, 'ajax_save_ppc_settings'));

        // Add hook to output PPC script in footer
        add_action('wp_footer', array($this, 'output_ppc_script'), 997);
        
        register_activation_hook(__FILE__, array($this, 'activate_plugin'));
    }
    
    public function init() {
        $this->create_super_admin_role();
    }
    
    public function activate_plugin() {
        $this->create_super_admin_role();
    }
    
    public function create_super_admin_role() {
        if (!get_role('super_admin')) {
            $admin_role = get_role('administrator');
            $admin_caps = $admin_role ? $admin_role->capabilities : array();
            
            $super_admin_caps = array_merge($admin_caps, array(
                'manage_block_restrictions' => true,
                'super_admin_access' => true,
                'create_super_admins' => true
            ));
            
            add_role('super_admin', 'Super Admin', $super_admin_caps);
            
            if (!$this->super_admin_exists()) {
                update_option('socius_allow_super_admin_creation', true);
            }
        }
    }
    
    private function super_admin_exists() {
        if ($this->filtering_users) {
            return false;
        }
        
        $this->filtering_users = true;
        global $wpdb;
        $count = $wpdb->get_var(
            "SELECT COUNT(DISTINCT u.ID) 
             FROM {$wpdb->users} u 
             INNER JOIN {$wpdb->usermeta} um ON u.ID = um.user_id 
             WHERE um.meta_key = '{$wpdb->prefix}capabilities' 
             AND um.meta_value LIKE '%super_admin%'"
        );
        $this->filtering_users = false;
        
        return intval($count) > 0;
    }
    
    private function get_super_admin_count() {
        if ($this->filtering_users) {
            return 0;
        }
        
        $this->filtering_users = true;
        global $wpdb;
        $count = $wpdb->get_var(
            "SELECT COUNT(DISTINCT u.ID) 
             FROM {$wpdb->users} u 
             INNER JOIN {$wpdb->usermeta} um ON u.ID = um.user_id 
             WHERE um.meta_key = '{$wpdb->prefix}capabilities' 
             AND um.meta_value LIKE '%super_admin%'"
        );
        $this->filtering_users = false;
        
        return intval($count);
    }
    
    private function get_super_admin_ids() {
        if ($this->filtering_users) {
            return array();
        }
        
        $this->filtering_users = true;
        global $wpdb;
        $user_ids = $wpdb->get_col(
            "SELECT DISTINCT u.ID 
             FROM {$wpdb->users} u 
             INNER JOIN {$wpdb->usermeta} um ON u.ID = um.user_id 
             WHERE um.meta_key = '{$wpdb->prefix}capabilities' 
             AND um.meta_value LIKE '%super_admin%'"
        );
        $this->filtering_users = false;
        
        return array_map('intval', $user_ids);
    }
    
    private function is_current_user_super_admin() {
        $current_user = wp_get_current_user();
        if (!$current_user || !$current_user->ID) {
            return false;
        }
        
        global $wpdb;
        $meta_key = $wpdb->prefix . 'capabilities';
        $capabilities = get_user_meta($current_user->ID, $meta_key, true);
        return is_array($capabilities) && isset($capabilities['super_admin']);
    }
    
    public function filter_editable_roles($roles) {
        if (isset($roles['super_admin'])) {
            if (!$this->is_current_user_super_admin()) {
                $super_admin_exists = $this->super_admin_exists();
                $creation_allowed = get_option('socius_allow_super_admin_creation', false);
                
                if (($super_admin_exists && !$creation_allowed) || !current_user_can('administrator')) {
                    unset($roles['super_admin']);
                }
            }
        }
        
        return $roles;
    }
    
    public function filter_users_query($user_query) {
        if (!is_admin() || $this->filtering_users) {
            return;
        }
        
        global $pagenow;
        if ($pagenow !== 'users.php') {
            return;
        }
        
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return;
            }
        }
        
        $this->filtering_users = true;
        $super_admin_ids = $this->get_super_admin_ids();
        
        if (!empty($super_admin_ids)) {
            $existing_exclude = $user_query->get('exclude');
            if (is_array($existing_exclude)) {
                $exclude_ids = array_merge($existing_exclude, $super_admin_ids);
            } else {
                $exclude_ids = $super_admin_ids;
            }
            $user_query->set('exclude', $exclude_ids);
        }
        
        $this->filtering_users = false;
    }
    
    public function filter_users_list_table($user_search) {
        global $pagenow;
        
        if ($pagenow !== 'users.php' || $this->filtering_users) {
            return;
        }
        
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return;
            }
        }
        
        $this->filtering_users = true;
        global $wpdb;
        $super_admin_ids = $this->get_super_admin_ids();
        
        if (!empty($super_admin_ids)) {
            $ids_string = implode(',', $super_admin_ids);
            $user_search->query_where .= " AND {$wpdb->users}.ID NOT IN ({$ids_string})";
            
            if (strpos($user_search->query_from, 'usermeta') !== false) {
                $user_search->query_where .= " AND {$wpdb->users}.ID NOT IN (
                    SELECT DISTINCT user_id FROM {$wpdb->usermeta} 
                    WHERE meta_key = '{$wpdb->prefix}capabilities' 
                    AND meta_value LIKE '%super_admin%'
                )";
            }
            
            error_log('Socius Block Manager: Applied SQL filter to exclude Super Admin IDs: ' . $ids_string);
        }
        
        $this->filtering_users = false;
    }
    
    public function filter_list_table_args($args) {
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return $args;
            }
        }
        
        $super_admin_ids = $this->get_super_admin_ids();
        
        if (!empty($super_admin_ids)) {
            if (isset($args['exclude']) && is_array($args['exclude'])) {
                $args['exclude'] = array_merge($args['exclude'], $super_admin_ids);
            } else {
                $args['exclude'] = $super_admin_ids;
            }
        }
        
        return $args;
    }
    
    public function filter_user_count($views) {
        if ($this->filtering_users) {
            return $views;
        }
        
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return $views;
            }
        }
        
        $super_admin_count = $this->get_super_admin_count();
        
        if ($super_admin_count > 0) {
            if (isset($views['all'])) {
                preg_match('/\(([0-9,]+)\)/', $views['all'], $matches);
                if (isset($matches[1])) {
                    $current_count = intval(str_replace(',', '', $matches[1]));
                    $new_count = $current_count - $super_admin_count;
                    $views['all'] = preg_replace('/\([0-9,]+\)/', '(' . number_format_i18n($new_count) . ')', $views['all']);
                }
            }
            
            unset($views['super_admin']);
        }
        
        return $views;
    }
    
    public function restrict_super_admin_profile_access() {
        global $pagenow;
        
        if (!in_array($pagenow, ['user-edit.php', 'profile.php']) || $this->filtering_users) {
            return;
        }
        
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return;
            }
        }
        
        $editing_user_id = null;
        if ($pagenow === 'user-edit.php' && isset($_GET['user_id'])) {
            $editing_user_id = intval($_GET['user_id']);
        } elseif ($pagenow === 'profile.php') {
            $editing_user_id = get_current_user_id();
        }
        
        if ($editing_user_id) {
            $super_admin_ids = $this->get_super_admin_ids();
            if (in_array($editing_user_id, $super_admin_ids)) {
                wp_die(
                    __('You do not have permission to edit this user.', 'socius-block-manager'),
                    __('Access Denied', 'socius-block-manager'),
                    array('response' => 403)
                );
            }
        }
    }
    
    public function debug_user_filtering() {
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return;
            }
        }
        
        $super_admin_ids = $this->get_super_admin_ids();
        error_log('Socius Block Manager: Super Admin IDs to hide: ' . json_encode($super_admin_ids));
    }
    
    public function prevent_super_admin_creation($errors, $update, $user) {
        if (isset($_POST['role']) && $_POST['role'] === 'super_admin') {
            if ($this->is_current_user_super_admin()) {
                return;
            }
            
            if ($this->super_admin_exists()) {
                $creation_allowed = get_option('socius_allow_super_admin_creation', false);
                
                if (!$creation_allowed) {
                    $errors->add('super_admin_exists', 
                        __('Super Admin role is restricted. A Super Admin already exists. Contact your existing Super Admin to create additional Super Admin accounts.', 'socius-block-manager')
                    );
                }
            }
        }
        
        if (isset($_POST['role']) && $_POST['role'] === 'super_admin') {
            $max_super_admins = apply_filters('socius_max_super_admins', 3);
            $current_count = $this->get_super_admin_count();
            
            if ($current_count >= $max_super_admins && !$this->is_current_user_super_admin()) {
                $errors->add('super_admin_limit', 
                    sprintf(__('Maximum number of Super Admin users (%d) has been reached.', 'socius-block-manager'), $max_super_admins)
                );
            }
        }
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Socius Block Manager',
            'Block Manager',
            'manage_block_restrictions',
            'socius-block-manager',
            array($this, 'render_splash_page'),
            'dashicons-admin-generic',
            30
        );
        
        add_submenu_page(
            'socius-block-manager',
            'Block Restrictions',
            'Block Restrictions',
            'manage_block_restrictions',
            'socius-block-restrictions',
            array($this, 'render_block_restrictions_page')
        );

        // Test fix
        add_submenu_page(
            'socius-block-manager',
            'Block List',
            'Block List',
            'manage_options',
            'socius-block-list',
            array($this, 'render_block_list_page')
        );
        //

        // Theme Settings
        add_submenu_page(
            'socius-block-manager',
            'Theme Settings',
            'Theme Settings',
            'manage_options',
            'socius-block-theme-settings',
            array($this, 'render_theme_settings_page')
        );

        add_submenu_page(
            'socius-block-manager',
            'Settings',
            'Settings',
            'manage_options',
            'socius-block-settings',
            array($this, 'render_settings_page')
        );
        
        add_submenu_page(
            'socius-block-manager',
            'Available Blocks',
            'Available Blocks',
            'manage_options',
            'socius-available-blocks',
            array($this, 'render_available_blocks_page')
        );
    }
    
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'socius-block') === false) {
            return;
        }
        
        wp_enqueue_script(
            'socius-block-manager-react',
            SOCIUS_BLOCK_MANAGER_PLUGIN_URL . 'build/index.js',
            array('wp-element', 'wp-api-fetch', 'wp-components', 'wp-i18n'),
            SOCIUS_BLOCK_MANAGER_VERSION,
            true
        );
        
        wp_enqueue_style(
            'socius-block-manager-style',
            SOCIUS_BLOCK_MANAGER_PLUGIN_URL . 'build/style.css',
            array('wp-components'),
            SOCIUS_BLOCK_MANAGER_VERSION
        );
        
        wp_localize_script('socius-block-manager-react', 'sociusBlockManager', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('socius_block_manager_nonce'),
            'currentPage' => $_GET['page'] ?? '',
            'userRole' => $this->get_current_user_role(),
            'canManageRestrictions' => current_user_can('manage_block_restrictions')
        ));
    }
    
    public function render_splash_page() {
        echo '<div id="socius-block-manager-splash"></div>';
    }
    
    public function render_block_restrictions_page() {
        if (!current_user_can('manage_block_restrictions')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        echo '<div id="socius-block-manager-restrictions"></div>';
    }

    public function render_block_list_page() {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        echo '<div id="socius-block-manager-list"></div>';
    }

    public function render_theme_settings_page() {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        echo '<div id="socius-block-manager-theme-settings"></div>';
    }

    // Add this new method to render the settings page
    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        echo '<div id="socius-block-manager-settings"></div>';
    }
    
    public function render_available_blocks_page() {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        echo '<div id="socius-block-manager-available"></div>';
    }
    
    public function register_block_category() {
        if (function_exists('register_block_type')) {
            add_filter('block_categories_all', function($categories) {
                return array_merge(
                    array(
                        array(
                            'slug'  => 'socius-pro-blocks',
                            'title' => __('Socius Pro Blocks', 'socius-block-manager'),
                            'icon'  => 'admin-generic'
                        )
                    ),
                    $categories
                );
            }, 1);
        }
    }
    
    public function register_plugin_blocks() {
        $blocks_dir = SOCIUS_BLOCK_MANAGER_PLUGIN_PATH . 'blocks';
        
        if (!is_dir($blocks_dir)) {
            error_log('Socius: Blocks directory does not exist: ' . $blocks_dir);
            mkdir($blocks_dir, 0755, true);
            return;
        }
        
        $block_dirs = scandir($blocks_dir);
        error_log('Socius: Scanning blocks directory: ' . $blocks_dir);
        error_log('Socius: Found directories: ' . json_encode($block_dirs));
        
        foreach ($block_dirs as $block_dir) {
            if ($block_dir === '.' || $block_dir === '..') {
                continue;
            }
            
            $block_path = $blocks_dir . '/' . $block_dir;
            $block_json_path = $block_path . '/block.json';
            
            error_log('Socius: Checking block path: ' . $block_path);
            error_log('Socius: Block JSON exists: ' . (file_exists($block_json_path) ? 'yes' : 'no'));
            
            if (is_dir($block_path) && file_exists($block_json_path)) {
                // Register block without editorScript (we'll load it separately)
                $result = register_block_type($block_path);
                
                if ($result) {
                    error_log('Socius: Successfully registered block type from: ' . $block_path);
                } else {
                    error_log('Socius: FAILED to register block type from: ' . $block_path);
                }
                
                $block_json = json_decode(file_get_contents($block_json_path), true);
                if ($block_json && isset($block_json['name'])) {
                    $this->available_blocks[$block_json['name']] = array(
                        'path' => $block_path,
                        'dir' => $block_dir,
                        'data' => $block_json
                    );
                    error_log('Socius: Added to available_blocks: ' . $block_json['name']);
                }
            }
        }
        
        error_log('Socius: Total blocks registered: ' . count($this->available_blocks));
        error_log('Socius: Available blocks: ' . json_encode(array_keys($this->available_blocks)));
    }
    
    public function enqueue_editor_blocks() {
        // Enqueue the compiled blocks script
        $blocks_script = SOCIUS_BLOCK_MANAGER_PLUGIN_PATH . 'build/blocks.js';
        $blocks_asset = SOCIUS_BLOCK_MANAGER_PLUGIN_PATH . 'build/blocks.asset.php';
        
        if (file_exists($blocks_script) && file_exists($blocks_asset)) {
            $asset_data = require($blocks_asset);
            
            wp_enqueue_script(
                'socius-pro-blocks',
                SOCIUS_BLOCK_MANAGER_PLUGIN_URL . 'build/blocks.js',
                $asset_data['dependencies'],
                $asset_data['version'],
                true
            );
            
            // Pass block restrictions to JavaScript
            $restrictions = get_option('socius_block_restrictions', array());
            $is_super_admin = $this->is_current_user_super_admin();
            
            wp_localize_script('socius-pro-blocks', 'sociusBlockRestrictions', array(
                'restrictions' => $restrictions,
                'isSuperAdmin' => $is_super_admin,
                'isRestricted' => !$is_super_admin
            ));
            
            error_log('Socius: Enqueued blocks.js with restrictions');
        } else {
            error_log('Socius: blocks.js or blocks.asset.php not found');
        }
        
        // Enqueue block styles
        foreach ($this->available_blocks as $block_name => $block_info) {
            $this->enqueue_block_assets($block_info, true);
        }
    }
    
    public function enqueue_frontend_blocks() {
        if (is_admin()) {
            return;
        }
        
        global $post;
        if ($post && has_blocks($post->post_content)) {
            $blocks = parse_blocks($post->post_content);
            $this->collect_used_blocks($blocks);
            
            foreach ($this->used_blocks as $block_name) {
                if (isset($this->available_blocks[$block_name])) {
                    $this->enqueue_block_assets($this->available_blocks[$block_name], false);
                }
            }
        }
    }
    
    private function collect_used_blocks($blocks) {
        foreach ($blocks as $block) {
            if (!empty($block['blockName']) && strpos($block['blockName'], 'socius-pro-blocks/') === 0) {
                $this->used_blocks[] = $block['blockName'];
            }
            
            if (!empty($block['innerBlocks'])) {
                $this->collect_used_blocks($block['innerBlocks']);
            }
        }
    }
    
    private function enqueue_block_assets($block_info, $is_editor) {
        $block_path = $block_info['path'];
        $block_dir = $block_info['dir'];
        $block_data = $block_info['data'];
        
        $block_url = SOCIUS_BLOCK_MANAGER_PLUGIN_URL . 'blocks/' . $block_dir;
        
        if ($is_editor && !empty($block_data['editorStyle'])) {
            $style_file = str_replace('file:./', '', $block_data['editorStyle']);
            if (file_exists($block_path . '/' . $style_file)) {
                wp_enqueue_style(
                    'socius-block-' . $block_dir . '-editor',
                    $block_url . '/' . $style_file,
                    array(),
                    filemtime($block_path . '/' . $style_file)
                );
            }
        }
        
        if (!empty($block_data['style'])) {
            $style_file = str_replace('file:./', '', $block_data['style']);
            if (file_exists($block_path . '/' . $style_file)) {
                wp_enqueue_style(
                    'socius-block-' . $block_dir . '-style',
                    $block_url . '/' . $style_file,
                    array(),
                    filemtime($block_path . '/' . $style_file)
                );
            }
        }
        
        if (!$is_editor && !empty($block_data['viewScript'])) {
            $script_file = str_replace('file:./', '', $block_data['viewScript']);
            if (file_exists($block_path . '/' . $script_file)) {
                wp_enqueue_script(
                    'socius-block-' . $block_dir . '-view',
                    $block_url . '/' . $script_file,
                    array(),
                    filemtime($block_path . '/' . $script_file),
                    true
                );
            }
        }
    }
    
    public function track_used_blocks($block_content, $block) {
        if (!empty($block['blockName']) && strpos($block['blockName'], 'socius-pro-blocks/') === 0) {
            if (!in_array($block['blockName'], $this->used_blocks)) {
                $this->used_blocks[] = $block['blockName'];
            }
        }
        return $block_content;
    }
    
    public function ajax_get_available_blocks() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $blocks = $this->scan_plugin_blocks();
        error_log('Socius: Found ' . count($blocks) . ' blocks');
        error_log('Socius: Blocks data: ' . json_encode($blocks));
        wp_send_json_success($blocks);
    }
    
    private function scan_plugin_blocks() {
        $blocks_dir = SOCIUS_BLOCK_MANAGER_PLUGIN_PATH . 'blocks';
        $blocks = array();
        
        if (!is_dir($blocks_dir)) {
            return $blocks;
        }
        
        $block_dirs = scandir($blocks_dir);
        
        foreach ($block_dirs as $block_dir) {
            if ($block_dir === '.' || $block_dir === '..') {
                continue;
            }
            
            $block_path = $blocks_dir . '/' . $block_dir;
            $block_json_path = $block_path . '/block.json';
            
            if (is_dir($block_path) && file_exists($block_json_path)) {
                $block_json = json_decode(file_get_contents($block_json_path), true);
                
                if ($block_json && isset($block_json['name'])) {
                    $blocks[] = array(
                        'name' => $block_json['name'],
                        'title' => $block_json['title'] ?? $block_json['name'],
                        'description' => $block_json['description'] ?? '',
                        'category' => $block_json['category'] ?? 'common',
                        'icon' => $block_json['icon'] ?? 'block-default',
                        'keywords' => $block_json['keywords'] ?? array(),
                        'version' => $block_json['version'] ?? '1.0.0',
                        'directory' => $block_dir,
                        'variations' => $block_json['variations'] ?? array()
                    );
                }
            }
        }
        
        return $blocks;
    }
    
    public function ajax_get_blocks() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_block_restrictions')) {
            wp_die('Unauthorized');
        }
        
        $blocks = $this->scan_plugin_blocks();
        wp_send_json_success($blocks);
    }
    
    public function ajax_get_block_restrictions() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_block_restrictions')) {
            wp_die('Unauthorized');
        }
        
        $restrictions = get_option('socius_block_restrictions', array());
        wp_send_json_success($restrictions);
    }
    
    public function ajax_save_block_restrictions() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_block_restrictions')) {
            wp_die('Unauthorized');
        }
        
        $restrictions = json_decode(stripslashes($_POST['restrictions']), true);
        
        if (update_option('socius_block_restrictions', $restrictions)) {
            wp_send_json_success('Block restrictions saved successfully');
        } else {
            wp_send_json_error('Failed to save block restrictions');
        }
    }
    
    public function ajax_get_super_admin_settings() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('super_admin_access')) {
            wp_die('Unauthorized');
        }
        
        $settings = array(
            'super_admin_count' => $this->get_super_admin_count(),
            'creation_allowed' => get_option('socius_allow_super_admin_creation', false),
            'max_super_admins' => apply_filters('socius_max_super_admins', 3),
            'super_admin_users' => $this->get_super_admin_users()
        );
        
        wp_send_json_success($settings);
    }
    
    public function ajax_toggle_super_admin_creation() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('super_admin_access')) {
            wp_die('Unauthorized');
        }
        
        $allow_creation = isset($_POST['allow_creation']) && $_POST['allow_creation'] === 'true';
        
        if (update_option('socius_allow_super_admin_creation', $allow_creation)) {
            $message = $allow_creation ? 
                __('Super Admin creation is now allowed for Administrators', 'socius-block-manager') :
                __('Super Admin creation is now restricted to existing Super Admins only', 'socius-block-manager');
                
            wp_send_json_success($message);
        } else {
            wp_send_json_error(__('Failed to update Super Admin creation settings', 'socius-block-manager'));
        }
    }
    
    private function get_super_admin_users() {
        if ($this->filtering_users) {
            return array();
        }
        
        $this->filtering_users = true;
        global $wpdb;
        $users = $wpdb->get_results(
            "SELECT DISTINCT u.ID, u.display_name, u.user_email, u.user_login 
             FROM {$wpdb->users} u 
             INNER JOIN {$wpdb->usermeta} um ON u.ID = um.user_id 
             WHERE um.meta_key = '{$wpdb->prefix}capabilities' 
             AND um.meta_value LIKE '%super_admin%'"
        );
        $this->filtering_users = false;
        
        $result = array();
        foreach ($users as $user) {
            $result[] = array(
                'ID' => $user->ID,
                'display_name' => $user->display_name,
                'user_email' => $user->user_email,
                'user_login' => $user->user_login
            );
        }
        
        return $result;
    }
    
    public function filter_allowed_blocks($allowed_blocks, $block_editor_context) {
        if ($this->is_current_user_super_admin()) {
            return $allowed_blocks;
        }
        
        $restrictions = get_option('socius_block_restrictions', array());
        
        if (empty($restrictions)) {
            return $allowed_blocks;
        }
        
        $all_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
        $filtered_blocks = array();
        
        foreach ($all_blocks as $block_name => $block_type) {
            if (!isset($restrictions[$block_name]) || $restrictions[$block_name]['allowed'] === true) {
                $filtered_blocks[] = $block_name;
            }
        }
        
        return $filtered_blocks;
    }
    
    private function get_current_user_role() {
        $user = wp_get_current_user();
        return !empty($user->roles) ? $user->roles[0] : 'none';
    }

    public function ajax_get_button_styles() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $default_settings = array(
            'primary' => array(
                'background' => '#2271b1',
                'color' => '#ffffff',
                'border' => '#2271b1',
                'backgroundHover' => '#135e96',
                'colorHover' => '#ffffff',
                'borderHover' => '#135e96',
                'fontFamily' => 'inherit',
                'fontWeight' => '600',
            ),
            'secondary' => array(
                'background' => 'rgba(255, 255, 255, 0.2)',
                'color' => '#ffffff',
                'border' => 'rgba(255, 255, 255, 0.5)',
                'backgroundHover' => 'rgba(255, 255, 255, 0.3)',
                'colorHover' => '#ffffff',
                'borderHover' => 'rgba(255, 255, 255, 0.8)',
                'fontFamily' => 'inherit',
                'fontWeight' => '600',
            ),
            'outline' => array(
                'background' => 'transparent',
                'color' => '#ffffff',
                'border' => '#ffffff',
                'backgroundHover' => 'rgba(255, 255, 255, 0.1)',
                'colorHover' => '#ffffff',
                'borderHover' => '#ffffff',
                'fontFamily' => 'inherit',
                'fontWeight' => '600',
            ),
            'general' => array(
                'padding' => '15px 35px',
                'fontSize' => '1.1rem',
                'borderRadius' => '6px',
                'borderWidth' => '2px',
            ),
        );
        
        $settings = get_option('socius_button_styles', $default_settings);
        
        wp_send_json_success($settings);
    }

    public function ajax_save_button_styles() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $settings = json_decode(stripslashes($_POST['settings']), true);
        
        if (update_option('socius_button_styles', $settings)) {
            wp_send_json_success(__('Button styles saved successfully!', 'socius-block-manager'));
        } else {
            wp_send_json_error(__('Failed to save button styles', 'socius-block-manager'));
        }
    }

    // Generate dynamic CSS for button styles
    public function generate_button_styles_css() {
        $default_settings = array(
            'primary' => array(
                'background' => '#2271b1',
                'color' => '#ffffff',
                'border' => '#2271b1',
                'backgroundHover' => '#135e96',
                'colorHover' => '#ffffff',
                'borderHover' => '#135e96',
                'fontFamily' => 'inherit',
                'fontWeight' => '600',
            ),
            'secondary' => array(
                'background' => 'rgba(255, 255, 255, 0.2)',
                'color' => '#ffffff',
                'border' => 'rgba(255, 255, 255, 0.5)',
                'backgroundHover' => 'rgba(255, 255, 255, 0.3)',
                'colorHover' => '#ffffff',
                'borderHover' => 'rgba(255, 255, 255, 0.8)',
                'fontFamily' => 'inherit',
                'fontWeight' => '600',
            ),
            'outline' => array(
                'background' => 'transparent',
                'color' => '#ffffff',
                'border' => '#ffffff',
                'backgroundHover' => 'rgba(255, 255, 255, 0.1)',
                'colorHover' => '#ffffff',
                'borderHover' => '#ffffff',
                'fontFamily' => 'inherit',
                'fontWeight' => '600',
            ),
            'general' => array(
                'padding' => '15px 35px',
                'fontSize' => '1.1rem',
                'borderRadius' => '6px',
                'borderWidth' => '2px',
            ),
        );
        
        $settings = get_option('socius_button_styles', $default_settings);
        
        $css = ':root {';
        
        // Primary button variables
        $css .= '--hero-button-primary-bg: ' . esc_attr($settings['primary']['background']) . ';';
        $css .= '--hero-button-primary-color: ' . esc_attr($settings['primary']['color']) . ';';
        $css .= '--hero-button-primary-border: ' . esc_attr($settings['primary']['border']) . ';';
        $css .= '--hero-button-primary-bg-hover: ' . esc_attr($settings['primary']['backgroundHover']) . ';';
        $css .= '--hero-button-primary-color-hover: ' . esc_attr($settings['primary']['colorHover']) . ';';
        $css .= '--hero-button-primary-border-hover: ' . esc_attr($settings['primary']['borderHover']) . ';';
        $css .= '--hero-button-primary-font-family: ' . esc_attr($settings['primary']['fontFamily']) . ';';
        $css .= '--hero-button-primary-font-weight: ' . esc_attr($settings['primary']['fontWeight']) . ';';
        
        // Secondary button variables
        $css .= '--hero-button-secondary-bg: ' . esc_attr($settings['secondary']['background']) . ';';
        $css .= '--hero-button-secondary-color: ' . esc_attr($settings['secondary']['color']) . ';';
        $css .= '--hero-button-secondary-border: ' . esc_attr($settings['secondary']['border']) . ';';
        $css .= '--hero-button-secondary-bg-hover: ' . esc_attr($settings['secondary']['backgroundHover']) . ';';
        $css .= '--hero-button-secondary-color-hover: ' . esc_attr($settings['secondary']['colorHover']) . ';';
        $css .= '--hero-button-secondary-border-hover: ' . esc_attr($settings['secondary']['borderHover']) . ';';
        $css .= '--hero-button-secondary-font-family: ' . esc_attr($settings['secondary']['fontFamily']) . ';';
        $css .= '--hero-button-secondary-font-weight: ' . esc_attr($settings['secondary']['fontWeight']) . ';';
        
        // Outline button variables
        $css .= '--hero-button-outline-bg: ' . esc_attr($settings['outline']['background']) . ';';
        $css .= '--hero-button-outline-color: ' . esc_attr($settings['outline']['color']) . ';';
        $css .= '--hero-button-outline-border: ' . esc_attr($settings['outline']['border']) . ';';
        $css .= '--hero-button-outline-bg-hover: ' . esc_attr($settings['outline']['backgroundHover']) . ';';
        $css .= '--hero-button-outline-color-hover: ' . esc_attr($settings['outline']['colorHover']) . ';';
        $css .= '--hero-button-outline-border-hover: ' . esc_attr($settings['outline']['borderHover']) . ';';
        $css .= '--hero-button-outline-font-family: ' . esc_attr($settings['outline']['fontFamily']) . ';';
        $css .= '--hero-button-outline-font-weight: ' . esc_attr($settings['outline']['fontWeight']) . ';';
        
        // General button variables
        $css .= '--hero-button-padding: ' . esc_attr($settings['general']['padding']) . ';';
        $css .= '--hero-button-font-size: ' . esc_attr($settings['general']['fontSize']) . ';';
        $css .= '--hero-button-border-radius: ' . esc_attr($settings['general']['borderRadius']) . ';';
        $css .= '--hero-button-border-width: ' . esc_attr($settings['general']['borderWidth']) . ';';
        
        $css .= '}';
        
        return $css;
    }

    public function enqueue_dynamic_button_styles() {
        $custom_css = $this->generate_button_styles_css();
        wp_add_inline_style('wp-block-library', $custom_css);
    }

    // Add these new methods to the class
    public function ajax_get_settings() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $default_settings = array(
            'head_js' => '',
            'body_top_js' => '',
            'body_bottom_js' => '',
            'additional_css' => '',
        );
        
        $settings = get_option('socius_custom_scripts', $default_settings);
        
        wp_send_json_success($settings);
    }

    public function ajax_save_settings() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $settings = json_decode(stripslashes($_POST['settings']), true);
        
        // Sanitize the settings
        $sanitized_settings = array(
            'head_js' => isset($settings['head_js']) ? $settings['head_js'] : '',
            'body_top_js' => isset($settings['body_top_js']) ? $settings['body_top_js'] : '',
            'body_bottom_js' => isset($settings['body_bottom_js']) ? $settings['body_bottom_js'] : '',
            'additional_css' => isset($settings['additional_css']) ? $settings['additional_css'] : '',
        );
        
        if (update_option('socius_custom_scripts', $sanitized_settings)) {
            wp_send_json_success(__('Settings saved successfully!', 'socius-block-manager'));
        } else {
            wp_send_json_error(__('Failed to save settings', 'socius-block-manager'));
        }
    }

    public function output_head_scripts() {
        $settings = get_option('socius_custom_scripts', array());
        
        if (!empty($settings['head_js'])) {
            echo "\n<!-- Socius Custom Head Scripts -->\n";
            echo $settings['head_js'] . "\n";
        }
    }

    public function output_body_top_scripts() {
        $settings = get_option('socius_custom_scripts', array());
        
        if (!empty($settings['body_top_js'])) {
            echo "\n<!-- Socius Custom Body Top Scripts -->\n";
            echo $settings['body_top_js'] . "\n";
        }
    }

    public function output_body_bottom_scripts() {
        $settings = get_option('socius_custom_scripts', array());
        
        if (!empty($settings['body_bottom_js'])) {
            echo "\n<!-- Socius Custom Body Bottom Scripts -->\n";
            echo $settings['body_bottom_js'] . "\n";
        }
    }

    public function output_additional_css() {
        $settings = get_option('socius_custom_scripts', array());
        
        if (!empty($settings['additional_css'])) {
            echo "\n<!-- Socius Additional CSS -->\n";
            echo "<style>\n" . $settings['additional_css'] . "\n</style>\n";
        }
    }

    /* Socus Forms */
    // Socius Forms Methods
    public function ajax_get_socius_form_settings() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $settings = $this->get_or_generate_socius_form_settings();
        wp_send_json_success($settings);
    }

    public function ajax_regenerate_site_id() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $new_site_id = wp_generate_uuid4();
        $settings = array('site_id' => $new_site_id);
        
        update_option('socius_form_settings', $settings);
        
        wp_send_json_success(array(
            'site_id' => $new_site_id,
            'message' => __('Site ID regenerated successfully!', 'socius-block-manager')
        ));
    }

    private function get_or_generate_socius_form_settings() {
        $settings = get_option('socius_form_settings');
        if ($settings && isset($settings['site_id'])) {
            return $settings;
        }
        
        $new_settings = array(
            'site_id' => wp_generate_uuid4()
        );
        
        add_option('socius_form_settings', $new_settings);
        return $new_settings;
    }

    public function get_socius_form_site_id() {
        $settings = get_option('socius_form_settings');
        return $settings ? $settings['site_id'] : '';
    }

    public function register_form_scripts() {
        wp_register_script('sociusform', 'https://sociusassets.com/sociusForms.js', '', '', true);
    }

    public function display_socius_base_form_root_component($attributes) {
        $form_attributes = shortcode_atts(array(
            'product' => '',
            'formid' => '',
            'formname' => '',
            'formlocation' => '',
            'enableproductselector' => 'false',
            'submitbuttontext' => 'Submit',
            'issticky' => 'false',
            'optin' => 'false',
            'disclaimer' => 'false',
            'spamtype' => '',
            'hidelabels' => 'false',
            'buttonclasses' => '',
            'inputclasses' => '',
            'inputgroupclasses' => '',
            'stickyfirstlastname' => 'false',
            'enablecomments' => 'false',
            'enableaddress' => 'false',
            'formheading' => '',
            'aftersubmit' => '',
            'thankyouurl' => ''
        ), $attributes);

        return $this->display_socius_form_mount_component($form_attributes);
    }

    private function display_socius_form_mount_component($form_attributes) {
        global $post;
        $post_slug = $post ? htmlentities($post->post_name) : '';

        if (!has_filter("socius_form_site_id")) {
            error_log("Socius Form Plugin is missing the 'socius_form_site_id' filter.");
            return '';
        }

        $site_id = apply_filters("socius_form_site_id", null);

        wp_enqueue_script('sociusform');

        return <<<HTML
        <div 
            class="baseform"
            data-site-id="{$site_id}"
            data-page-id="{$post_slug}"
            data-product-name="{$form_attributes['product']}"
            data-form-id="{$form_attributes['formid']}"
            data-form-name="{$form_attributes['formname']}"
            data-form-location="{$form_attributes['formlocation']}" 
            data-enable-product-selector="{$form_attributes['enableproductselector']}"
            data-submit-button-text="{$form_attributes['submitbuttontext']}"
            data-sticky="{$form_attributes['issticky']}"
            data-opt-in="{$form_attributes['optin']}"
            data-disclaimer="{$form_attributes['disclaimer']}"
            data-spam-type="{$form_attributes['spamtype']}"
            data-hide-labels="{$form_attributes['hidelabels']}"
            data-button-classes="{$form_attributes['buttonclasses']}"
            data-input-classes="{$form_attributes['inputclasses']}"
            data-input-group-classes="{$form_attributes['inputgroupclasses']}"
            data-sticky-first-last-name="{$form_attributes['stickyfirstlastname']}"
            data-thankyou-url="{$form_attributes['thankyouurl']}"
            data-enable-comments="{$form_attributes['enablecomments']}"
            data-enable-address="{$form_attributes['enableaddress']}">
            <template id="formHeading">{$form_attributes['formheading']}</template>
            <template id="afterSubmit">{$form_attributes['aftersubmit']}</template>
        </div>
    HTML;
    }

    /* End Socius Forms */


    /* PPC */
    // PPC Settings Methods
    public function ajax_get_ppc_settings() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $default_settings = array(
            'enabled' => false,
            'geolocation_enabled' => false,
            'phone_swapping_enabled' => false,
            'geo_phone_swapping' => false,
        );
        
        $settings = get_option('socius_ppc_settings', $default_settings);
        
        wp_send_json_success($settings);
    }

    public function ajax_save_ppc_settings() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        $settings = json_decode(stripslashes($_POST['settings']), true);
        
        $sanitized_settings = array(
            'enabled' => isset($settings['enabled']) ? (bool)$settings['enabled'] : false,
            'geolocation_enabled' => isset($settings['geolocation_enabled']) ? (bool)$settings['geolocation_enabled'] : false,
            'phone_swapping_enabled' => isset($settings['phone_swapping_enabled']) ? (bool)$settings['phone_swapping_enabled'] : false,
            'geo_phone_swapping' => isset($settings['geo_phone_swapping']) ? (bool)$settings['geo_phone_swapping'] : false,
        );
        
        if (update_option('socius_ppc_settings', $sanitized_settings)) {
            wp_send_json_success(__('PPC settings saved successfully!', 'socius-block-manager'));
        } else {
            wp_send_json_error(__('Failed to save PPC settings', 'socius-block-manager'));
        }
    }

    public function output_ppc_script() {
        $settings = get_option('socius_ppc_settings', array('enabled' => false));
        
        if (!$settings['enabled']) {
            return;
        }
        
        $geolocation_enabled = isset($settings['geolocation_enabled']) ? $settings['geolocation_enabled'] : false;
        $phone_swapping_enabled = isset($settings['phone_swapping_enabled']) ? $settings['phone_swapping_enabled'] : false;
        $geo_phone_swapping = isset($settings['geo_phone_swapping']) ? $settings['geo_phone_swapping'] : false;
        
        ?>
        <!-- Socius PPC Tracking Script -->
        <script>
        (function() {
            'use strict';
            
            // Cookie utility functions
            function setCookie(name, value, days) {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "") + expires + "; path=/";
            }
            
            function getCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for(var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }
            
            // URL parameter function
            function getUrlParam(name) {
                var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
                if (results == null) {
                    return null;
                }
                return results[1] || 0;
            }
            
            // Setting source cookie based on URL parameter ?source=
            var paramValue = getUrlParam('source');
            if (paramValue) {
                setCookie('source', paramValue, 30);
            }
            
            // Filling forms .ppc-source field based on source cookie
            var cookieSrc = getCookie('source');
            if (cookieSrc) {
                var ppcSourceFields = document.querySelectorAll('.ppc-source');
                ppcSourceFields.forEach(function(field) {
                    field.value = cookieSrc;
                });
            }
            
            // Set referrer cookie if a referrer is found
            var referrer = 'referrer';
            
            if (!getCookie(referrer) && document.referrer) {
                setCookie(referrer, document.referrer, 30);
                
                var referrerFields = document.querySelectorAll('.referrer');
                referrerFields.forEach(function(field) {
                    field.value = document.referrer;
                });
            } else {
                console.log("No Referrer Exists");
            }
            
            // Overwrite referrer variable if URL parameter ?referrer=
            var referrerSrc = getUrlParam(referrer) ? decodeURIComponent(getUrlParam(referrer)) : getCookie(referrer);
            
            // Filling forms .referrer field based on referrer cookie
            if (referrerSrc) {
                var referrerFields = document.querySelectorAll('.referrer');
                referrerFields.forEach(function(field) {
                    field.value = referrerSrc;
                });
            }
            
            <?php if (!$geolocation_enabled) : ?>
                // Get traffic type if geolocation plugin is disabled
                var domainHost = location.host;
                var trafficType = !referrerSrc || referrerSrc.indexOf(domainHost) >= 0 ? 'direct' : 'organic';
                trafficType = cookieSrc ? 'paid' : trafficType;
                <?php else : ?>
                // Set trafficType by grabbing value from geolocation plugin
                var trafficType = typeof geo !== 'undefined' && geo.traffic_type ? geo.traffic_type : 'direct';
                <?php endif; ?>
                
                <?php if ($phone_swapping_enabled) : ?>
                /******************************
                PHONE SWAPPING FUNCTIONALITY 
                ******************************/
                // Utility function for swapping phone HTML
                function swapPhones(phone) {
                    var phoneJustNumbers = phone.replace(/[^0-9]/g, '');
                    
                    // Swap tel links
                    var telLinks = document.querySelectorAll('a[href*="tel:"]:not(.nochange)');
                    telLinks.forEach(function(link) {
                        link.setAttribute('href', 'tel:' + phoneJustNumbers);
                    });
                    
                    // Swap phone number text
                    var phoneNumbers = document.querySelectorAll('.phone-number');
                    phoneNumbers.forEach(function(element) {
                        element.textContent = phone;
                    });
                    
                    // Handle phone groups
                    var phoneGroups = document.querySelectorAll('.phone-group');
                    phoneGroups.forEach(function(group) {
                        var phoneItems = group.querySelectorAll('.phone-item:not(:first-child)');
                        phoneItems.forEach(function(item) {
                            item.style.display = 'none';
                        });
                        
                        var numberLabels = group.querySelectorAll('.phone-item .number-label');
                        numberLabels.forEach(function(label) {
                            label.style.display = 'none';
                        });
                    });
                    
                    // Hide phone2 boxes
                    var phone2Boxes = document.querySelectorAll('.phone2-box');
                    phone2Boxes.forEach(function(box) {
                        box.style.display = 'none';
                    });
                }
                
                <?php if ($geolocation_enabled && $geo_phone_swapping) : ?>
                // Default geolocation phone swapping functionality
                if (typeof geo !== 'undefined' && geo.location && geo.location.phone) {
                    swapPhones(geo.location.phone);
                }
                <?php endif; ?>
            
            <?php endif; ?>
            
        })();
        </script>
        <?php
    }

    /* End PPC */
}

// Initialize the plugin
new SociusBlockManager();
?>