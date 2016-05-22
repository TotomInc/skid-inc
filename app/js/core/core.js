var _core = {
	updateGame: function(times) {},
	
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
		console.log('first: ' + this.options.fps);
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
