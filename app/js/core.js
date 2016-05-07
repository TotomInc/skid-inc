var _core = {
	money: 0,
	totalMoney: 0,
	level: 0,
	exp: 0,
	maxExp: 100,
	moneyMult: 1,
	randMoneyMax: 3,
	expMult: 1,
	randExpMax: 5,

	options: {
		intervals: {},
		fps: 10,
		interval: undefined,
		version: 0.001
	},

	earnMoney: function(amount) {
		this.money += amount;
		this.totalMoney += amount;
	},

	earnExp: function(amount) {
		this.exp += amount;

		if (this.exp >= this.maxExp) {
			while (this.exp >= this.maxExp) {
				this.level++;
				this.exp -= this.maxExp;
				this.maxExp = Math.pow(1.08, this.level) * 100;
			};
		};
	},

	display: function() {
		$('#well-resources').html('Cash: ' + _fix(this.money, 2) + '$<br>' +
			'Lvl: ' + _fix(this.level, 0) + '<br>' +
			'Exp: ' + _fix(this.exp, 0) + '/' + _fix(this.maxExp, 0)
		);
	},

	intervalsInit: function() {
		this.options.intervals.display = window.setInterval(function() {
			_core.display();
		}, _core.options.interval);
	},

	varInit: function() {
		this.options.interval = (1000 / this.options.fps);

		_beautify.varInit();
		_console.varInit();
	},

	domInit: function() {
		_console.domInit();
	},

	init: function() {
		this.varInit();
		this.domInit();
		this.intervalsInit();
		_console.guide();

		console.info('Init finished - ready to play')
	}
};

_core.init();