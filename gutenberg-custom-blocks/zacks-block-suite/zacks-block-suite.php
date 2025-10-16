<?php
/**
 * Plugin Name: Zack's Block Suite
 * Description: A collection of custom Gutenberg blocks
 * Version: 1.0.0
 * Author: Zack Langford
 */

function zacks_block_suite_register_blocks() {
    $blocks = array(
        'simple-static',
        'with-controls',
        'dynamic-block'
    );

    foreach ( $blocks as $block ) {
        $block_path = __DIR__ . '/blocks/' . $block;
        
        if ( file_exists( $block_path . '/render.php' ) ) {
            require_once $block_path . '/render.php';
        }
        
        if ( file_exists( $block_path . '/block.js' ) ) {
            wp_register_script(
                'zacks-' . $block,
                plugins_url( 'blocks/' . $block . '/block.js', __FILE__ ),
                array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' )
            );

            $args = array( 'editor_script' => 'zacks-' . $block );
            
            if ( $block === 'dynamic-block' ) {
                $args['render_callback'] = 'zacks_render_dynamic_block';
            }

            register_block_type( 'zacks/' . $block, $args );
        }
    }
}
add_action( 'init', 'zacks_block_suite_register_blocks' );
