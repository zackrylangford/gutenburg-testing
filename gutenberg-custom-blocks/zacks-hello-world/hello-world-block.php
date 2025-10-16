<?php
/**
 * Plugin Name: Zack's Hello World (No Build)
 * Description: A simple Gutenberg block
 * Version: 1.0.0
 * Author: Zack Langford
 * Plugin URI: https://zackrylangford.com
 */

function hello_world_block_init() {
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'hello_world_block_init' );

function hello_world_block_register() {
    wp_register_script(
        'hello-world-block-editor',
        plugins_url( 'block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' )
    );

    register_block_type( 'custom/hello-world', array(
        'editor_script' => 'hello-world-block-editor',
    ) );
}
add_action( 'init', 'hello_world_block_register' );
