import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { testimonials, imageSize, quoteSize, textAlign, showImage, backgroundColor, textColor, buttonBgColor, buttonTextColor } = attributes;

	return (
		<div {...useBlockProps.save()} className="testimonial-carousel" style={{ backgroundColor: backgroundColor, borderRadius: '8px', padding: '20px' }}>
			<div className="testimonial-carousel-container">
				{testimonials.map((testimonial, index) => (
					<div 
						key={index} 
						className={`testimonial-slide ${index === 0 ? 'active' : ''}`}
						style={{ 
							display: index === 0 ? 'block' : 'none',
							textAlign: textAlign,
							padding: '40px 20px'
						}}
					>
						{showImage && testimonial.imageUrl && (
							<img 
								src={testimonial.imageUrl} 
								alt={testimonial.author}
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
							"{testimonial.quote}"
						</blockquote>
						<p style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '16px', color: textColor }}>
							{testimonial.author}
						</p>
						<p style={{ fontSize: '14px', color: textColor, opacity: 0.7 }}>
							{testimonial.title}
						</p>
					</div>
				))}
			</div>
			{testimonials.length > 1 && (
				<div className="carousel-controls" style={{ 
					display: 'flex', 
					justifyContent: 'center', 
					gap: '10px',
					marginTop: '30px'
				}}>
					<button className="carousel-prev" style={{
						padding: '10px 20px',
						backgroundColor: buttonBgColor,
						color: buttonTextColor,
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer'
					}}>
						Previous
					</button>
					<button className="carousel-next" style={{
						padding: '10px 20px',
						backgroundColor: buttonBgColor,
						color: buttonTextColor,
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer'
					}}>
						Next
					</button>
				</div>
			)}
			<div className="carousel-dots" style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				gap: '8px',
				marginTop: '20px'
			}}>
				{testimonials.map((_, index) => (
					<span 
						key={index}
						className={`dot ${index === 0 ? 'active' : ''}`}
						data-slide={index}
						style={{
							width: '12px',
							height: '12px',
							borderRadius: '50%',
							backgroundColor: index === 0 ? buttonBgColor : '#ccc',
							cursor: 'pointer'
						}}
					/>
				))}
			</div>
		</div>
	);
}
