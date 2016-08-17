game.hack = {
	minDefaultHackCash: 15,
	maxDefaultHackCash: 25,
	minDefaultHackExp: 5,
	maxDefaultHackExp: 10,

	isHacking: false,
	hackingWhat: undefined,
	hackProgress: 0
};

g.hack.quickhack = () => {
	var randCash = randomInclusive(g.hack.minDefaultHackCash, g.hack.maxDefaultHackCash) * g.player.getCashMult(),
		randExp = randomInclusive(g.hack.minDefaultHackExp, g.hack.maxDefaultHackExp) * g.player.getExpMult();

	g.earnMoney(randCash);
	g.earnExp(randExp);
	g.console.print('+$' + fix(randCash) + ', +' + fix(randExp) + ' exp.');
};

g.hack.place = (place) => {
	if (!g.hack.isHacking && g.player.level >= g.places[place].levelReq) {
		g.hack.isHacking = true;
		g.hack.hackingWhat = place;
		g.console.print('Starting ' + g.places[place].cleanName + ' hack.');
		$('.text-side').prepend('<p id="hack-progress"></p>');
	}
	else if (g.hack.isHacking)
		g.console.print('Error: you are already hacking a place.');
	else if (g.player.level < g.places[place].levelReq)
		g.console.print('<b><u>Error</u></b>: you don\'t have the required level to hack this place.');
	else
		g.console.print('<b><u>Error</u></b>: you can\'t hack this place.');
};

g.hack.loop = (times) => {
	if (g.hack.isHacking) {
		var place = g.hack.hackingWhat,
			time = g.places.getTime(place),
			timeLeft = 0,
			percent = Math.floor(g.hack.hackProgress / time  * 100),
			filled = Math.floor(g.hack.hackProgress / time * 35),
			left = Math.ceil(35 - filled),
			bar = '|';

		g.hack.hackProgress += times / g.options.fps;

		if (g.hack.hackProgress < time) {
			for (var i = 0; i < filled; i++)
				bar += '#';

			for (var e = 0; e < left; e++)
				bar += '=';

			timeLeft = time - g.hack.hackProgress;
			bar += '| ' + fix(percent, 0) + '%, ' + fix(timeLeft, 2) + ' s.';

			$('#hack-progress').html(bar);
		}
		else if (g.hack.hackProgress >= time) {
			var money = g.places.getCash(g.hack.hackingWhat),
				exp = g.places.getExp(g.hack.hackingWhat);

			for (var j = 0; j < 35; j++)
				bar += '#';

			bar += '| 100%, 0.00s';

			g.console.print(cap(g.places[place].cleanName) + ' hack finished, you earned $' + fix(money) + ' and ' + fix(exp) + ' exp.');
			$('#hack-progress').html(bar).attr('id', 'old-hack-progress');

			g.earnMoney(money);
			g.earnExp(exp);

			g.hack.isHacking = false;
			g.hack.hackingWhat = undefined;
			g.hack.hackProgress = 0;
		};
	};
};