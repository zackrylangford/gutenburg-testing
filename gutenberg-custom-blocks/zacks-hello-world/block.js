( function( blocks, element, editor ) {
    var el = element.createElement;
    var RichText = editor.RichText;

    blocks.registerBlockType( 'custom/hello-world', {
        title: "Zack's Hello World",
        icon: 'smiley',
        category: 'common',
        attributes: {
            content: {
                type: 'string',
                default: 'Hello World from Gutenberg!'
            }
        },

        edit: function( props ) {
            return el(
                RichText,
                {
                    tagName: 'p',
                    className: props.className,
                    value: props.attributes.content,
                    onChange: function( content ) {
                        props.setAttributes( { content: content } );
                    }
                }
            );
        },

        save: function( props ) {
            return el(
                RichText.Content,
                {
                    tagName: 'p',
                    value: props.attributes.content
                }
            );
        }
    } );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );
