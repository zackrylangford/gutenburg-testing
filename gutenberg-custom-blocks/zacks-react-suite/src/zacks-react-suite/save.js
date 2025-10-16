import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { heading, description, buttonText, buttonUrl, backgroundColor, textColor } = attributes;

	return (
		<div {...useBlockProps.save()} style={{ backgroundColor, color: textColor, padding: '40px', textAlign: 'center', borderRadius: '8px' }}>
			<RichText.Content tagName="h2" value={heading} style={{ color: textColor, marginBottom: '10px' }} />
			<RichText.Content tagName="p" value={description} style={{ color: textColor, marginBottom: '20px' }} />
			<a href={buttonUrl} style={{ backgroundColor: '#fff', color: backgroundColor, padding: '12px 30px', borderRadius: '4px', display: 'inline-block', fontWeight: 'bold', textDecoration: 'none' }}>
				<RichText.Content tagName="span" value={buttonText} />
			</a>
		</div>
	);
}
