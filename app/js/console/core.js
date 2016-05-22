var _console = {
	enterCmd: function() {
		var fullCmd = $('#console-input').val(),
			parts = fullCmd.split(' '),
			exist = false,
			current = undefined;

		for (var cmd in this.commands) {
			if (this.commands[cmd].name == parts[0])
				exist = true,
				current = this.commands[cmd];
		}

		if (exist && !current.args)
			eval(current.exec);
		else if (exist && current.args) {
			eval(current.exec)(parts);
		}
		else if (!exist)
			this.print('log', this.errors.cmd);

		$('#console-input').val('');
	},

	varInit: function() {},

	domInit: function() {
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
