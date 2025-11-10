<?php
/**
 * Plugin Name:       Contact Form Block
 * Description:       Contact form that integrates with Lead Manager
 * Version:           1.0.0
 * Author:            Zack Langford
 * License:           GPL-2.0-or-later
 * Text Domain:       contact-form
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function create_block_contact_form_block_init() {
	register_block_type( __DIR__ . '/build/contact-form', array(
		'render_callback' => 'render_contact_form_block',
	) );
}
add_action( 'init', 'create_block_contact_form_block_init' );

function render_contact_form_block( $attributes ) {
	$unique_id = 'lm-form-' . uniqid();
	
	ob_start();
	?>
	<div class="wp-block-create-block-contact-form" style="max-width: 600px; margin: 0 auto; padding: 30px;">
		<form id="<?php echo $unique_id; ?>" class="lm-contact-form">
			<?php wp_nonce_field( 'lm_form_nonce', 'lm_nonce' ); ?>
			<div style="margin-bottom: 15px;">
				<input type="text" name="name" placeholder="Your Name *" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px;" />
			</div>
			<div style="margin-bottom: 15px;">
				<input type="email" name="email" placeholder="Your Email *" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px;" />
			</div>
			<div style="margin-bottom: 15px;">
				<input type="tel" name="phone" placeholder="Your Phone" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px;" />
			</div>
			<div style="margin-bottom: 15px;">
				<textarea name="message" placeholder="Your Message *" required rows="5" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px;"></textarea>
			</div>
			<button type="submit" style="padding: 12px 30px; background-color: #0073aa; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">Submit</button>
			<div class="lm-form-message" style="margin-top: 15px; padding: 10px; border-radius: 4px; display: none;"></div>
		</form>
	</div>
	
	<script>
	(function() {
		const form = document.getElementById('<?php echo $unique_id; ?>');
		if (!form) return;
		
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			
			const formData = new FormData(form);
			formData.append('action', 'lm_submit_form');
			formData.append('nonce', form.querySelector('[name="lm_nonce"]').value);
			
			const button = form.querySelector('button[type="submit"]');
			const message = form.querySelector('.lm-form-message');
			button.disabled = true;
			button.textContent = 'Sending...';
			
			fetch('<?php echo admin_url( 'admin-ajax.php' ); ?>', {
				method: 'POST',
				body: formData
			})
			.then(response => response.json())
			.then(data => {
				message.style.display = 'block';
				if (data.success) {
					message.style.backgroundColor = '#d4edda';
					message.style.color = '#155724';
					message.textContent = data.data.message;
					form.reset();
				} else {
					message.style.backgroundColor = '#f8d7da';
					message.style.color = '#721c24';
					message.textContent = 'Error: ' + data.data;
				}
				button.disabled = false;
				button.textContent = 'Submit';
			})
			.catch(error => {
				message.style.display = 'block';
				message.style.backgroundColor = '#f8d7da';
				message.style.color = '#721c24';
				message.textContent = 'Error submitting form';
				button.disabled = false;
				button.textContent = 'Submit';
			});
		});
	})();
	</script>
	<?php
	return ob_get_clean();
}
