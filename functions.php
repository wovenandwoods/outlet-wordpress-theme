<?php
/**
 * Theme functions and definitions.
 */

function my_custom_theme_assets() {
    // 1. Enqueue your style.css for the live site
    wp_enqueue_style(
        'my-custom-theme-styles', // Unique handle
        get_stylesheet_uri(),      // Automatically points to your root style.css
        array(), 
        filemtime( get_theme_file_path( '/style.css' ) ) // Cache busting
    );

    // 2. Enqueue the header scroll script (from earlier)
    wp_enqueue_script(
        'header-scroll',
        get_theme_file_uri( '/assets/js/header-scroll.js' ),
        array(),
        filemtime( get_theme_file_path( '/assets/js/header-scroll.js' ) ),
        array(
            'strategy'  => 'defer',
            'in_footer' => true,
        )
    );
}
add_action( 'wp_enqueue_scripts', 'my_custom_theme_assets' );

// Keep your editor styles hook exactly as it was
function my_woocommerce_theme_setup() {
    add_theme_support( 'editor-styles' );
    add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'my_woocommerce_theme_setup' );