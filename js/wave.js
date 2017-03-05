blab.Wave = blab.class();

blab.Wave.prototype = {
    init: function(options) {
        var self, undef;
        self = this;
        
        this.id = "wave" + new Date().getTime();
        this.centerX = 0;
        this.centerY = 0;
        this.frequency = 2;
        this.phase = 0; 
        this.speed = 1;
        this.visible = true;
    }
}
