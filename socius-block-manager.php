<?php
/**
 * Plugin Name: Socius Block Manager
 * Plugin URI: https://your-website.com
 * Description: Manage Gutenberg block restrictions for different user roles with React interface
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
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_ajax_get_blocks', array($this, 'ajax_get_blocks'));
        add_action('wp_ajax_save_block_restrictions', array($this, 'ajax_save_block_restrictions'));
        add_action('wp_ajax_get_block_restrictions', array($this, 'ajax_get_block_restrictions'));
        add_action('wp_ajax_toggle_super_admin_creation', array($this, 'ajax_toggle_super_admin_creation'));
        add_action('wp_ajax_get_super_admin_settings', array($this, 'ajax_get_super_admin_settings'));
        
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
        
        register_activation_hook(__FILE__, array($this, 'activate_plugin'));
    }
    
    public function init() {
        $this->create_super_admin_role();
    }
    
    public function activate_plugin() {
        $this->create_super_admin_role();
    }
    
    public function create_super_admin_role() {
        // Check if Super Admin role already exists
        if (!get_role('super_admin')) {
            // Get administrator capabilities as base
            $admin_role = get_role('administrator');
            $admin_caps = $admin_role ? $admin_role->capabilities : array();
            
            // Add custom capabilities for Super Admin
            $super_admin_caps = array_merge($admin_caps, array(
                'manage_block_restrictions' => true,
                'super_admin_access' => true,
                'create_super_admins' => true  // Special capability for creating other super admins
            ));
            
            // Create the Super Admin role
            add_role('super_admin', 'Super Admin', $super_admin_caps);
            
            // If no Super Admin exists yet, allow the first one to be created
            if (!$this->super_admin_exists()) {
                update_option('socius_allow_super_admin_creation', true);
            }
        }
    }
    
    /**
     * Check if any Super Admin users exist
     */
    private function super_admin_exists() {
        // Prevent recursive calls during user filtering
        if ($this->filtering_users) {
            return false;
        }
        
        $this->filtering_users = true;
        
        // Use direct database query to avoid capability checks
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
    
    /**
     * Get count of Super Admin users
     */
    private function get_super_admin_count() {
        // Prevent recursive calls during user filtering
        if ($this->filtering_users) {
            return 0;
        }
        
        $this->filtering_users = true;
        
        // Use direct database query to avoid capability checks
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
    
    /**
     * Get Super Admin user IDs
     */
    private function get_super_admin_ids() {
        // Prevent recursive calls during user filtering
        if ($this->filtering_users) {
            return array();
        }
        
        $this->filtering_users = true;
        
        // Use direct database query to avoid capability checks
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
    
    /**
     * Check if current user is Super Admin without triggering capability loops
     */
    private function is_current_user_super_admin() {
        $current_user = wp_get_current_user();
        if (!$current_user || !$current_user->ID) {
            return false;
        }
        
        // Get the correct capabilities meta key
        global $wpdb;
        $meta_key = $wpdb->prefix . 'capabilities';
        
        // Check directly in user meta to avoid capability loops
        $capabilities = get_user_meta($current_user->ID, $meta_key, true);
        return is_array($capabilities) && isset($capabilities['super_admin']);
    }
    
    /**
     * Filter available roles based on permissions
     */
    public function filter_editable_roles($roles) {
        // If Super Admin role exists in the roles array
        if (isset($roles['super_admin'])) {
            // Only show Super Admin role to current Super Admins or during initial setup
            if (!$this->is_current_user_super_admin()) {
                $super_admin_exists = $this->super_admin_exists();
                $creation_allowed = get_option('socius_allow_super_admin_creation', false);
                
                // Hide Super Admin role if:
                // - Super Admin already exists AND creation is not explicitly allowed
                // - User is not an administrator
                if (($super_admin_exists && !$creation_allowed) || !current_user_can('administrator')) {
                    unset($roles['super_admin']);
                }
            }
        }
        
        return $roles;
    }
    
    /**
     * Filter users query to hide Super Admin users from non-Super Admins
     */
    public function filter_users_query($user_query) {
        // Only filter on admin pages and prevent recursive filtering
        if (!is_admin() || $this->filtering_users) {
            return;
        }
        
        // Only filter on users.php page or user lists
        global $pagenow;
        if ($pagenow !== 'users.php') {
            return;
        }
        
        // Don't filter for Super Admins - use a simpler check to avoid function call issues
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return; // Current user is Super Admin, don't filter
            }
        }
        
        $this->filtering_users = true;
        
        // Get all Super Admin user IDs using direct query
        $super_admin_ids = $this->get_super_admin_ids();
        
        if (!empty($super_admin_ids)) {
            // Add exclude parameter to the user query
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
    
    /**
     * Additional filter for user list table - more aggressive approach
     */
    public function filter_users_list_table($user_search) {
        global $pagenow;
        
        // Only filter on users.php page and prevent recursive filtering
        if ($pagenow !== 'users.php' || $this->filtering_users) {
            return;
        }
        
        // Don't filter for Super Admins
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return; // Current user is Super Admin, don't filter
            }
        }
        
        $this->filtering_users = true;
        
        global $wpdb;
        
        // Get all Super Admin user IDs using direct query
        $super_admin_ids = $this->get_super_admin_ids();
        
        if (!empty($super_admin_ids)) {
            $ids_string = implode(',', $super_admin_ids);
            $user_search->query_where .= " AND {$wpdb->users}.ID NOT IN ({$ids_string})";
        }
        
        $this->filtering_users = false;
    }
    
    /**
     * Debug user filtering to see what's happening
     */
    public function debug_user_filtering() {
        // Don't debug for Super Admins
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return; // Current user is Super Admin, don't debug
            }
        }
        
        // Get Super Admin IDs for debugging
        // $super_admin_ids = $this->get_super_admin_ids();
        // error_log('Socius Block Manager: Super Admin IDs to hide: ' . json_encode($super_admin_ids));
        // error_log('Socius Block Manager: Current user ID: ' . get_current_user_id());
        // error_log('Socius Block Manager: Current user capabilities: ' . json_encode($capabilities ?? 'none'));
    }
    
    /**
     * Filter the query arguments for the users list table
     */
    public function filter_list_table_args($args) {
        // Don't filter for Super Admins
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return $args; // Current user is Super Admin, don't filter
            }
        }
        
        // Get all Super Admin user IDs
        $super_admin_ids = $this->get_super_admin_ids();
        
        if (!empty($super_admin_ids)) {
            // Add exclude parameter to the args
            if (isset($args['exclude']) && is_array($args['exclude'])) {
                $args['exclude'] = array_merge($args['exclude'], $super_admin_ids);
            } else {
                $args['exclude'] = $super_admin_ids;
            }
            
            // error_log('Socius Block Manager: Modified args with exclude: ' . json_encode($args['exclude']));
        }
        
        return $args;
    }
    
    /**
     * Hide Super Admin users from user count
     */
    public function filter_user_count($views) {
        // Prevent recursive filtering
        if ($this->filtering_users) {
            return $views;
        }
        
        // Don't filter for Super Admins - use direct check
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return $views; // Current user is Super Admin, don't filter
            }
        }
        
        // Get Super Admin count
        $super_admin_count = $this->get_super_admin_count();
        
        if ($super_admin_count > 0) {
            // Adjust the 'all' count
            if (isset($views['all'])) {
                preg_match('/\(([0-9,]+)\)/', $views['all'], $matches);
                if (isset($matches[1])) {
                    $current_count = intval(str_replace(',', '', $matches[1]));
                    $new_count = $current_count - $super_admin_count;
                    $views['all'] = preg_replace('/\([0-9,]+\)/', '(' . number_format_i18n($new_count) . ')', $views['all']);
                }
            }
            
            // Remove Super Admin role from views if it exists
            unset($views['super_admin']);
        }
        
        return $views;
    }
    
    /**
     * Prevent access to Super Admin user profiles by non-Super Admins
     */
    public function restrict_super_admin_profile_access() {
        global $pagenow;
        
        // Check if we're on user-edit.php or profile.php
        if (!in_array($pagenow, ['user-edit.php', 'profile.php']) || $this->filtering_users) {
            return;
        }
        
        // Don't restrict Super Admins - use direct check
        $current_user = wp_get_current_user();
        if ($current_user && $current_user->ID) {
            global $wpdb;
            $meta_key = $wpdb->prefix . 'capabilities';
            $capabilities = get_user_meta($current_user->ID, $meta_key, true);
            if (is_array($capabilities) && isset($capabilities['super_admin'])) {
                return; // Current user is Super Admin, don't restrict
            }
        }
        
        // Get the user ID being edited
        $editing_user_id = null;
        if ($pagenow === 'user-edit.php' && isset($_GET['user_id'])) {
            $editing_user_id = intval($_GET['user_id']);
        } elseif ($pagenow === 'profile.php') {
            $editing_user_id = get_current_user_id();
        }
        
        if ($editing_user_id) {
            $super_admin_ids = $this->get_super_admin_ids();
            if (in_array($editing_user_id, $super_admin_ids)) {
                // If trying to edit a Super Admin profile and not a Super Admin yourself
                wp_die(
                    __('You do not have permission to edit this user.', 'socius-block-manager'),
                    __('Access Denied', 'socius-block-manager'),
                    array('response' => 403)
                );
            }
        }
    }
    
    /**
     * Prevent Super Admin creation under certain conditions
     */
    public function prevent_super_admin_creation($errors, $update, $user) {
        // Only check if this is a role change to Super Admin
        if (isset($_POST['role']) && $_POST['role'] === 'super_admin') {
            // Allow if current user is Super Admin
            if ($this->is_current_user_super_admin()) {
                return;
            }
            
            // Check if Super Admin already exists
            if ($this->super_admin_exists()) {
                $creation_allowed = get_option('socius_allow_super_admin_creation', false);
                
                if (!$creation_allowed) {
                    $errors->add('super_admin_exists', 
                        __('Super Admin role is restricted. A Super Admin already exists. Contact your existing Super Admin to create additional Super Admin accounts.', 'socius-block-manager')
                    );
                }
            }
        }
        
        // Check for maximum Super Admin limit (optional safety measure)
        if (isset($_POST['role']) && $_POST['role'] === 'super_admin') {
            $max_super_admins = apply_filters('socius_max_super_admins', 3); // Default limit of 3
            $current_count = $this->get_super_admin_count();
            
            if ($current_count >= $max_super_admins && !$this->is_current_user_super_admin()) {
                $errors->add('super_admin_limit', 
                    sprintf(__('Maximum number of Super Admin users (%d) has been reached.', 'socius-block-manager'), $max_super_admins)
                );
            }
        }
    }
    
    public function add_admin_menu() {
        // Main menu page (splash page)
        add_menu_page(
            'Socius Block Manager',
            'Block Manager',
            'manage_block_restrictions',
            'socius-block-manager',
            array($this, 'render_splash_page'),
            'dashicons-admin-generic',
            30
        );
        
        // Submenu for block restrictions
        add_submenu_page(
            'socius-block-manager',
            'Block Restrictions',
            'Block Restrictions',
            'manage_block_restrictions',
            'socius-block-restrictions',
            array($this, 'render_block_restrictions_page')
        );
    }
    
    public function enqueue_admin_scripts($hook) {
        // Only load on our admin pages
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
        
        // Localize script with data
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
    
    public function ajax_get_blocks() {
        check_ajax_referer('socius_block_manager_nonce', 'nonce');
        
        if (!current_user_can('manage_block_restrictions')) {
            wp_die('Unauthorized');
        }
        
        $blocks = $this->scan_theme_blocks();
        
        // Also get variations from WordPress block registry (for JS-defined variations)
        $blocks_with_registry_variations = $this->merge_with_registry_variations($blocks);
        
        wp_send_json_success($blocks_with_registry_variations);
    }
    
    private function merge_with_registry_variations($blocks) {
        // Get all registered blocks from WordPress
        $registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
        
        foreach ($blocks as &$block) {
            $block_name = $block['name'];
            
            // Check if this block is registered and has variations
            if (isset($registered_blocks[$block_name])) {
                $registered_block = $registered_blocks[$block_name];
                
                // Try to get variations from the registered block
                // Note: This might not work as variations are often client-side only
                if (property_exists($registered_block, 'variations')) {
                    $registry_variations = $registered_block->variations;
                    if (!empty($registry_variations)) {
                        error_log("Found registry variations for {$block_name}: " . json_encode($registry_variations));
                        
                        // Merge with existing variations
                        $existing_variations = $block['variations'] ?? array();
                        $merged_variations = array_merge($existing_variations, $registry_variations);
                        $block['variations'] = $merged_variations;
                    }
                }
            }
        }
        
        return $blocks;
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
        // Prevent recursive calls during user filtering
        if ($this->filtering_users) {
            return array();
        }
        
        $this->filtering_users = true;
        
        // Use direct database query to get Super Admin users
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
    
    private function scan_theme_blocks() {
        $blocks_dir = get_template_directory() . '/blocks';
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
                $block_json_content = file_get_contents($block_json_path);
                $block_json = json_decode($block_json_content, true);
                
                // Debug: Log the block.json content
                error_log("Block JSON for {$block_dir}: " . $block_json_content);
                
                if ($block_json && isset($block_json['name'])) {
                    $block_data = array(
                        'name' => $block_json['name'],
                        'title' => $block_json['title'] ?? $block_json['name'],
                        'description' => $block_json['description'] ?? '',
                        'category' => $block_json['category'] ?? 'common',
                        'variations' => array(),
                        'directory' => $block_dir
                    );
                    
                    // Check multiple possible locations for variations
                    $variations = array();
                    
                    // 1. Direct variations in block.json
                    if (isset($block_json['variations']) && is_array($block_json['variations'])) {
                        $variations = array_merge($variations, $block_json['variations']);
                        error_log("Found variations in block.json for {$block_dir}: " . json_encode($block_json['variations']));
                    }
                    
                    // 2. Check for variations.json file
                    $variations_json_path = $block_path . '/variations.json';
                    if (file_exists($variations_json_path)) {
                        $variations_content = file_get_contents($variations_json_path);
                        $variations_json = json_decode($variations_content, true);
                        if ($variations_json && is_array($variations_json)) {
                            $variations = array_merge($variations, $variations_json);
                            error_log("Found variations.json for {$block_dir}: " . $variations_content);
                        }
                    }
                    
                    // 3. Check for variations directory
                    $variations_dir = $block_path . '/variations';
                    if (is_dir($variations_dir)) {
                        $variation_files = scandir($variations_dir);
                        foreach ($variation_files as $variation_file) {
                            if (pathinfo($variation_file, PATHINFO_EXTENSION) === 'json') {
                                $variation_path = $variations_dir . '/' . $variation_file;
                                $variation_content = file_get_contents($variation_path);
                                $variation_data = json_decode($variation_content, true);
                                if ($variation_data) {
                                    $variations[] = $variation_data;
                                    error_log("Found variation file {$variation_file} for {$block_dir}: " . $variation_content);
                                }
                            }
                        }
                    }
                    
                    // 4. Look for variations defined in JavaScript files
                    $possible_js_files = array(
                        $block_path . '/src/variations.js',
                        $block_path . '/variations.js',
                        $block_path . '/src/index.js'
                    );
                    
                    foreach ($possible_js_files as $js_file) {
                        if (file_exists($js_file)) {
                            $js_content = file_get_contents($js_file);
                            // Look for variations array in JavaScript
                            if (preg_match('/variations\s*:\s*\[(.*?)\]/s', $js_content, $matches)) {
                                error_log("Found variations in JS file {$js_file} for {$block_dir}");
                                // This is a simplified parser - you might need more sophisticated parsing
                                // For now, we'll just log that we found it
                            }
                        }
                    }
                    
                    // Process variations
                    if (!empty($variations)) {
                        $processed_variations = array();
                        foreach ($variations as $variation) {
                            if (is_array($variation)) {
                                $processed_variation = array(
                                    'name' => $variation['name'] ?? 'unnamed-variation',
                                    'title' => $variation['title'] ?? $variation['name'] ?? 'Untitled Variation',
                                    'description' => $variation['description'] ?? ''
                                );
                                
                                // Additional properties that might be useful
                                if (isset($variation['attributes'])) {
                                    $processed_variation['attributes'] = $variation['attributes'];
                                }
                                if (isset($variation['innerBlocks'])) {
                                    $processed_variation['innerBlocks'] = $variation['innerBlocks'];
                                }
                                if (isset($variation['scope'])) {
                                    $processed_variation['scope'] = $variation['scope'];
                                }
                                
                                $processed_variations[] = $processed_variation;
                            }
                        }
                        $block_data['variations'] = $processed_variations;
                        
                        error_log("Processed " . count($processed_variations) . " variations for {$block_dir}");
                    } else {
                        error_log("No variations found for {$block_dir}");
                    }
                    
                    $blocks[] = $block_data;
                }
            }
        }
        
        error_log("Total blocks found: " . count($blocks));
        return $blocks;
    }
    
    public function filter_allowed_blocks($allowed_blocks, $block_editor_context) {
        // Only apply restrictions to non-super-admin users
        if ($this->is_current_user_super_admin()) {
            return $allowed_blocks;
        }
        
        $restrictions = get_option('socius_block_restrictions', array());
        
        if (empty($restrictions)) {
            return $allowed_blocks;
        }
        
        // Get all registered blocks
        $all_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
        $filtered_blocks = array();
        
        foreach ($all_blocks as $block_name => $block_type) {
            // Check if this block is restricted
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