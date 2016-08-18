g.hackers = {
	'noob': {
		name: 'noob',
		cleanName: 'noob',
		effect: 'mini_market',
		price: 2000,
		owned: false,
		progress: 0
	},

	'script_kiddie': {
		name: 'script_kiddie',
		cleanName: 'script-kiddie',
		effect: 'market',
		price: 10e3,
		owned: false,
		progress: 0
	},

	'coder': {
		name: 'coder',
		cleanName: 'coder',
		effect: 'jewelry',
		price: 50e3,
		owned: false,
		progress: 0
	},

	'hax0r': {
		name: 'hax0r',
		cleanName: 'hax0r',
		effect: 'bank',
		price: 100e3,
		owned: false,
		progress: 0
	},

	'prodigy': {
		name: 'prodigy',
		cleanName: 'prodigy',
		effect: 'trading_center',
		price: 2e5,
		owned: false,
		progress: 0
	},

	'elite_hacker': {
		name: 'elite_hacker',
		cleanName: 'elite-hacker',
		effect: 'anonymous_hideout',
		price: 5e6,
		owned: false,
		progress: 0
	},

	'elite_skid': {
		name: 'elite_skid',
		cleanName: 'elite-skid',
		effect: 'deepweb',
		price: 10e8,
		owned: false,
		progress: 0
	}
};

g.hackers.getPrice = (who) => {
	return g.hackers[who].price;
};

g.hackers.buy = (who) => {
	var price = g.hackers.getPrice(who);

	if (g.player.money >= price) {
		g.player.money -= price;
		g.hackers[who].owned = true;

		return g.console.print('You successfully hired ' + g.hackers[who].cleanName + '.');
	}
	else if (g.hackers[who].owned)
		return g.console.print('<b><u>Error</u></b>: you already own this hacker.');
	else if (g.player.money < price)
		return g.console.print('<b><u>Error</u></b>: not enough money to hire ' + g.hackers[who].cleanName + '.');
	else
		return g.console.print('<b><u>Error</u></b>: you can\'t hire ' + g.hackers[who].cleanName + '.');
};