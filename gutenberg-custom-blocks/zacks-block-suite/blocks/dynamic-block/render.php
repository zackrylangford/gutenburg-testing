<?php

function zacks_render_dynamic_block( $attributes ) {
    $message = isset( $attributes['message'] ) ? $attributes['message'] : 'Hello from dynamic block!';
    
    $current_time = current_time( 'F j, Y g:i:s A' );
    $post_count = wp_count_posts()->publish;
    $latest_post = get_posts( array( 'numberposts' => 1 ) );
    $latest_title = !empty( $latest_post ) ? $latest_post[0]->post_title : 'No posts yet';
    
    $output = '<div class="zacks-dynamic-block" style="border: 2px solid #0073aa; padding: 20px; margin: 20px 0;">';
    $output .= '<h3>' . esc_html( $message ) . '</h3>';
    $output .= '<p><strong>Current Time:</strong> ' . esc_html( $current_time ) . '</p>';
    $output .= '<p><strong>Total Published Posts:</strong> ' . esc_html( $post_count ) . '</p>';
    $output .= '<p><strong>Latest Post:</strong> ' . esc_html( $latest_title ) . '</p>';
    $output .= '<p style="font-size: 12px; color: #666;"><em>This data is generated fresh on every page load!</em></p>';
    $output .= '</div>';
    
    return $output;
}
