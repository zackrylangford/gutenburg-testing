import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ColorPicker } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { heading, description, buttonText, buttonUrl, backgroundColor, textColor } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="CTA Settings">
					<TextControl
						label="Button URL"
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
					/>
					<p>Background Color</p>
					<ColorPicker
						color={backgroundColor}
						onChangeComplete={(value) => setAttributes({ backgroundColor: value.hex })}
					/>
					<p>Text Color</p>
					<ColorPicker
						color={textColor}
						onChangeComplete={(value) => setAttributes({ textColor: value.hex })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ backgroundColor, color: textColor, padding: '40px', textAlign: 'center', borderRadius: '8px' }}>
				<RichText
					tagName="h2"
					value={heading}
					onChange={(value) => setAttributes({ heading: value })}
					placeholder="Enter heading..."
					style={{ color: textColor, marginBottom: '10px' }}
				/>
				<RichText
					tagName="p"
					value={description}
					onChange={(value) => setAttributes({ description: value })}
					placeholder="Enter description..."
					style={{ color: textColor, marginBottom: '20px' }}
				/>
				<RichText
					tagName="span"
					value={buttonText}
					onChange={(value) => setAttributes({ buttonText: value })}
					placeholder="Button text..."
					style={{ backgroundColor: '#fff', color: backgroundColor, padding: '12px 30px', borderRadius: '4px', display: 'inline-block', fontWeight: 'bold' }}
				/>
			</div>
		</>
	);
}
