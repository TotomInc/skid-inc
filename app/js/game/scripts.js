g.scripts = {
	calledOnce: false,

	script: {
		owned: 0,
		baseCost: 50,
		inflation: 1.30,
		effect: 1
	},
	bot: {
		owned: 0,
		baseCost: 1e5,
		inflation: 1.30,
		effect: 5
	},
	vm: {
		owned: 0,
		baseCost: 5e10,
		inflation: 1.30,
		effect: 10
	},
	raspberry: {
		owned: 0,
		baseCost: 25e15,
		inflation: 1.30,
		effect: 20
	},
	computer: {
		owned: 0,
		baseCost: 75e20,
		inflation: 1.30,
		effect: 40
	}
};

g.scripts.getTotalEffect = () => {
	var total = 0;

	for (var item in g.scripts) {
		if (typeof g.scripts[item] == 'object') {
			var countOnThis = g.scripts[item].owned * g.scripts[item].effect;
			total += countOnThis;
		};
	};

	return total;
};

g.scripts.getPrice = (what) => {
	return Math.pow(g.scripts[what].inflation, g.scripts[what].owned) * g.scripts[what].baseCost;
};

g.scripts.getAverageCashPerSec = () => {
	var total = g.scripts.getTotalEffect(),
		cashMult = g.player.getCashMult();

	return ((g.hack.maxDefaultHackCash - g.hack.minDefaultHackCash) * total) * cashMult;
};

g.scripts.getAverageExpPerSec = () => {
	var total = g.scripts.getTotalEffect(),
		expMult = g.player.getExpMult();

	return ((g.hack.maxDefaultHackExp - g.hack.minDefaultHackExp) * total) * expMult;
};

g.scripts.buy = (what) => {
	var price = g.scripts.getPrice(what);

	if (g.player.money >= price) {
		g.player.money -= price;
		g.scripts[what].owned++;
		g.console.print('You successfully bought a ' + what + '.');

		g.console.commands.filter(function(baseCmd) {
			if (baseCmd.name !== 'buy')
				return;

			baseCmd.commands.filter(function(cmd) {
				if (cmd.cleanCmd.indexOf('script (option)') > -1) {
					for (var i = 0; i < cmd.customDesc.length; i++) {
						var splitDesc = cmd.customDesc[i].split('$');

						splitDesc[1] = '$' + fix(g.scripts.getPrice(cmd.options[i])) + '.';
						cmd.customDesc[i] = splitDesc.join('');
					};
				};
			});
		});
	}
	else if (g.player.money < price)
		g.console.print('<b><u>Error</u></b>: not enough money to buy a ' + what + '.');
	else
		g.console.print('<b><u>Error</u></b>: can\'t buy ' + what + '.');
};

g.scripts.action = (times) => {
	var total = g.scripts.getTotalEffect();

	var minEstimatedCash = (g.hack.minDefaultHackCash * g.player.getCashMult()) * total,
		maxEstimatedCash = (g.hack.maxDefaultHackCash * g.player.getCashMult()) * total,
		minEstimatedExp = (g.hack.minDefaultHackExp * g.player.getExpMult()) * total,
		maxEstimatedExp = (g.hack.maxDefaultHackExp * g.player.getExpMult()) * total,
		cash = randomInclusive(minEstimatedCash, maxEstimatedCash) * times,
		exp = randomInclusive(minEstimatedExp, maxEstimatedExp) * times;

	if (!g.scripts.calledOnce) {
		g.scripts.calledOnce = true;

		g.earnMoney(cash);
		g.earnExp(exp);

		setTimeout(function() {
			g.scripts.calledOnce = false;
		}, 1000);
	};
};

g.t = () => {
	return 1;
};

var t = [g.t()];

g.t = () => {
	return 2;
};