blab.InspectorForm = blab.class();

blab.InspectorForm.prototype = {
    init: function( options ) {
        var self, undef;
        self = this;
        
        this.parent = options.parent;
        this.document = options.document;
        
        this.document.addListener("documentChange", this);
        
        this.selectSceneObjects = $("#scene_objects");
        this.buttonAddObject = $("#btn_add_object");
        this.buttonRemoveObject = $("#btn_remove_object");
        
        /*
        $("#elements_header").addClass("interactive").click(function() {
            $("#elements_panel").slideToggle("fast", function() {
                self.parent.fireLayoutChanged();
            });
        });
        */
        
        this.buttonAddObject.click(function() {
            var element;
            element = blab.Wave();
            self.document.addElement(element);
            self.document.fireDocumentChange({
                source: self
            });
        });
        
        this.buttonRemoveObject.click(function() {
            var index;
            index = self.document.currentElementIndex;
            if (null === index) {
                return;
            }
            self.document.removeElement(index);
            self.document.fireDocumentChange({
                source: self
            });
        });
        
        this.selectSceneObjects.change(function() {
            var element, sel;
            sel = $(this).val();
            if ( ! sel || ! sel.length ) {
                self.document.currentElementIndex = null;
                self.document.fireDocumentChange({
                    source: this
                });
                return;
            } 
            self.document.currentElementIndex = parseInt(sel[0]);
            self.document.fireDocumentChange({
                source: self
            });
        });
    }

    , documentChange: function( event ) {
        var i, element;
        this.selectSceneObjects.html("");
        for ( i = 0; element = this.document.elements[i++]; ) {
            this.selectSceneObjects.append("<option value=\"" + (i-1) + "\">" + element.id + "</option>");
        }
        i = this.document.currentElementIndex;
        if (null === i) {
            return;
        }
        this.selectSceneObjects.val([i]);
    }
    
}
