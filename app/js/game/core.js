var game = {
	now: new Date().getTime(),
	before: new Date().getTime(),
	version: 0.21,
	fps: 30,
	interval: 1000,
	intervals: {
		core: undefined
	},

	core: function() {
		game.now = new Date().getTime();

		var elapsed = game.now - game.before,
			times = Math.floor(elapsed / game.interval);

		elapsed > game.interval ? game.update(times) : game.update(1);

		game.before = new Date().getTime();
	},

	update: function(times) {
		game.hack.loop(times);
		game.hack.hackerLoop(times);
		game.display();
	},

	display: function() {
		$('#stats-money').html('Money: $' + fix(game.player.money));
		$('#stats-level').html('Level: ' + game.player.level);
		$('#stats-exp').html('Exp: ' + fix(game.player.exp) + '/' + fix(game.player.expReq));
		$('#stats-reputation').html('Reputation: ' + fix(game.player.reputation));
		$('#stats-moneymult').html('Money mult: x' + fix(game.player.getGlobalMoneyMult()));
		$('#stats-expmult').html('Exp mult: x' + fix(game.player.getGlobalExpMult()));
		$('#stats-timemult').html('Time mult: /' + fix(game.player.getGlobalTimeMult()));
		$('#stats-totalmoney').html('Total money: $' + fix(game.player.totalMoney));
		$('#stats-prestigied').html('Prestigied: ' + 'TODO' + ' times');
		$('#stats-irccost').html('IRC cost: $' + fix(game.servers.getCost(game.servers.irc)));
		$('#stats-vmcost').html('VM cost: $' + fix(game.servers.getCost(game.servers.vm)));
		$('#stats-ircowned').html('IRC owned: ' + game.servers.irc.owned);
		$('#stats-vmowned').html('VM owned: ' + game.servers.vm.owned);
	},

	varInit: function() {
		game.console.varInit();

		game.interval = 1000 / game.fps;

		game.intervals.core = setInterval(function() {
			game.core();
		}, game.interval);
	},

	domInit: function() {
		$('#game-version').html('v' + game.version);
		
		$('#console-input').bind('keydown', function(e) {
			if (e.which == 13)
				game.console.parser();
		}).bind(('cut copy paste'), function(e) {
			e.preventDefault();
		});
		
		$('.enter').on('click', function() {
			game.console.parser();
		});
		
		$('.blinking-arrow').on('click', function() {
			$('#console-input').focus();
		});
		
		$('#console-input').focus();
		
		setTimeout(function() {
			if (!game.options.background)
				game.options.toggleBackground('disabled');
		}, 250);
	},

	init: function() {
		game.varInit();
		game.domInit();
		game.kongregate.init();

		console.info('v' + game.version + ':', 'game ready to play!');
	}
};