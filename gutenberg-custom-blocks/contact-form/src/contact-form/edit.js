import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<div {...useBlockProps()} style={{ 
			border: '2px dashed #ccc', 
			padding: '30px',
			borderRadius: '8px'
		}}>
			<h3>Contact Form</h3>
			<p style={{ color: '#666', marginBottom: '20px' }}>This form will be displayed on the frontend</p>
			<form style={{ maxWidth: '500px' }}>
				<input type="text" placeholder="Name" disabled style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
				<input type="email" placeholder="Email" disabled style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
				<input type="tel" placeholder="Phone" disabled style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
				<textarea placeholder="Message" disabled rows="4" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}></textarea>
				<button type="button" disabled style={{ padding: '12px 24px', backgroundColor: '#0073aa', color: 'white', border: 'none', borderRadius: '4px' }}>Submit</button>
			</form>
		</div>
	);
}
