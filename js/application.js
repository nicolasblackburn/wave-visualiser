blab.Application = blab.class();

! function() {
    var tabcount, newtabprefix;

    tabcount = 0;
    newtabprefix = "New Tab ";

    blab.Application.prototype = {
        init: function(options) {
            this.document = blab.Document();
            this.inspectorForm = blab.InspectorForm( {
                document: this.document
                , parent: this
            } );
            this.toolbar = blab.Toolbar( {
                document: this.document
                , parent: this
            } );
            this.propertiesForm = blab.PropertiesForm( {
                document: this.document
                , parent: this
            } );
            this.documentCanvas = blab.DocumentCanvas( {
                canvas: options.canvas
                , document: this.document
                , parent: this
            } );
        }
    };
}();
