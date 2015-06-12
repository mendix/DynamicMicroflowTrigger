dojo.provide("DynamicMicroflowTrigger.widget.dynamicmicroflowtrigger");
dojo.require("dijit.form.Button")

dojo.declare("DynamicMicroflowTrigger.widget.dynamicmicroflowtrigger", mxui.widget._WidgetBase, {
	mixins : [ dijit._Contained, mendix.addon._Contextable, mxui.mixin._Scriptable ],

	//housekeeping
	dynamicButton 		: null,
	btnCaption			: '',
	dataobject 			: null,
    

	postcreate : function() {
		this.loaded();
	},

	update : function(obj, callback){
		if(obj) {
			this.dataobject = obj;
			this._setValueAttr(obj.get(this.name));
			var self = this;
			mx.data.subscribe({
				guid: obj.getGuid(),
				callback: function(){
					self._setValueAttr(obj.get(self.name));
				}
			});
		}

		callback && callback();
	},


	showButton : function () {
        dojo.empty(this.domNode);
        
        var self = this
        if (this.btnCaption != '') {
	        var button = new dijit.form.Button({
		        label: this.btnCaption,
		        onClick: function(){
		        	self.onclickEvent();
		        }
		    });
		    dojo.addClass(button.domNode, 'btn');
		    dojo.place(button.domNode, this.domNode);
		}

	},

	onclickEvent : function() {
		if (this.onclickmf != '' && this.dataobject != null) {
			mx.data.action({
				params : {
					actionname : this.onclickmf,
					applyto : "selection",
					guids : [this.dataobject.getGuid()]
				}
			});
		}
	},
	
	_setValueAttr : function(value) {
		this.btnCaption = value;
		this.showButton();	
	}
});
