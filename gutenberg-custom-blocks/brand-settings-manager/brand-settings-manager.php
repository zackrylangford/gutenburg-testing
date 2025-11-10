<?php
/**
 * Plugin Name:       Brand Settings Manager
 * Description:       Centralized brand settings for marketing sites
 * Version:           1.0.0
 * Author:            Zack Langford
 * License:           GPL-2.0-or-later
 * Text Domain:       brand-settings-manager
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Add admin menu
add_action( 'admin_menu', 'bsm_add_admin_menu' );
function bsm_add_admin_menu() {
	add_menu_page(
		'Brand Settings',
		'Brand Settings',
		'manage_options',
		'brand-settings',
		'bsm_settings_page',
		'dashicons-admin-appearance',
		30
	);
}

// Register settings
add_action( 'admin_init', 'bsm_register_settings' );
function bsm_register_settings() {
	register_setting( 'bsm_settings_group', 'bsm_logo' );
	register_setting( 'bsm_settings_group', 'bsm_primary_color' );
	register_setting( 'bsm_settings_group', 'bsm_secondary_color' );
	register_setting( 'bsm_settings_group', 'bsm_accent_color' );
	register_setting( 'bsm_settings_group', 'bsm_company_name' );
	register_setting( 'bsm_settings_group', 'bsm_phone' );
	register_setting( 'bsm_settings_group', 'bsm_email' );
	register_setting( 'bsm_settings_group', 'bsm_address' );
	register_setting( 'bsm_settings_group', 'bsm_facebook' );
	register_setting( 'bsm_settings_group', 'bsm_twitter' );
	register_setting( 'bsm_settings_group', 'bsm_instagram' );
	register_setting( 'bsm_settings_group', 'bsm_linkedin' );
}

// Settings page HTML
function bsm_settings_page() {
	?>
	<div class="wrap">
		<h1>Brand Settings Manager</h1>
		<form method="post" action="options.php">
			<?php settings_fields( 'bsm_settings_group' ); ?>
			<?php do_settings_sections( 'bsm_settings_group' ); ?>
			
			<table class="form-table">
				<tr>
					<th colspan="2"><h2>Company Information</h2></th>
				</tr>
				<tr>
					<th scope="row">Company Name</th>
					<td><input type="text" name="bsm_company_name" value="<?php echo esc_attr( get_option( 'bsm_company_name' ) ); ?>" class="regular-text" /></td>
				</tr>
				<tr>
					<th scope="row">Phone</th>
					<td><input type="text" name="bsm_phone" value="<?php echo esc_attr( get_option( 'bsm_phone' ) ); ?>" class="regular-text" /></td>
				</tr>
				<tr>
					<th scope="row">Email</th>
					<td><input type="email" name="bsm_email" value="<?php echo esc_attr( get_option( 'bsm_email' ) ); ?>" class="regular-text" /></td>
				</tr>
				<tr>
					<th scope="row">Address</th>
					<td><textarea name="bsm_address" rows="3" class="large-text"><?php echo esc_textarea( get_option( 'bsm_address' ) ); ?></textarea></td>
				</tr>
				
				<tr>
					<th colspan="2"><h2>Brand Colors</h2></th>
				</tr>
				<tr>
					<th scope="row">Primary Color</th>
					<td><input type="color" name="bsm_primary_color" value="<?php echo esc_attr( get_option( 'bsm_primary_color', '#0073aa' ) ); ?>" /></td>
				</tr>
				<tr>
					<th scope="row">Secondary Color</th>
					<td><input type="color" name="bsm_secondary_color" value="<?php echo esc_attr( get_option( 'bsm_secondary_color', '#005177' ) ); ?>" /></td>
				</tr>
				<tr>
					<th scope="row">Accent Color</th>
					<td><input type="color" name="bsm_accent_color" value="<?php echo esc_attr( get_option( 'bsm_accent_color', '#f0f0f0' ) ); ?>" /></td>
				</tr>
				
				<tr>
					<th colspan="2"><h2>Logo</h2></th>
				</tr>
				<tr>
					<th scope="row">Logo URL</th>
					<td>
						<input type="text" id="bsm_logo" name="bsm_logo" value="<?php echo esc_attr( get_option( 'bsm_logo' ) ); ?>" class="regular-text" />
						<button type="button" class="button" id="bsm_upload_logo">Upload Logo</button>
						<?php if ( get_option( 'bsm_logo' ) ) : ?>
							<br><img src="<?php echo esc_url( get_option( 'bsm_logo' ) ); ?>" style="max-width: 200px; margin-top: 10px;" />
						<?php endif; ?>
					</td>
				</tr>
				
				<tr>
					<th colspan="2"><h2>Social Media</h2></th>
				</tr>
				<tr>
					<th scope="row">Facebook URL</th>
					<td><input type="url" name="bsm_facebook" value="<?php echo esc_attr( get_option( 'bsm_facebook' ) ); ?>" class="regular-text" /></td>
				</tr>
				<tr>
					<th scope="row">Twitter URL</th>
					<td><input type="url" name="bsm_twitter" value="<?php echo esc_attr( get_option( 'bsm_twitter' ) ); ?>" class="regular-text" /></td>
				</tr>
				<tr>
					<th scope="row">Instagram URL</th>
					<td><input type="url" name="bsm_instagram" value="<?php echo esc_attr( get_option( 'bsm_instagram' ) ); ?>" class="regular-text" /></td>
				</tr>
				<tr>
					<th scope="row">LinkedIn URL</th>
					<td><input type="url" name="bsm_linkedin" value="<?php echo esc_attr( get_option( 'bsm_linkedin' ) ); ?>" class="regular-text" /></td>
				</tr>
			</table>
			
			<?php submit_button(); ?>
		</form>
	</div>
	
	<script>
	jQuery(document).ready(function($) {
		$('#bsm_upload_logo').click(function(e) {
			e.preventDefault();
			var image = wp.media({ 
				title: 'Upload Logo',
				multiple: false
			}).open()
			.on('select', function(e){
				var uploaded_image = image.state().get('selection').first();
				var image_url = uploaded_image.toJSON().url;
				$('#bsm_logo').val(image_url);
			});
		});
	});
	</script>
	<?php
}

// Enqueue media uploader
add_action( 'admin_enqueue_scripts', 'bsm_enqueue_media' );
function bsm_enqueue_media( $hook ) {
	if ( 'toplevel_page_brand-settings' !== $hook ) {
		return;
	}
	wp_enqueue_media();
}
