g.save = {
	salt: 'SkidInc',
	interval: 60e3,

	toSave: [
		'g.player.money',
		'g.player.totalMoney',
		'g.player.level',
		'g.player.exp',
		'g.player.rank',
		'g.player.isNew',
		'g.player.difficulty',

		'g.servers.personal.owned',

		'g.hackers.noob.owned',
		'g.hackers.script_kiddie.owned',
		'g.hackers.coder.owned',
		'g.hackers.hax0r.owned',
		'g.hackers.prodigy.owned',
		'g.hackers.elite_hacker.owned',
		'g.hackers.elite_skid.owned',

		'g.scripts.script.owned',
		'g.scripts.bot.owned',
		'g.scripts.vm.owned',
		'g.scripts.raspberry.owned',
		'g.scripts.computer.owned'
	]
};

g.save.save = (console) => {
	var save = '',
		values = [];

	for (var i = 0; i < g.save.toSave.length; i++)
		values.push(eval(g.save.toSave[i]));

	save = btoa(JSON.stringify(values));
	localStorage.setItem(g.save.salt, save);

	if (console)
		g.console.print('Game successfully saved.');

	return debug('Game saved.');
};

g.save.load = (console, auto) => {
	if (localStorage.getItem(g.save.salt) == null)
		return warn('No save found.');
	else {
		var loaded = localStorage.getItem(g.save.salt),
			decrypted = JSON.parse(atob(loaded));

		for (var i = 0; i < g.save.toSave.length; i++) {
			if (typeof decrypted[i] == 'undefined')
				return;

			if (typeof decrypted[i] == 'string')
				eval(g.save.toSave[i] + ' = "' + decrypted[i] + '"');
			else
				eval(g.save.toSave[i] + ' = ' + decrypted[i]);
		};

		if (console) {
			g.save.save();
			g.console.print('Savegame loaded. You may need to refresh the page if something is broken.');
		};

		return debug('Save loaded.');
	};
};

g.save.erase = () => {
	if (localStorage.getItem(g.save.salt) == null)
		return warn('No save found.');
	else {
		window.onbeforeunload = null;
		clearInterval(g.options.intervals.save);
		localStorage.removeItem(g.save.salt);
		location.reload();
	};
};