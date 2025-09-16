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
        add_action('admin_notices', array($this, 'super_admin_creation_notices'));
        
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
        $super_admins = get_users(array(
            'role' => 'super_admin',
            'number' => 1,
            'fields' => 'ID'
        ));
        
        return !empty($super_admins);
    }
    
    /**
     * Get count of Super Admin users
     */
    private function get_super_admin_count() {
        $super_admins = get_users(array(
            'role' => 'super_admin',
            'fields' => 'ID'
        ));
        
        return count($super_admins);
    }
    
    /**
     * Filter available roles based on permissions
     */
    public function filter_editable_roles($roles) {
        $current_user = wp_get_current_user();
        
        // If Super Admin role exists in the roles array
        if (isset($roles['super_admin'])) {
            // Only show Super Admin role to:
            // 1. Current Super Admins (so they can manage existing Super Admins)
            // 2. Administrators, but only if no Super Admin exists yet OR if Super Admin creation is explicitly allowed
            if (!current_user_can('super_admin_access')) {
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
     * Prevent Super Admin creation under certain conditions
     */
    public function prevent_super_admin_creation($errors, $update, $user) {
        // Only check if this is a role change to Super Admin
        if (isset($_POST['role']) && $_POST['role'] === 'super_admin') {
            $current_user = wp_get_current_user();
            
            // Allow if current user is Super Admin
            if (current_user_can('super_admin_access')) {
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
            
            if ($current_count >= $max_super_admins && !current_user_can('super_admin_access')) {
                $errors->add('super_admin_limit', 
                    sprintf(__('Maximum number of Super Admin users (%d) has been reached.', 'socius-block-manager'), $max_super_admins)
                );
            }
        }
    }
    
    /**
     * Display admin notices about Super Admin creation
     */
    public function super_admin_creation_notices() {
        $screen = get_current_screen();
        
        // Only show on user edit/profile pages
        if (!$screen || !in_array($screen->id, ['user-edit', 'profile', 'users'])) {
            return;
        }
        
        // Show notice to administrators about Super Admin restrictions
        if (current_user_can('administrator') && !current_user_can('super_admin_access')) {
            $super_admin_exists = $this->super_admin_exists();
            $creation_allowed = get_option('socius_allow_super_admin_creation', false);
            
            if ($super_admin_exists && !$creation_allowed) {
                echo '<div class="notice notice-info"><p>';
                echo '<strong>' . __('Socius Block Manager:', 'socius-block-manager') . '</strong> ';
                echo __('Super Admin role creation is restricted. Contact your existing Super Admin to create additional Super Admin accounts.', 'socius-block-manager');
                echo '</p></div>';
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
        $super_admins = get_users(array(
            'role' => 'super_admin',
            'fields' => array('ID', 'display_name', 'user_email', 'user_login')
        ));
        
        $users = array();
        foreach ($super_admins as $user) {
            $users[] = array(
                'ID' => $user->ID,
                'display_name' => $user->display_name,
                'user_email' => $user->user_email,
                'user_login' => $user->user_login
            );
        }
        
        return $users;
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
        if (current_user_can('super_admin_access')) {
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