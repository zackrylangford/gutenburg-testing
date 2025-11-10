<?php
/**
 * Plugin Name:       Brand Info Block
 * Description:       Display brand information from Brand Settings Manager
 * Version:           1.0.0
 * Author:            Zack Langford
 * License:           GPL-2.0-or-later
 * Text Domain:       brand-info
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function create_block_brand_info_block_init() {
	register_block_type( __DIR__ . '/build/brand-info', array(
		'render_callback' => 'render_brand_info_block',
	) );
}
add_action( 'init', 'create_block_brand_info_block_init' );

// Pass brand settings to editor
add_action( 'enqueue_block_editor_assets', 'brand_info_editor_assets' );
function brand_info_editor_assets() {
	wp_localize_script(
		'wp-blocks',
		'brandSettings',
		array(
			'logo' => get_option( 'bsm_logo', '' ),
			'companyName' => get_option( 'bsm_company_name', 'Company Name' ),
			'phone' => get_option( 'bsm_phone', '' ),
			'email' => get_option( 'bsm_email', '' ),
			'address' => get_option( 'bsm_address', '' ),
			'facebook' => get_option( 'bsm_facebook', '' ),
			'twitter' => get_option( 'bsm_twitter', '' ),
			'instagram' => get_option( 'bsm_instagram', '' ),
			'linkedin' => get_option( 'bsm_linkedin', '' ),
		)
	);
}

function render_brand_info_block( $attributes ) {
	$show_logo = isset( $attributes['showLogo'] ) ? $attributes['showLogo'] : true;
	$show_contact = isset( $attributes['showContact'] ) ? $attributes['showContact'] : true;
	$show_social = isset( $attributes['showSocial'] ) ? $attributes['showSocial'] : true;
	
	$logo = get_option( 'bsm_logo' );
	$company_name = get_option( 'bsm_company_name', 'Company Name' );
	$phone = get_option( 'bsm_phone' );
	$email = get_option( 'bsm_email' );
	$address = get_option( 'bsm_address' );
	$facebook = get_option( 'bsm_facebook' );
	$twitter = get_option( 'bsm_twitter' );
	$instagram = get_option( 'bsm_instagram' );
	$linkedin = get_option( 'bsm_linkedin' );
	
	ob_start();
	?>
	<div class="wp-block-create-block-brand-info" style="text-align: center; padding: 30px;">
		<?php if ( $show_logo && $logo ) : ?>
			<img src="<?php echo esc_url( $logo ); ?>" alt="<?php echo esc_attr( $company_name ); ?>" style="max-width: 200px; margin-bottom: 20px;" />
		<?php endif; ?>
		
		<h3><?php echo esc_html( $company_name ); ?></h3>
		
		<?php if ( $show_contact ) : ?>
			<div style="margin-top: 20px;">
				<?php if ( $phone ) : ?>
					<p>📞 <?php echo esc_html( $phone ); ?></p>
				<?php endif; ?>
				<?php if ( $email ) : ?>
					<p>✉️ <a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a></p>
				<?php endif; ?>
				<?php if ( $address ) : ?>
					<p>📍 <?php echo esc_html( $address ); ?></p>
				<?php endif; ?>
			</div>
		<?php endif; ?>
		
		<?php if ( $show_social && ( $facebook || $twitter || $instagram || $linkedin ) ) : ?>
			<div style="margin-top: 20px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
				<?php if ( $facebook ) : ?>
					<a href="<?php echo esc_url( $facebook ); ?>" target="_blank" rel="noopener">Facebook</a>
				<?php endif; ?>
				<?php if ( $twitter ) : ?>
					<a href="<?php echo esc_url( $twitter ); ?>" target="_blank" rel="noopener">Twitter</a>
				<?php endif; ?>
				<?php if ( $instagram ) : ?>
					<a href="<?php echo esc_url( $instagram ); ?>" target="_blank" rel="noopener">Instagram</a>
				<?php endif; ?>
				<?php if ( $linkedin ) : ?>
					<a href="<?php echo esc_url( $linkedin ); ?>" target="_blank" rel="noopener">LinkedIn</a>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>
	<?php
	return ob_get_clean();
}
