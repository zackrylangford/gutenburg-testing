import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { heading, description, buttonText, buttonUrl } = attributes;

	return (
		<div {...useBlockProps.save()} style={{ 
			padding: '30px', 
			textAlign: 'center',
			backgroundColor: '#f8f9fa',
			borderRadius: '8px'
		}}>
			<RichText.Content
				tagName="h2"
				value={heading}
				style={{ marginBottom: '15px' }}
			/>
			<RichText.Content
				tagName="p"
				value={description}
				style={{ marginBottom: '20px' }}
			/>
			{buttonUrl ? (
				<a 
					href={buttonUrl}
					style={{ 
						display: 'inline-block',
						padding: '12px 24px',
						backgroundColor: '#0073aa',
						color: 'white',
						borderRadius: '4px',
						textDecoration: 'none'
					}}
				>
					<RichText.Content value={buttonText} />
				</a>
			) : (
				<span style={{ 
					display: 'inline-block',
					padding: '12px 24px',
					backgroundColor: '#0073aa',
					color: 'white',
					borderRadius: '4px'
				}}>
					<RichText.Content value={buttonText} />
				</span>
			)}
		</div>
	);
}