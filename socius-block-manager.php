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
}

// Initialize the plugin
new SociusBlockManager();
?>