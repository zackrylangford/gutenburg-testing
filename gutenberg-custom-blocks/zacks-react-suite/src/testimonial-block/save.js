import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { authorName, authorTitle, imageUrl, quote } = attributes;

	return (
		<div {...useBlockProps.save()} style={{ border: '1px solid #ddd', padding: '30px', borderRadius: '8px', maxWidth: '600px' }}>
			{imageUrl && (
				<img src={imageUrl} alt={authorName} style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '20px' }} />
			)}
			<RichText.Content
				tagName="blockquote"
				value={quote}
				style={{ fontSize: '18px', fontStyle: 'italic', marginBottom: '15px' }}
			/>
			<p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{authorName}</p>
			<p style={{ color: '#666', fontSize: '14px' }}>{authorTitle}</p>
		</div>
	);
}
