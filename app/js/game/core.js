var game = {
	now: new Date().getTime(),
	before: new Date().getTime(),
	version: 0.21,
	fps: 30,
	interval: 1000,
	intervals: {
		core: undefined,
		save: undefined
	},
	theme: 'snow',

	core: function() {
		game.now = new Date().getTime();

		var elapsed = game.now - game.before,
			times = Math.floor(elapsed / game.interval);

		elapsed > game.interval ? game.update(times) : game.update(1);

		game.before = new Date().getTime();
	},

	update: function(times) {
		game.hack.loop(times);
		game.virus.loop(times);
		game.hack.hackerLoop(times);
		game.kongregate.bonusTimeLoop(times);
		
		game.display();
	},

	display: function() {
		$('#stats-money').html('Money: $' + fix(game.player.money));
		$('#stats-level').html('Level: ' + game.player.level);
		$('#stats-exp').html('Exp: ' + fix(game.player.exp, 0) + '/' + fix(game.player.expReq, 0));
		$('#stats-reputation').html('Reputation: ' + fix(game.player.reputation));
		$('#stats-moneymult').html('Money mult: x' + fix(game.player.getGlobalMoneyMult()));
		$('#stats-expmult').html('Exp mult: x' + fix(game.player.getGlobalExpMult()));
		$('#stats-timemult').html('Time mult: /' + fix(game.player.getGlobalTimeMult()));
		$('#stats-totalmoney').html('Total money: $' + fix(game.player.totalMoney));
		$('#stats-prestigied').html('Prestigied: ' + fix(game.player.prestigied, 0) + ' times');
		$('#stats-irccost').html('IRC cost: $' + fix(game.servers.getCost(game.servers.irc)));
		$('#stats-vmcost').html('VM cost: $' + fix(game.servers.getCost(game.servers.vm)));
		$('#stats-ircowned').html('IRC owned: ' + game.servers.irc.owned);
		$('#stats-vmowned').html('VM owned: ' + game.servers.vm.owned);
		$('#stats-zombieowned').html('Zombies owned: ' + game.servers.zombie.owned);
		$('#stats-infectionspersec').html('Infections/sec: ' + game.virus.getAllVirusSend());
		$('#stats-botnetpower').html('Botnet power: ' + fix(game.botnet.power));
		$('#stats-powermult').html('Power mult: x' + fix(game.botnet.getPowerMult()));
		
		if (typeof game.kongregate.isGuest == 'boolean')
			$('#navbar-bonustime').html('<b>x' + game.kongregate.getMult() + '</b> ads boost: ' + msToTime(game.kongregate.bonusTime));
	},

	varInit: function() {
		game.console.varInit();

		game.interval = 1000 / game.fps;

		game.intervals.core = setInterval(function() {
			game.core();
		}, game.interval);
        
        game.intervals.save = setInterval(function() {
            game.save.save();
        }, game.save.interval);
        
        window.onbeforeunload = function() {
        	game.save.save();
        };
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
		}, 1000);
		
		switch(game.theme) {
			case 'default':
				initMatrixBackground();
				break;
			
			case 'snow':
				initSnowBackground();
				break;
		};
	},

	init: function() {
		game.varInit();
		game.save.load();
		game.update(Math.floor((game.now - game.before) / game.interval));
		game.domInit();
		game.kongregate.init();

		console.info('v' + game.version + ':', 'game ready to play!');
	}
};