var _console = {
	commands: {
		help: {
			name: 'help',
			desc: 'show all commands and their respective help info',
			effect: '_console.printHelp()',
			args: false,
			argsRequired: false,
		},
		arguments: {
			name: 'arguments',
			desc: 'show all arguments available',
			effect: '_console.printArgs()',
			args: false,
			argsRequired: false
		},
		clear: {
			name: 'clear',
			desc: 'clear all text from the console',
			effect: '_console.clear()',
			args: false,
			argsRequired: false,
		},
		hack: {
			name: 'hack',
			desc: 'execute this command to earn money and experience',
			effect: '_console.earn()',
			args: false,
			argsRequired: false,
		},
		'getting-started': {
			name: 'getting-started',
			desc: 'a guide to learn the basics of the game',
			effect: '_console.guide()',
			args: false,
			argsRequired: false,
		}
	},

	args: {
		'-h': {
			name: '-h',
			desc: 'show help for the command desired'
		}
	},

	getEarnIncome: function() {
		var amount = Math.floor(Math.random() * (_core.randMoneyMax - 1 + 1)) + 1;
		amount *= _core.moneyMult;

		return amount;
	},

	getExpIncome: function() {
		var amount = Math.floor(Math.random() * (_core.randExpMax - 1 + 1)) + 1;
		amount *= _core.expMult;

		return amount;
	},

	earn: function() {
		var income = this.getEarnIncome();
		var expIncome = this.getExpIncome();

		this.print('You earned <b>' + _fix(income) + '$</b> and earned <b>' + _fix(expIncome) + '</b> experience.');
		_core.earnMoney(income);
		_core.earnExp(expIncome);
	},

	guide: function() {
		this.print('Welcome to Skid Inc.\n' +
			'Start earning money by typing the <b>hack</b> command to earn <b>money</b> and <b>experience</b>.<br>' +
			'<b>Experience</b> is earned by doing actions. Every level-up gives you <b>skill-points</b>, which can be spent on <b>skills</b>.<br>' +
			'Sometimes you will need to use <b>arguments</b>, they are words who are combined with the command, like parameters.<br>' +
			'<b>Example:</b> you need help about the <b>hack</b> command, so you will type <b>hack -h</b>. Here <b>-h</b> ' +
			'is an argument passed with <b>hack</b> command. <b>-h</b> means <b>help</b> so it will output the help of the command typed.<br>' +
			'Get a list of the commands by typing <b>help</b>.');
	},

	clear: function() {
		$('#console-content').empty();
	},

	print: function(text) {
		$('#console-content').append('<p>' + text + '</p>');
	},

	printHelp: function() {
		for (var command in this.commands)
			this.print('<b>' + this.commands[command].name + '</b>: ' + this.commands[command].desc);
	},

	printArgs: function() {
		for (var arg in this.args)
			this.print('<b>' + this.args[arg].name + '</b>: ' + this.args[arg].desc);
	},

	enterCommand: function() {
		var str = $('#console-input').val();
		var args = str.split(" ");

		if (typeof this.commands[args[0]] !== 'object')
			this.print('<b>' + args[0] + '</b> is not recognized as a command. Type <b>help</b> for a list of commands.');
		else {
			var cmd = this.commands[args[0]];

			if (args[1] == '-h')
				this.print('<b>' + args[0] + '</b>: ' + cmd.desc);
			else if (!cmd.argsRequired)
				eval(cmd.effect);
			else if (cmd.argsRequired)
				console.log('args required');
		};

		$('#console-input').val('');
		$('#console-content').animate({
			scrollTop: 1e6
		}, 'fast');
	},

	varInit: function() {
	},

	domInit: function() {
		$('#console-enter').on('click', function() {
			_console.enterCommand();
		});

		$('#console-input').bind('keydown', function(e) {
			if (e.which == 13)
				_console.enterCommand();
		});

		$('#console-input').bind('copy paste', function(e) {
			e.preventDefault();
			_console.print('Copy/paste disabled, it\'s considered as a glitch.');
		});
	}
};