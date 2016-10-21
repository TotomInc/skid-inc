game.player = {
	money: 0,
	totalMoney: 0,
	reputation: 0,
	level: 1,
	exp: 0,
	expReq: 100,
	oldExpReq: 100,
	expInflation: 1.0405,
	
	getGlobalMoneyMult: function() {
		var ircEffect = game.servers.getTotalEffects(game.servers.irc).moneyEffect;

		return (ircEffect);
	},

	getGlobalExpMult: function() {
		var ircEffect = game.servers.getTotalEffects(game.servers.irc).expEffect;

		return (ircEffect);
	},

	getGlobalTimeMult: function() {
		var vmEffect = game.servers.getTotalEffects(game.servers.vm).timeEffect;

		return (vmEffect);
	},

	earnMoney: function(amount) {
		game.player.money += amount;
		game.player.totalMoney += amount;
	},
	
	earnExp: function(amount) {
		game.player.exp += amount;
		
		while (game.player.exp >= game.player.expReq) {
			game.player.level++;
			game.player.exp -= game.player.expReq;
			game.player.expReq = Math.pow(game.player.oldExpReq, game.player.expInflation);
			game.player.oldExpReq = Math.pow(game.player.oldExpReq, game.player.expInflation);
			game.console.print('<b>Level-up!</b> You are now level <b>' + game.player.level + '</b>.', 'success');
		};
	},
	
	earnReputation: function(amount) {
		game.player.reputation += amount;
	}
};