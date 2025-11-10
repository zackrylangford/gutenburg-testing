import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, TextareaControl, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { testimonials, currentSlide, imageSize, quoteSize, textAlign, showImage, backgroundColor, textColor, buttonBgColor, buttonTextColor } = attributes;
	const [editingIndex, setEditingIndex] = useState(0);

	const updateTestimonial = (index, field, value) => {
		const newTestimonials = [...testimonials];
		newTestimonials[index] = { ...newTestimonials[index], [field]: value };
		setAttributes({ testimonials: newTestimonials });
	};

	const addTestimonial = () => {
		setAttributes({
			testimonials: [...testimonials, {
				quote: 'New testimonial',
				author: 'Author Name',
				title: 'Job Title',
				imageUrl: '',
				imageId: null
			}]
		});
		setEditingIndex(testimonials.length);
	};

	const removeTestimonial = (index) => {
		const newTestimonials = testimonials.filter((_, i) => i !== index);
		setAttributes({ testimonials: newTestimonials });
		if (editingIndex >= newTestimonials.length) {
			setEditingIndex(Math.max(0, newTestimonials.length - 1));
		}
	};

	const currentTestimonial = testimonials[editingIndex] || testimonials[0];

	return (
		<>
			<InspectorControls>
				<PanelBody title="Style Settings">
					<ToggleControl
						label="Show Images"
						checked={showImage}
						onChange={(value) => setAttributes({ showImage: value })}
					/>
					{showImage && (
						<RangeControl
							label="Image Size (px)"
							value={imageSize}
							onChange={(value) => setAttributes({ imageSize: value })}
							min={50}
							max={200}
						/>
					)}
					<RangeControl
						label="Quote Font Size (px)"
						value={quoteSize}
						onChange={(value) => setAttributes({ quoteSize: value })}
						min={14}
						max={32}
					/>
					<SelectControl
						label="Text Alignment"
						value={textAlign}
						onChange={(value) => setAttributes({ textAlign: value })}
						options={[
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' }
						]}
					/>
					<div style={{ marginTop: '15px' }}>
						<label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Background Color</label>
						<ColorPalette
							value={backgroundColor}
							onChange={(value) => setAttributes({ backgroundColor: value || '#f8f9fa' })}
						/>
					</div>
					<div style={{ marginTop: '15px' }}>
						<label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Text Color</label>
						<ColorPalette
							value={textColor}
							onChange={(value) => setAttributes({ textColor: value || '#000000' })}
						/>
					</div>
					<div style={{ marginTop: '15px' }}>
						<label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Button Background</label>
						<ColorPalette
							value={buttonBgColor}
							onChange={(value) => setAttributes({ buttonBgColor: value || '#0073aa' })}
						/>
					</div>
					<div style={{ marginTop: '15px' }}>
						<label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Button Text Color</label>
						<ColorPalette
							value={buttonTextColor}
							onChange={(value) => setAttributes({ buttonTextColor: value || '#ffffff' })}
						/>
					</div>
				</PanelBody>
				<PanelBody title="Testimonial Content">
					<div style={{ marginBottom: '10px' }}>
						<strong>Editing: Testimonial {editingIndex + 1} of {testimonials.length}</strong>
					</div>
					<TextareaControl
						label="Quote"
						value={currentTestimonial.quote}
						onChange={(value) => updateTestimonial(editingIndex, 'quote', value)}
					/>
					<TextControl
						label="Author Name"
						value={currentTestimonial.author}
						onChange={(value) => updateTestimonial(editingIndex, 'author', value)}
					/>
					<TextControl
						label="Author Title"
						value={currentTestimonial.title}
						onChange={(value) => updateTestimonial(editingIndex, 'title', value)}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => updateTestimonial(editingIndex, 'imageUrl', media.url)}
							allowedTypes={['image']}
							value={currentTestimonial.imageId}
							render={({ open }) => (
								<Button onClick={open} variant="secondary">
									{currentTestimonial.imageUrl ? 'Change Image' : 'Upload Image'}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					<div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
						<Button variant="primary" onClick={addTestimonial}>
							Add Testimonial
						</Button>
						{testimonials.length > 1 && (
							<Button variant="secondary" isDestructive onClick={() => removeTestimonial(editingIndex)}>
								Remove
							</Button>
						)}
					</div>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ 
				border: '2px dashed #ccc', 
				padding: '40px',
				textAlign: textAlign,
				borderRadius: '8px',
				position: 'relative',
				backgroundColor: backgroundColor
			}}>
				<div style={{ marginBottom: '20px' }}>
					{testimonials.map((_, index) => (
						<button
							key={index}
							onClick={() => setEditingIndex(index)}
							style={{
								padding: '8px 16px',
								margin: '0 5px',
								backgroundColor: editingIndex === index ? buttonBgColor : '#f0f0f0',
								color: editingIndex === index ? buttonTextColor : 'black',
								border: 'none',
								borderRadius: '4px',
								cursor: 'pointer'
							}}
						>
							{index + 1}
						</button>
					))}
				</div>
				{showImage && currentTestimonial.imageUrl && (
					<img 
						src={currentTestimonial.imageUrl} 
						alt={currentTestimonial.author}
						style={{ 
							width: `${imageSize}px`, 
							height: `${imageSize}px`, 
							borderRadius: '50%', 
							marginBottom: '20px',
							objectFit: 'cover'
						}} 
					/>
				)}
				<blockquote style={{ 
					fontSize: `${quoteSize}px`, 
					fontStyle: 'italic', 
					marginBottom: '20px',
					lineHeight: '1.6',
					color: textColor
				}}>
					"{currentTestimonial.quote}"
				</blockquote>
				<p style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '16px', color: textColor }}>
					{currentTestimonial.author}
				</p>
				<p style={{ fontSize: '14px', color: textColor, opacity: 0.7 }}>
					{currentTestimonial.title}
				</p>
			</div>
		</>
	);
}
