blab.Document = blab.class();

blab.Document.prototype = {
    
    addListener: function(eventType, listener) {
        var undef;
        if ( undef === this.listeners[eventType] ) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(listener);
        return this;
    }

    , addElement: function(element, index) {
        var undef;
        element.parent = this;
        if ( undef === index ) {
            index = this.elements.length;
        } else if ( index < 0 ) {
            index += this.elements.length;
        }
        this.elements[index] = element;
        return this;
    }
    
    , calculateSinTable: function() {
        var i, l, tau;
        tau = Math.PI * 2;
        l = 512;
        this.sinTable = [];
        for ( i = 0; i < l; i++ ) {
            this.sinTable.push( Math.sin( i / (l-1) * tau) );
        }
    }

    , calculateSqrtTable: function(p) {
        var i, l;
        l = Math.max(p.height, p.width);
        l = 2*l*l;
        for (i = 0; i < l; ++i) {
            this.sqrtTable[i] = Math.sqrt(i);
        }
    }

    , createPalette: function(p) {
        var i, l, start, end;
        start = p.color(0xFF007DF1);
        end = p.color(0xFFF1DE00);
        this.palette = [];
        l = 256;
        for ( i = 0; i < l; i++ ) {
            this.palette.push(p.lerpColor(start, end, i / (l-1)));
        }
    }
    
    , drawWave: function( wave, p) {
        var amp, centerX, centerY, dx, dy, frameCount, frequency, index, instantPhase, mag, max, offset, palette, phase, pixels, sinTable, speed, sqrtTable, undef, w, x, y;
        
        if ( ! wave.visible ) {
            return;
        }
        
        w = p.width;
        h = p.height;
        max = Math.max(w, h);
        centerX = wave.centerX;
        centerY = wave.centerY;
        frequency = wave.frequency;
        phase = wave.phase;
        speed = wave.speed;
        frameCount = this.frameCount;
        palette = this.palette;
        sqrtTable = this.sqrtTable;
        
        p.loadPixels();
        pixels = p.pixels;
        
        for ( y = 0; y < h; ++y ) {
            offset = y * w;
            for ( x = 0; x < w; ++x ) {
                dx = x - centerX;
                dy = y - centerY;
                mag = sqrtTable[ (dx*dx + dy*dy) >> 0 ];
                instantPhase = frequency * mag/max - phase + frameCount / 30 * speed;
                if ( instantPhase < 0 ) {
                    amp = - this.sin( Math.abs(instantPhase) );
                } else {
                    amp = this.sin( instantPhase );
                }
                index = ((1+amp)*255)>>1;
                
                pixels.setPixel(offset + x, palette[index]);
            }
        }
        p.updatePixels();
    }
    
    , drawWaves: function( p ) {
        var amp, c, centerX, centerY, dx, dy, frameCount, frequency, i, index, instantPhase, lastIndex, mag, max, offset, palette, phase, pixels, pixelsBuffer, sinTable, speed, sqrtTable, undef, value, w, wave, waveCount, x, y;
        
        w = p.width;
        h = p.height;
        max = Math.max(w, h);
        frameCount = this.frameCount;
        palette = this.palette;
        sqrtTable = this.sqrtTable;
        
        p.loadPixels();
        pixels = p.pixels;
        pixelsBuffer = [];
        
        for ( waveCount = this.elements.length, i = waveCount - 1; i >= 0; i-- ) {
            wave = this.elements[i];
            if ( wave.visible ) {
                lastIndex = i;
                break;
            }
        }
        
        for ( c = 0, i = 0; i < waveCount; i++ ) {
            wave = this.elements[i];
            
            if ( ! wave.visible ) {
                continue;
            }
            
            centerX = wave.centerX;
            centerY = wave.centerY;
            frequency = wave.frequency;
            phase = wave.phase;
            speed = wave.speed;
            for ( y = 0; y < h; ++y ) {
                offset = y * w;
                for ( x = 0; x < w; ++x ) {
                    dx = x - centerX;
                    dy = y - centerY;
                    mag = sqrtTable[ (dx*dx + dy*dy) >> 0 ];
                    instantPhase = frequency * mag/max - phase + frameCount / 30 * speed;
                    if ( instantPhase < 0 ) {
                        amp = - this.sin( Math.abs(instantPhase) );
                    } else {
                        amp = this.sin( instantPhase );
                    }
                    index = ((1+amp)*255)>>1;
                    
                    if ( 0 !== c ) {
                        pixelsBuffer[offset + x] = ((pixelsBuffer[offset + x] * c + index) / (c+1))>>0;
                    } else {
                        pixelsBuffer[offset + x] = index;
                    }
                    
                    if ( i === lastIndex ) {
                        index = pixelsBuffer[offset + x];
                        pixels.setPixel(offset + x, palette[index]);
                    }
                }
            }
            
            c++;
        }
        p.updatePixels();
    }

    , fireDocumentChange: function(event) {
        var i, listener, undef;
        if (undef === this.listeners["documentChange"]) {
            return this;
        }
        for ( i = 0; listener = this.listeners["documentChange"][i++]; ) {
            listener.documentChange(event);
        }
        return this;
    }

    , getCurrentElement: function() {
        return this.elements[this.currentElementIndex] || null;
    }

    , init: function(options) {
        var self, undef;
        self = this;
        
        this.events = [];
        this.isPaused = true;
        this.listeners = {};
        this.elements = [];
        this.frameCount = 0;
        this.currentElementIndex = null;
        this.palette = [];
        this.sqrtTable = [];
        this.sinTable = [];
    }

    , processEvents: function() {
        var event, i, j, listener, listeners, undef;
        i = 0;
        while ( event = this.events[i++] ) {
            listeners = this.listeners[event.type] || undef;
            if ( undef !== listeners ) {
                j = 0;
                while ( listener = listeners[j++] ) {
                    listener.invoke(event);
                }
            }
        }
        this.events = [];
        return this;
    }

    , removeElement: function(element) {
        var i, index, item, undef;
        if ( typeof element == "number" ) {
            index = element;
            if (index < 0) {
                this.elements.splice(this.elements.length+index, 1);
            } else {
                this.elements.splice(index, 1);
            }
        } else {
            i = 0;
            while ( item = this.elements[i++] ) {
                if ( item === element ) {
                    this.elements.splice(i-1, 1);
                    break;
                }
            }
        }
        if (this.currentElementIndex >= this.elements.length) {
            this.currentElementIndex = null;
        }
        return this;
    }

    , render: function(p, documentCanvas) {
        var element, i, undef;
        p.background(this.palette[0]);
        //i = 0;
        //while ( element = this.elements[i++] ) {
        //    this.drawWave(element, p);
        //}
        this.drawWaves(p);
    }
    
    , sin: function(r) {
        var i;
        i = ((r * 256) >> 0) % 512;
        return this.sinTable[i];
    }

    , update: function() {
        var i, element, undef;
        i = 0;
        this.frameCount++;
        /*
        while ( element = this.elements[i++] ) {
            element.update(this);
        }
        */
    }
    
};
