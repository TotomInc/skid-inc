var _console = {
	varInit: function() {},

	domInit: function() {
		$('#hack-button').on('click', function() {
			_console.hack(['button'], 'button');
		});
		
		$('#console-enter').on('click', function() {
			_console.enterCmd();
		});

		$('#console-input').bind('keydown', function(e) {
			if (e.which == 13)
				_console.enterCmd();
		});

		$('#console-input').bind('copy paste', function(e) {
			e.preventDefault();
		});
	}
};
