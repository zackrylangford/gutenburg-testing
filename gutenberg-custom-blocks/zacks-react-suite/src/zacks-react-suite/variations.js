import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation('create-block/zacks-react-suite', {
	name: 'primary-cta',
	title: 'Primary CTA',
	description: 'Blue call-to-action for main conversions',
	attributes: {
		heading: 'Start Your Free Trial',
		description: 'No credit card required. Cancel anytime.',
		buttonText: 'Get Started Free',
		backgroundColor: '#0073aa',
		textColor: '#ffffff'
	},
	isDefault: true
});

registerBlockVariation('create-block/zacks-react-suite', {
	name: 'success-cta',
	title: 'Success CTA',
	description: 'Green call-to-action for positive actions',
	attributes: {
		heading: 'Success! You\'re Almost There',
		description: 'Complete your profile to get started.',
		buttonText: 'Complete Profile',
		backgroundColor: '#46b450',
		textColor: '#ffffff'
	}
});

registerBlockVariation('create-block/zacks-react-suite', {
	name: 'urgent-cta',
	title: 'Urgent CTA',
	description: 'Red call-to-action for time-sensitive offers',
	attributes: {
		heading: 'Limited Time Offer!',
		description: 'Sale ends in 24 hours. Don\'t miss out!',
		buttonText: 'Claim Offer Now',
		backgroundColor: '#dc3232',
		textColor: '#ffffff'
	}
});
