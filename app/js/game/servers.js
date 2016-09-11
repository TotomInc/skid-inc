g.servers = {
	personal: {
		baseCost: 15e3,
		inflation: 1.30,
		moneyMult: 0.15,
		expMult: 0.08,
		owned: 0
	}
};

g.servers.getCost = (what) => {
	return Math.floor(Math.pow(g.servers[what].inflation, g.servers[what].owned) * g.servers[what].baseCost);
};

g.servers.getAllCashMult = () => {
	var mult = 1;

	for (var server in g.servers) {
		if (typeof g.servers[server] == 'object')
			mult += g.servers.getCashMult(server);
	};

	return mult;
};

g.servers.getAllExpMult = () => {
	var mult = 1;

	for (var server in g.servers) {
		if (typeof g.servers[server] == 'object')
			mult += g.servers.getExpMult(server);
	};

	return mult;
};

g.servers.getCashMult = (what) => {
	if (typeof g.servers[what].moneyMult == 'number')
		return g.servers[what].moneyMult * g.servers[what].owned;
};

g.servers.getExpMult = (what) => {
	if (typeof g.servers[what].expMult == 'number')
		return g.servers[what].expMult * g.servers[what].owned;
};

g.servers.buy = (what) => {
	var price = g.servers.getCost(what);

	if (g.player.money >= price) {
		g.player.money -= price;
		g.servers[what].owned++;

		g.console.commands.filter(function(baseCmd) {
			if (baseCmd.name !== 'buy')
				return;

			baseCmd.commands.filter(function(cmd) {
				if (cmd.cleanCmd.indexOf('server (option)') > -1) {
					for (var i = 0; i < cmd.customDesc.length; i++) {
						var splitDesc = cmd.customDesc[i].split('$');

						splitDesc[1] = '$' + fix(g.servers.getCost(cmd.options[i])) + '.';
						cmd.customDesc[i] = splitDesc.join('');
					};
				};
			});
		});

		return g.console.print('You successfully bought a ' + what + ' server.');
	}
	else if (g.player.money < price)
		return g.console.print('<b><u>Error</u></b>: not enough money to buy a ' + what + ' server.');
	else
		return g.console.print('<b><u>Error</u></b>: can\'t buy a ' + what + ' server.');
};