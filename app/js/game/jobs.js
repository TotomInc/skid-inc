game.jobs = {
	baseCash: 1000,
	baseExp: 175,
	baseTime: 30,

	progress: 0,
	spawned: false,
	current: undefined,
	status: undefined,
	accepted: false,

	interval: 180e3,
	stories: [
		'An hacker need your help to debug his code. Do you want to help him?',
		'Your friend want to learn to hack, do you want to help him?',
		'A friend want to hack a not famous, random site, wanna help him?',
		'A script-kid is asking for advices. Wanna teach him?'
	]
};

g.jobs.getCash = () => {
	var cashMult = g.player.getCashMult();

	return Math.floor(Math.pow(1.23, g.player.level) * g.jobs.baseCash);
};

g.jobs.getExp = () => {
	var expMult = g.player.getExpMult();

	return Math.floor(Math.pow(1.23, g.player.level) * g.jobs.baseExp);
};

g.jobs.getTime = () => {
	return g.jobs.baseTime + randomInclusive(0, 45);
};

g.jobs.loop = (times) => {
	if (g.jobs.status == 'accepted' && g.jobs.spawned) {
		var time = g.jobs.current.time,
			bar = '|',
			timeLeft = 0,
			percent = Math.floor(g.jobs.progress / time * 100),
			filled = Math.floor(g.jobs.progress / time * 35),
			left = Math.floor(35 - filled);

		g.jobs.progress += times / g.options.fps;

		if (g.jobs.progress < time) {
			for (var i = 0; i < filled; i++)
				bar += '#';

			for (var e = 0; e < left; e++)
				bar += '=';

			timeLeft = time - g.jobs.progress;
			bar += '| ' + fix(percent, 0) + '%, ' + fix(timeLeft, 2) + ' s.';

			$('#job-progress').html(bar)
		}
		else if (g.jobs.progress >= time) {
			for (var j = 0; j < 35; j++)
				bar += '#';

			bar += '| 100%, 0.00s';

			g.console.print('Job finished, you earned $' + fix(g.jobs.current.cash) + ' and ' + fix(g.jobs.current.exp) + ' exp.');
			$('#job-progress').html(bar);

			g.earnMoney(g.jobs.current.cash);
			g.earnExp(g.jobs.current.exp);
			g.console.setDefaultBinds();

			g.jobs.status = 'finished';
			g.jobs.current = undefined;
			g.jobs.accepted = false;
			g.jobs.progress = 0;
		};
	};
};

g.jobs.spawn = () => {
	var rand = randomInclusive(0, 0);

	if (rand == 0 && !g.jobs.spawned) {
		var randStory = randomInclusive(0, g.jobs.stories.length - 1);

		g.jobs.spawned = true;
		g.jobs.status = 'waiting for response';
		g.jobs.current = {
			id: randStory,
			cash: g.jobs.getCash(),
			exp: g.jobs.getExp(),
			time: g.jobs.getTime()
		};

		g.console.print(g.jobs.stories[randStory] +
			' You will earn $' + fix(g.jobs.current.cash) + ' and ' + fix(g.jobs.current.exp) + ' exp.' +
			' This offer will take ' + fix(g.jobs.current.time, 0) + ' seconds, you will not be able to send commands.' +
			' You have one minute to resond to this offer with the command <b>jobs respond accept/reject</b>.');

		setTimeout(function() {
			if (!g.jobs.accepted && g.jobs.status == 'waiting for response') {
				g.jobs.status = 'too late';
				g.console.print('It\'s too late to accept this job offer.');
			};
		}, 60000);
	}
	else if (g.jobs.status == 'too late' || g.jobs.status == 'too late' || g.jobs.status == 'finished') {
		g.jobs.spawned = false;
		g.jobs.status = undefined;
		g.jobs.accepted = false;
		g.jobs.current = undefined;
	};
};

g.jobs.respond = (response) => {
	if (typeof g.jobs.current !== 'object' && g.jobs.status == 'rejected')
		return g.console.print('You rejected the offer, wait for another one.');
	if (typeof g.jobs.current !== 'object')
		return g.console.print('There is no job offer, wait for one.');
	if (g.jobs.status == 'too late')
		return g.console.print('It\'s too late, wait for the next offer.');
	if (g.jobs.status == 'accepted')
		return g.console.print('You accepted the offer, wait for another one.');
	if (g.jobs.status == 'finished')
		return g.console.print('You finished the offer, wait for another one.');
	if (g.jobs.status == 'waiting for response' && response == 'reject') {
		g.jobs.current = undefined;
		g.jobs.status = 'rejected';
		return g.console.print('You rejected the offer.');
	};
	if (g.jobs.status == 'waiting for response' && response == 'accept') {
		g.jobs.accepted = true;
		g.jobs.status = 'accepted';
		g.console.print('You successfully accepted the job offer.');

		$('.enter, #console-input').unbind();
		$('.text-side').prepend('<p id="job-progress">');
	};
};