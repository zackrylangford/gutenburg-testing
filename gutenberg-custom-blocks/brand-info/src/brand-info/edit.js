import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { showLogo, showContact, showSocial } = attributes;

	// Get brand settings from localized script
	const settings = window.brandSettings || {
		logo: '',
		companyName: 'Company Name',
		phone: '',
		email: '',
		address: '',
		facebook: '',
		twitter: '',
		instagram: '',
		linkedin: ''
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Display Settings">
					<ToggleControl
						label="Show Logo"
						checked={showLogo}
						onChange={(value) => setAttributes({ showLogo: value })}
					/>
					<ToggleControl
						label="Show Contact Info"
						checked={showContact}
						onChange={(value) => setAttributes({ showContact: value })}
					/>
					<ToggleControl
						label="Show Social Media"
						checked={showSocial}
						onChange={(value) => setAttributes({ showSocial: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ 
				border: '2px dashed #ccc', 
				padding: '30px',
				borderRadius: '8px',
				textAlign: 'center'
			}}>
				{showLogo && settings.logo && (
					<img src={settings.logo} alt="Logo" style={{ maxWidth: '200px', marginBottom: '20px' }} />
				)}
				<h3>{settings.companyName}</h3>
				{showContact && (
					<div style={{ marginTop: '20px' }}>
						{settings.phone && <p>📞 {settings.phone}</p>}
						{settings.email && <p>✉️ {settings.email}</p>}
						{settings.address && <p>📍 {settings.address}</p>}
					</div>
				)}
				{showSocial && (settings.facebook || settings.twitter || settings.instagram || settings.linkedin) && (
					<div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
						{settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener">Facebook</a>}
						{settings.twitter && <a href={settings.twitter} target="_blank" rel="noopener">Twitter</a>}
						{settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener">Instagram</a>}
						{settings.linkedin && <a href={settings.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
					</div>
				)}
			</div>
		</>
	);
}
