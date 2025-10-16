import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { authorName, authorTitle, imageUrl, imageId } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Author Settings">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
							allowedTypes={['image']}
							value={imageId}
							render={({ open }) => (
								<Button onClick={open} variant="secondary">
									{imageUrl ? 'Change Image' : 'Upload Image'}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					<TextControl
						label="Author Name"
						value={authorName}
						onChange={(value) => setAttributes({ authorName: value })}
					/>
					<TextControl
						label="Author Title"
						value={authorTitle}
						onChange={(value) => setAttributes({ authorTitle: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ border: '1px solid #ddd', padding: '30px', borderRadius: '8px', maxWidth: '600px' }}>
				{imageUrl && (
					<img src={imageUrl} alt={authorName} style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '20px' }} />
				)}
				<RichText
					tagName="blockquote"
					value={attributes.quote}
					onChange={(value) => setAttributes({ quote: value })}
					placeholder="Enter testimonial quote..."
					style={{ fontSize: '18px', fontStyle: 'italic', marginBottom: '15px' }}
				/>
				<p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{authorName}</p>
				<p style={{ color: '#666', fontSize: '14px' }}>{authorTitle}</p>
			</div>
		</>
	);
}
