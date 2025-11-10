<?php
/**
 * Plugin Name:       Lead Manager
 * Description:       Contact form and lead management system
 * Version:           1.0.0
 * Author:            Zack Langford
 * License:           GPL-2.0-or-later
 * Text Domain:       lead-manager
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Create database table on activation
register_activation_hook( __FILE__, 'lm_create_table' );
function lm_create_table() {
	global $wpdb;
	$table_name = $wpdb->prefix . 'leads';
	$charset_collate = $wpdb->get_charset_collate();

	$sql = "CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		name varchar(100) NOT NULL,
		email varchar(100) NOT NULL,
		phone varchar(20),
		message text,
		status varchar(20) DEFAULT 'unread',
		created_at datetime DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY  (id)
	) $charset_collate;";

	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	dbDelta( $sql );
}

// Add admin menu
add_action( 'admin_menu', 'lm_add_admin_menu' );
function lm_add_admin_menu() {
	add_menu_page(
		'Lead Manager',
		'Leads',
		'manage_options',
		'lead-manager',
		'lm_admin_page',
		'dashicons-email',
		25
	);
}

// Admin page
function lm_admin_page() {
	global $wpdb;
	$table_name = $wpdb->prefix . 'leads';
	
	// Handle status update
	if ( isset( $_POST['update_status'] ) && isset( $_POST['lead_id'] ) ) {
		check_admin_referer( 'lm_update_status' );
		$wpdb->update(
			$table_name,
			array( 'status' => sanitize_text_field( $_POST['status'] ) ),
			array( 'id' => intval( $_POST['lead_id'] ) )
		);
	}
	
	// Handle delete
	if ( isset( $_GET['action'] ) && $_GET['action'] === 'delete' && isset( $_GET['id'] ) ) {
		check_admin_referer( 'lm_delete_lead_' . $_GET['id'] );
		$wpdb->delete( $table_name, array( 'id' => intval( $_GET['id'] ) ) );
	}
	
	$leads = $wpdb->get_results( "SELECT * FROM $table_name ORDER BY created_at DESC" );
	$total = count( $leads );
	$unread = $wpdb->get_var( "SELECT COUNT(*) FROM $table_name WHERE status = 'unread'" );
	?>
	<div class="wrap">
		<h1>Lead Manager</h1>
		
		<div style="display: flex; gap: 20px; margin: 20px 0;">
			<div style="background: #fff; padding: 20px; border-left: 4px solid #0073aa; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
				<h3 style="margin: 0;">Total Leads</h3>
				<p style="font-size: 32px; margin: 10px 0 0 0;"><?php echo $total; ?></p>
			</div>
			<div style="background: #fff; padding: 20px; border-left: 4px solid #d63638; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
				<h3 style="margin: 0;">Unread</h3>
				<p style="font-size: 32px; margin: 10px 0 0 0;"><?php echo $unread; ?></p>
			</div>
		</div>
		
		<table class="wp-list-table widefat fixed striped">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Message</th>
					<th>Status</th>
					<th>Date</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<?php if ( empty( $leads ) ) : ?>
					<tr>
						<td colspan="7" style="text-align: center; padding: 40px;">No leads yet</td>
					</tr>
				<?php else : ?>
					<?php foreach ( $leads as $lead ) : ?>
						<tr style="<?php echo $lead->status === 'unread' ? 'background: #f0f6fc;' : ''; ?>">
							<td><strong><?php echo esc_html( $lead->name ); ?></strong></td>
							<td><a href="mailto:<?php echo esc_attr( $lead->email ); ?>"><?php echo esc_html( $lead->email ); ?></a></td>
							<td><?php echo esc_html( $lead->phone ); ?></td>
							<td><?php echo esc_html( wp_trim_words( $lead->message, 10 ) ); ?></td>
							<td>
								<form method="post" style="display: inline;">
									<?php wp_nonce_field( 'lm_update_status' ); ?>
									<input type="hidden" name="lead_id" value="<?php echo $lead->id; ?>" />
									<select name="status" onchange="this.form.submit()">
										<option value="unread" <?php selected( $lead->status, 'unread' ); ?>>Unread</option>
										<option value="read" <?php selected( $lead->status, 'read' ); ?>>Read</option>
										<option value="contacted" <?php selected( $lead->status, 'contacted' ); ?>>Contacted</option>
										<option value="converted" <?php selected( $lead->status, 'converted' ); ?>>Converted</option>
									</select>
									<input type="hidden" name="update_status" value="1" />
								</form>
							</td>
							<td><?php echo date( 'M j, Y g:i a', strtotime( $lead->created_at ) ); ?></td>
							<td>
								<a href="<?php echo wp_nonce_url( admin_url( 'admin.php?page=lead-manager&action=delete&id=' . $lead->id ), 'lm_delete_lead_' . $lead->id ); ?>" 
								   onclick="return confirm('Delete this lead?');" 
								   class="button button-small">Delete</a>
							</td>
						</tr>
					<?php endforeach; ?>
				<?php endif; ?>
			</tbody>
		</table>
	</div>
	<?php
}

// Handle form submission via AJAX
add_action( 'wp_ajax_lm_submit_form', 'lm_handle_submission' );
add_action( 'wp_ajax_nopriv_lm_submit_form', 'lm_handle_submission' );
function lm_handle_submission() {
	check_ajax_referer( 'lm_form_nonce', 'nonce' );
	
	global $wpdb;
	$table_name = $wpdb->prefix . 'leads';
	
	$wpdb->insert(
		$table_name,
		array(
			'name' => sanitize_text_field( $_POST['name'] ),
			'email' => sanitize_email( $_POST['email'] ),
			'phone' => sanitize_text_field( $_POST['phone'] ),
			'message' => sanitize_textarea_field( $_POST['message'] ),
		)
	);
	
	wp_send_json_success( array( 'message' => 'Thank you! We will contact you soon.' ) );
}
