import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { heading, description, buttonText, buttonUrl } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Button Settings">
					<TextControl
						label="Button URL"
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
						placeholder="https://example.com"
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ 
				border: '2px dashed #ccc', 
				padding: '30px', 
				textAlign: 'center',
				borderRadius: '8px'
			}}>
				<RichText
					tagName="h2"
					value={heading}
					onChange={(value) => setAttributes({ heading: value })}
					placeholder="Enter heading..."
					style={{ marginBottom: '15px' }}
				/>
				<RichText
					tagName="p"
					value={description}
					onChange={(value) => setAttributes({ description: value })}
					placeholder="Enter description..."
					style={{ marginBottom: '20px' }}
				/>
				<RichText
					tagName="span"
					value={buttonText}
					onChange={(value) => setAttributes({ buttonText: value })}
					placeholder="Button text..."
					style={{ 
						display: 'inline-block',
						padding: '12px 24px',
						backgroundColor: '#0073aa',
						color: 'white',
						borderRadius: '4px',
						textDecoration: 'none'
					}}
				/>
			</div>
		</>
	);
}