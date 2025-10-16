( function( blocks, element, editor, components ) {
    var el = element.createElement;
    var RichText = editor.RichText;
    var InspectorControls = editor.InspectorControls;
    var PanelBody = components.PanelBody;
    var ColorPalette = components.ColorPalette;

    blocks.registerBlockType( 'zacks/with-controls', {
        title: 'Block with Controls',
        icon: 'admin-customizer',
        category: 'common',
        attributes: {
            content: {
                type: 'string',
                default: 'Editable content with color control'
            },
            textColor: {
                type: 'string',
                default: '#000000'
            }
        },

        edit: function( props ) {
            return el( 'div', {},
                el( InspectorControls, {},
                    el( PanelBody, { title: 'Color Settings' },
                        el( ColorPalette, {
                            value: props.attributes.textColor,
                            onChange: function( color ) {
                                props.setAttributes( { textColor: color } );
                            }
                        } )
                    )
                ),
                el( RichText, {
                    tagName: 'p',
                    style: { color: props.attributes.textColor },
                    value: props.attributes.content,
                    onChange: function( content ) {
                        props.setAttributes( { content: content } );
                    }
                } )
            );
        },

        save: function( props ) {
            return el( RichText.Content, {
                tagName: 'p',
                style: { color: props.attributes.textColor },
                value: props.attributes.content
            } );
        }
    } );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components );
