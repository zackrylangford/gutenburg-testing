<?php
/**
 * Plugin Name:       Zacks React Suite
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Zack Langford
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       zacks-react-suite
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_zacks_react_suite_block_init() {
	// Register testimonial block
	wp_register_script(
		'testimonial-block-editor',
		plugins_url( 'src/testimonial-block/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' )
	);
	
	register_block_type( 'create-block/testimonial', array(
		'editor_script' => 'testimonial-block-editor',
	) );
	
	// Register marketing CTA block
	wp_register_script(
		'marketing-cta-block-editor',
		plugins_url( 'src/zacks-react-suite/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' )
	);
	
	register_block_type( 'create-block/zacks-react-suite', array(
		'editor_script' => 'marketing-cta-block-editor',
	) );
}
add_action( 'init', 'create_block_zacks_react_suite_block_init' );
