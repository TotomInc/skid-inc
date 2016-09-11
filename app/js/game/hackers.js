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

g.hackers.loop = () => {
	if (g.options.vue !== 'hackers_progress')
		return;

	for (var hacker in g.hackers) {
		if (typeof g.hackers[hacker] == 'object' && g.hackers[hacker].owned) {
			var place = g.places[g.hackers[hacker].effect],
				time = g.places.getTime(place.name),
				timeLeft = 0,
				percent = Math.floor(g.hackers[hacker].progress / time  * 100),
				filled = Math.floor(g.hackers[hacker].progress / time * 35),
				left = Math.ceil(35 - filled),
				bar = '|';

			for (var i = 0; i < filled; i++)
				bar += '#';

			for (var e = 0; e < left; e++)
				bar += '=';

			timeLeft = time - g.hackers[hacker].progress;
			bar += '| ' + fix(percent, 0) + '%, ' + fix(timeLeft, 2) + ' s. (' + place.cleanName + ')';

			$('#' + hacker + '-progress').html(bar);
		};
	};
};