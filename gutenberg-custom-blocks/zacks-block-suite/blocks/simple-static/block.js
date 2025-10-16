( function( blocks, element ) {
    var el = element.createElement;

    blocks.registerBlockType( 'zacks/simple-static', {
        title: 'Simple Static Block',
        icon: 'star-filled',
        category: 'common',

        edit: function() {
            return el( 'div', { className: 'zacks-simple-block' },
                el( 'h3', {}, 'Simple Static Block' ),
                el( 'p', {}, 'This is a basic static block with no editable content.' )
            );
        },

        save: function() {
            return el( 'div', { className: 'zacks-simple-block' },
                el( 'h3', {}, 'Simple Static Block' ),
                el( 'p', {}, 'This is a basic static block with no editable content.' )
            );
        }
    } );
} )( window.wp.blocks, window.wp.element );
