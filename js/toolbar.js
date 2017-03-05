blab.Toolbar = blab.class();

blab.Toolbar.prototype = {
    init: function( options ) {
        var self, undef;
        self = this;
        
        this.parent = options.parent;
        this.document = options.document;
        
        this.btnNew = $("#btn_new");
        this.btnOpen = $("#btn_open");
        this.btnSave = $("#btn_save");
        this.btnRename = $("#btn_rename");
        this.btnPlay = $("#btn_play");
        
        this.btnPlay.click(function() {
            if ( self.document.isPaused ) {
                self.document.isPaused = false;
                $(this).attr("title", "Pause");
                $('[class^="icon-"], [class*=" icon-"]', this)
                    .removeClass("icon-bootstrap-play")
                    .addClass("icon-bootstrap-pause");
            } else {
                self.document.isPaused = true;
                $(this).attr("title", "Play");
                $('[class^="icon-"], [class*=" icon-"]', this)
                    .removeClass("icon-bootstrap-pause")
                    .addClass("icon-bootstrap-play");
            }
        });
    }
}
