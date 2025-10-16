( function( blocks, element, components ) {
    var el = element.createElement;
    var TextControl = components.TextControl;

    blocks.registerBlockType( 'zacks/dynamic-block', {
        title: 'Dynamic Block',
        icon: 'update',
        category: 'common',
        attributes: {
            message: {
                type: 'string',
                default: 'Hello from dynamic block!'
            }
        },

        edit: function( props ) {
            return el( 'div', { className: 'zacks-dynamic-block-editor' },
                el( 'h4', {}, 'Dynamic Block (Editor View)' ),
                el( TextControl, {
                    label: 'Message',
                    value: props.attributes.message,
                    onChange: function( message ) {
                        props.setAttributes( { message: message } );
                    }
                } ),
                el( 'p', {}, 'Frontend will show: ' + props.attributes.message )
            );
        },

        save: function() {
            return null;
        }
    } );
} )( window.wp.blocks, window.wp.element, window.wp.components );
