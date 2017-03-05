blab.PropertiesForm = blab.class();

blab.PropertiesForm.prototype = {
    init: function( options ) {
        var self, undef;
        self = this;
        
        this.parent = options.parent;
        this.document = options.document;
        
        this.txtId = $("#txt_id");
        this.txtCenterX = $("#txt_center_x");
        this.txtCenterY = $("#txt_center_y");
        this.txtFrequency = $("#txt_frequency");
        this.txtPhase = $("#txt_phase");
        this.txtSpeed = $("#txt_speed");
        this.chkVisible = $("#chk_visible");
        
        this.document.addListener("documentChange", this);
        
        /*
        $("#properties_header").addClass("interactive").click(function() {
            $("#properties_panel").toggle("fast", function() {
                self.parent.fireLayoutChanged();
            });
        });
        */
        
        this.txtId.change(function () {
            var element;
            element = self.document.getCurrentElement();
            if ( null !== element ) {
                element.id = $(this).val();
                self.document.fireDocumentChange({
                    source: self
                });
            }
        });
        
        this.txtCenterX.change(function () {
            var element;
            element = self.document.getCurrentElement();
            if ( null !== element ) {
                element.centerX = parseFloat($(this).val());
                self.document.fireDocumentChange({
                    source: self
                });
            }
        });
        
        this.txtCenterY.change(function () {
            var element;
            element = self.document.getCurrentElement();
            if ( null !== element ) {
                element.centerY = parseFloat($(this).val());
                self.document.fireDocumentChange({
                    source: self
                });
            }
        });
        
        this.txtFrequency.change(function () {
            var element;
            element = self.document.getCurrentElement();
            if ( null !== element ) {
                element.frequency = parseFloat($(this).val());
                self.document.fireDocumentChange({
                    source: self
                });
            }
        });
        
        this.txtPhase.change(function () {
            var element;
            element = self.document.getCurrentElement();
            if ( null !== element ) {
                element.phase = parseFloat($(this).val());
                self.document.fireDocumentChange({
                    source: self
                });
            }
        });
        
        this.txtSpeed.change(function () {
            var element;
            element = self.document.getCurrentElement();
            if ( null !== element ) {
                element.speed = parseFloat($(this).val());
                self.document.fireDocumentChange({
                    source: self
                });
            }
        });
        
        this.chkVisible.change(function () {
            var element;
            element = self.document.getCurrentElement();
            if ( null !== element ) {
                element.visible = $(this).prop("checked");
                self.document.fireDocumentChange({
                    source: self
                });
            }
        });
    }

    , documentChange: function( event ) {
        
        var element;
        element = this.document.getCurrentElement();
        
        if ( null === element ) {
            this.txtId.val("").attr("disabled", "disabled");
            this.txtCenterX.val("").attr("disabled", "disabled");
            this.txtCenterY.val("").attr("disabled", "disabled");
            this.txtFrequency.val("").attr("disabled", "disabled");
            this.txtPhase.val("").attr("disabled", "disabled");
            this.txtSpeed.val("").attr("disabled", "disabled");
            this.chkVisible.removeAttr("checked").attr("disabled", "disabled");
        } else {
            this.txtId.val(element.id).removeAttr("disabled");
            this.txtCenterX.val(element.centerX).removeAttr("disabled");
            this.txtCenterY.val(element.centerY).removeAttr("disabled");
            this.txtFrequency.val(element.frequency).removeAttr("disabled");
            this.txtPhase.val(element.phase).removeAttr("disabled");
            this.txtSpeed.val(element.speed).removeAttr("disabled");
            if (element.visible) {
                this.chkVisible.attr("checked", "checked").removeAttr("disabled");
            } else {
                this.chkVisible.removeAttr("checked").removeAttr("disabled");
            }
        }
    }
}
