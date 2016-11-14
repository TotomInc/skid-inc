game.player = {
	money: 0,
	totalMoney: 0,
	reputation: 0,
	level: 1,
	exp: 0,
	expReq: 200,
	expInflation: 1.175,
	prestigied: 0,
	
	getGlobalMoneyMult: function() {
		var ircEffect = game.servers.getTotalEffects(game.servers.irc).moneyEffect,
			adMult = game.kongregate.getBonusMult();

		return (ircEffect) * adMult;
	},

	getGlobalExpMult: function() {
		var ircEffect = game.servers.getTotalEffects(game.servers.irc).expEffect,
			adMult = game.kongregate.getBonusMult();

		return (ircEffect) * adMult;
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
			game.player.expReq = Math.floor(200 * Math.pow(game.player.expInflation, game.player.level));
		};
	}
};