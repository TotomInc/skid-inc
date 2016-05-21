var _core = {
	varInit: function() {
		_console.varInit();
	},

	domInit: function() {
		_console.domInit();
	},

	init: function() {
		this.varInit();
		this.domInit();
	}
};

_core.init();
