var _core = {
	earnMoney: function(amount) {
		this.player.money += amount;
		this.player.totalMoney += amount;
	},
	
	earnExp: function(amount) {
		this.player.exp += amount;
		
		while (this.player.exp >= this.player.maxExp) {
			this.player.level++;
			this.player.exp -= this.player.maxExp;
			this.player.maxExp = Math.pow(this.player.level, this.player.expInflation) * 100;
			
			_console.print('ascii', this.ascii.levelUp);
		}
	},
	
	display: function() {
		$('#well-resources').html('' +
			'<b>Money</b>: $' + _beautify.fix(this.player.money) + '<br>' +
			'<b>Level</b>: ' + _beautify.fix(this.player.level, 0) + '<br>' +
			'<b>Exp</b>: ' + _beautify.fix(this.player.exp, 0) + '/' + _beautify.fix(this.player.maxExp, 0)
		);
		
		document.title = _beautify.fix(this.player.money) + '$ - SkidInc.';
	},
	
	updateGame: function(times) {
		this.display();
	},
	
	coreLoop: function() {
		this.options.now = new Date().getTime();
		
		var elapsed = this.options.now - this.options.before,
			times = Math.floor(elapsed / this.options.interval);
		
		if (elapsed > this.options.interval)
			this.updateGame(times);
		else
			this.updateGame(1);
		
		this.options.before = new Date().getTime();
	},
	
	intervalsInit: function() {
		this.options.interval = 1000 / this.options.fps;
		
		this.options.intervals.core = window.setInterval(function() {
			_core.coreLoop();
		}, _core.options.interval);
	},
	
	varInit: function() {
		_console.varInit();
	},

	domInit: function() {
		_console.domInit();
	}
};
