<?php

/**
 * Theme functions and definitions.
 */

function ww_custom_theme_assets()
{
    wp_enqueue_style(
        'ww-custom-theme-styles',
        get_stylesheet_uri(),
        array(),
        filemtime(get_theme_file_path('/style.css')) // Cache busting
    );

    wp_enqueue_style(
        'ww-custom-theme-responsive-styles',
        get_theme_file_uri('/assets/css/responsive.css'),
        array(),
        filemtime(get_theme_file_path('/assets/css/responsive.css')) // Cache busting
    );

    wp_enqueue_script(
        'ww-header-scroll',
        get_theme_file_uri('/assets/js/header-scroll.js'),
        array(),
        filemtime(get_theme_file_path('/assets/js/header-scroll.js')),
        array(
            'strategy'  => 'defer',
            'in_footer' => true,
        )
    );

    wp_enqueue_script(
        'ww-product-filter',
        get_theme_file_uri('/assets/js/product-filter.js'),
        array(),
        filemtime(get_theme_file_path('/assets/js/product-filter.js')),
        array(
            'strategy'  => 'defer',
            'in_footer' => true,
        )
    );
}
add_action('wp_enqueue_scripts', 'ww_custom_theme_assets');

function ww_woocommerce_theme_setup()
{
    add_theme_support('editor-styles');
    add_editor_style('style.css');
}
add_action('after_setup_theme', 'ww_woocommerce_theme_setup');

function ww_custom_theme_block_styles()
{
    register_block_style(
        'core/button',
        array(
            'name'  => 'secondary',
            'label' => __('Secondary', 'wovenandwoods-outlet'),
        )
    );
}
add_action('init', 'ww_custom_theme_block_styles');
