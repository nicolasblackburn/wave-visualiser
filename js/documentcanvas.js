blab.DocumentCanvas = blab.class();

blab.DocumentCanvas.prototype = {

    documentChange: function( event ) {
        this.update(this.processing);
    }
    
    , init: function( options ) {
        var canvas, height, width, undef;
        self = this;
        
        this.parent = options.parent;
        this.document = options.document;
        this.canvas = $(options.canvas);
        
        this.document.addListener("documentChange", this);
        
        this.processing = new Processing( this.canvas[0], function(p) {
            
            p.setup = function() {
                p.frameRate(30);
                self.resize(p);
                self.document.createPalette(p);
                self.document.calculateSqrtTable(p);
                self.document.calculateSinTable(p);
                p.background(self.document.palette[0]);
                self.update(p);
            };
            
            p.draw = function() {
                if ( ! self.document.isPaused ) {
                    self.update(p);
                }
            };
            
        } );
        
        //$(window).resize(function() {
        //    self.resize();
        //});
    }

    , resize: function(p) {
        var height, width;
        p = p || this.processing;
        //p.size(0,0);
        //height = this.canvas.parent().outerHeight(true);
        //width = this.canvas.parent().width();
        height = 320;
        width = 320;
        p.size(width, height);
        return this;
    }

    , update: function(p) {
        this.document.processEvents();
        this.document.update();
        this.document.render(p, this);
        return this;
    }
}
