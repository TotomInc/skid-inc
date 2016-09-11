var beautify = {
	prefixes: [
	    "m", "b", "t", "q", "Q", "s", "S", "o", "n",
		"D", "UD", "DD", "TD", "qD", "QD", "sD", "SD", "OD", "ND",
		"V", "UV", "DV", "TV", "qV", "QV", "sV", "SV", "OV", "NV",
		"T", "UT", "DT", "TT", "qT", "QT", "sT", "ST", "OT", "NT"
	],

	beautify: function(x, n) {
		if (x >= 1e6) {
			var z = Math.floor(this.logFloor(x) / 3);
			var s = this.beautify(x / Math.pow(10, 3 * z), n);
			return s + "" + this.prefixes[z - 2];
		} else if (x === 0 || typeof x == "undefined" || isNaN(x))
			return 0;
		else
			return this.numberWithCommas(x.toFixed(n));
	},

	numberWithCommas: function(n) {
		var parts = n.toString().split(".");

		return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
	},

	logFloor: function(x) {
		var count = 0;

		while (x >= 10) {
			count++;
			x /= 10;
		};

		return count;
	},

	fix: function(x, n) {
		if (x >= 1e6)
			return beautify.beautify(x, 3)
		else if (x < 1e6 && typeof n == 'number')
			return beautify.beautify(x, n);
		else if (x < 1e6 && typeof n !== 'number')
			return beautify.beautify(x, 2);
	},

	varInit: function() {
		window['fix'] = beautify.fix;
	}
};

beautify.varInit();;

function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

String.prototype.cap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};;

var consolePrefix = 'SkidInc:',
    log = console.log.bind(console, consolePrefix),
    debug = console.info.bind(console, consolePrefix),
    warn = console.warn.bind(console, consolePrefix),
    error = console.error.bind(console, consolePrefix);;

// made by Neil Carpenter
// https://github.com/neilcarpenter/Matrix-code-rain

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];

	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	};

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

var M = {
	settings: {
		COL_WIDTH: 15,
		COL_HEIGHT: 25,
		VELOCITY_PARAMS: {
			min: 1,
			max: 3
		},
		CODE_LENGTH_PARAMS: {
			min: 5,
			max: 15
		},
		videoActive: false
	},

	animation: null,

	c: null,
	ctx: null,

	lineC: null,

	video: null,

	WIDTH: window.innerWidth,
	HEIGHT: window.innerHeight,

	COLUMNS: null,
	canvii: [],

	// font from here http://www.dafont.com/matrix-code-nfi.font
	font: '30px matrix-code',
	letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', '+', '-', '*', '/', '=', '%', '"', '\'', '#', '&', '_', '(', ')', ',', '.', ';', ':', '?', '!', '\\', '|', '{', '}', '<', '>', '[', ']', '^', '~'],

	codes: [],

	createCodeLoop: null,
	codesCounter: 0,

	init: function() {
		// main canvas
		M.c = document.getElementById('canvas');
		M.ctx = M.c.getContext('2d');
		M.c.width = M.WIDTH;
		M.c.height = M.HEIGHT;

		M.ctx.shadowBlur = 0;
		M.ctx.fillStyle = '#000';
		M.ctx.fillRect(0, 0, M.WIDTH, M.HEIGHT);
		M.ctx.font = M.font;

		M.COLUMNS = Math.ceil(M.WIDTH / M.settings.COL_WIDTH);

		for (var i = 0; i < M.COLUMNS; i++) {
			M.codes[i] = [];
			M.codes[i][0] = {
				'open': true,
				'position': {
					'x': 0,
					'y': 0
				},
				'strength': 0
			};
		}

		M.loop();
		M.createCode();

		window.onresize = function() {
			window.cancelAnimationFrame(M.animation);
			M.animation = null;
			M.ctx.clearRect(0, 0, M.WIDTH, M.HEIGHT);
			M.codesCounter = 0;

			M.WIDTH = window.innerWidth;
			M.HEIGHT = window.innerHeight;
			M.init();
		};
	},

	loop: function() {
		M.animation = requestAnimationFrame(function() {
			M.loop();
		});

		M.draw();
	},

	draw: function() {
		var velocity, height, x, y, c, ctx;

		if (!M.settings.videoActive) {
			M.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
			M.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
			M.ctx.fillRect(0, 0, M.WIDTH, M.HEIGHT);
		}
		else {
			M.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
			M.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
			M.ctx.fillRect(0, 0, M.WIDTH, M.HEIGHT);
			M.ctx.globalAlpha = 0.2;
			M.ctx.drawImage(M.video, 0, 0, M.WIDTH, M.HEIGHT);
			M.ctx.globalAlpha = 1;
		}

		M.ctx.globalCompositeOperation = 'source-over';

		for (var i = 0; i < M.COLUMNS; i++) {
			if (M.codes[i][0].canvas) {
				velocity = M.codes[i][0].velocity;
				height = M.codes[i][0].canvas.height;
				x = M.codes[i][0].position.x;
				y = M.codes[i][0].position.y - height;
				c = M.codes[i][0].canvas;
				ctx = c.getContext('2d');

				M.ctx.drawImage(c, x, y, M.settings.COL_WIDTH, height);

				if ((M.codes[i][0].position.y - height) < M.HEIGHT)
					M.codes[i][0].position.y += velocity;
				else
					M.codes[i][0].position.y = 0;
			}
		}

	},

	createCode: function() {
		if (M.codesCounter > M.COLUMNS) {
			clearTimeout(M.createCodeLoop);
			return;
		}

		var randomInterval = M.randomFromInterval(0, 100);
		var column = M.assignColumn();

		if (column) {
			var codeLength = M.randomFromInterval(M.settings.CODE_LENGTH_PARAMS.min, M.settings.CODE_LENGTH_PARAMS.max);
			var codeVelocity = (Math.random() * (M.settings.VELOCITY_PARAMS.max - M.settings.VELOCITY_PARAMS.min)) + M.settings.VELOCITY_PARAMS.min;
			var lettersLength = M.letters.length;

			M.codes[column][0].position = {
				'x': (column * M.settings.COL_WIDTH),
				'y': 0
			};

			M.codes[column][0].velocity = codeVelocity;
			M.codes[column][0].strength = M.codes[column][0].velocity / M.settings.VELOCITY_PARAMS.max;

			for (var i = 1; i <= codeLength; i++) {
				var newLetter = M.randomFromInterval(0, (lettersLength - 1));
				M.codes[column][i] = M.letters[newLetter];
			}

			M.createCanvii(column);

			M.codesCounter++;

		}

		M.createCodeLoop = setTimeout(M.createCode, randomInterval);

	},

	createCanvii: function(i) {
		var codeLen = M.codes[i].length - 1;
		var canvHeight = codeLen * M.settings.COL_HEIGHT;
		var velocity = M.codes[i][0].velocity;
		var strength = M.codes[i][0].strength;
		var text, fadeStrength;

		var newCanv = document.createElement('canvas');
		var newCtx = newCanv.getContext('2d');

		newCanv.width = M.settings.COL_WIDTH;
		newCanv.height = canvHeight;

		for (var j = 1; j < codeLen; j++) {
			text = M.codes[i][j];
			newCtx.globalCompositeOperation = 'source-over';
			newCtx.font = '30px matrix-code';

			if (j < 5) {
				newCtx.shadowColor = 'hsl(104, 79%, 74%)';
				newCtx.shadowOffsetX = 0;
				newCtx.shadowOffsetY = 0;
				newCtx.shadowBlur = 10;
				newCtx.fillStyle = 'hsla(104, 79%, ' + (100 - (j * 5)) + '%, ' + strength + ')';
			}
			else if (j > (codeLen - 4)) {
				fadeStrength = j / codeLen;
				fadeStrength = 1 - fadeStrength;

				newCtx.shadowOffsetX = 0;
				newCtx.shadowOffsetY = 0;
				newCtx.shadowBlur = 0;
				newCtx.fillStyle = 'hsla(104, 79%, 74%, ' + (fadeStrength + 0.3) + ')';
			}
			else {
				newCtx.shadowOffsetX = 0;
				newCtx.shadowOffsetY = 0;
				newCtx.shadowBlur = 0;
				newCtx.fillStyle = 'hsla(104, 79%, 74%, ' + strength + ')';
			}

			newCtx.fillText(text, 0, (canvHeight - (j * M.settings.COL_HEIGHT)));
		}

		M.codes[i][0].canvas = newCanv;
	},

	createLines: function(ctx) {
		var linesYBlack = 0;
		var linesYWhite = 0;

		ctx.beginPath();

		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';

		while (linesYBlack < M.HEIGHT) {
			ctx.moveTo(0, linesYBlack);
			ctx.lineTo(M.WIDTH, linesYBlack);

			linesYBlack += 5;
		}

		ctx.lineWidth = 0.15;
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';

		while (linesYWhite < M.HEIGHT) {

			ctx.moveTo(0, linesYWhite + 1);
			ctx.lineTo(M.WIDTH, linesYWhite + 1);

			linesYWhite += 5;
		}

		ctx.stroke();
	},

	assignColumn: function() {
		var randomColumn = M.randomFromInterval(0, (M.COLUMNS - 1));

		if (M.codes[randomColumn][0].open) {
			M.codes[randomColumn][0].open = false;
		}
		else {
			return false;
		}

		return randomColumn;
	},

	randomFromInterval: function(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	},

	snapshot: function() {
		M.createLines(M.ctx);
		window.open(M.c.toDataURL());
	}
};

window.onload = function() {
	$('body').prepend('<div id="matrix" class="matrix-effect" style="display: none;">');
	$('#matrix').append('<canvas id="canvas">');

	M.init();

    $('#matrix').fadeIn('slow', function() {

	});
};
;

function randomInclusive(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};;

var game = g = {};

g.earnMoney = function(amount)  {
    g.player.money += amount;
    g.player.totalMoney += amount;
};

g.earnExp = function(amount)  {
    g.player.exp += amount;

    while (g.player.exp >= g.player.expReq) {
        g.player.exp -= g.player.expReq;
        g.player.level++;
        g.player.calculateExpReq();
        g.console.print('Level-up, you are now level ' + g.player.level + '.');
    };
};

g.quickTutorial = function()  {
    if (g.player.isNew && !g.options.debug) {
        $('.text-side').prepend('<div id="quick-tutorial" class="typed">');
        $('#quick-tutorial').prepend('<p>');
        $("#quick-tutorial p").typed({
            strings: ['Welcome to <b>SkidInc</b>, an idle-game where you are a poor script kid trying to make money with your little knowledge in hacking.<br>^750' +
                    'To begin your hacking adventure, you need to choose the difficulty:<br>' +
                    '<b>normal difficulty</b> (you have access to console and a user interface but no money/experience modifiers).<br>' +
                    '<b>hardcore difficulty</b> (you have only access to console, no user interface but you have a global money/experience multiplier of x2.<br>^750' +
                    'To choose your difficulty, type the command <b>options difficulty yourDifficulty</b>.'],
            contentType: 'html',
            typeSpeed: -20,
            callback: function() {
                $('.typed-cursor').remove();
            }
        });
    };
};

g.loop = function()  {
    g.options.now = new Date().getTime();

    var elapsed = g.options.now - g.options.before,
        times = Math.floor(elapsed / g.options.interval);

    elapsed > g.options.interval ? g.updateGame(times) : g.updateGame(1);

    g.options.before = new Date().getTime();
};

g.updateGame = function(times)  {
    g.console.update();
    g.jobs.loop(times);
    g.scripts.action(times);
    g.hack.loop(times);
    g.hack.hackerLoop(times);
    g.hackers.loop();

    document.title = '$' + fix(g.player.money) + ' - SkidInc';
};;

game.options = {
    fps: 30,
    interval: undefined,
    intervals: new Object(),
    now: new Date().getTime(),
    before: new Date().getTime(),

    debug: true,
    version: 0.2,
    vue: 'default',

    whatOS: undefined,
    isOpera: false,
    isFirefox: false,
    isSafari: false,
    isIE: false,
    isEdge: false,
    isChrome: false,
    isBlink: false
};

g.options.toggleBackground = function(toggle)  {
    if (toggle == 'enable') {
        $('#matrix').fadeIn('slow');
        g.console.print('Matrix effect enabled.');
    }
    else {
        $('#matrix').fadeOut('slow');
        g.console.print('Matrix effect disabled.')
    };
};

g.options.switchTheme = function(theme)  {
    if (theme == 'dark') {
        $('.layer').fadeOut('slow', function() {
            $('.console').removeClass('green').addClass('dark');
        });
        g.console.print('Console theme changed to dark.');
    }
    else if (theme == 'green') {
        $('.console').removeClass('dark').addClass('green');
        $('.layer').fadeIn('slow');
        g.console.print('Console theme changed to green.');
    };
};

g.options.switchDifficulty = function(difficulty)  {
    if (g.player.isNew) {
        g.player.isNew = false;
        g.player.difficulty = difficulty;
        g.console.print('Difficulty changed to ' + difficulty + '.');
        g.console.print('Now that you picked your difficulty, you can now learn the game if you are not familiar with command line interfaces.<br>' +
                'I have written a small guide to introduce you into the game, type <b>guide</b> command.');
    }
    else
        g.console.print('Sorry, you can\'t change difficulty anymore. It can only be done for new players when starting the game.');
};

g.options.changeVue = function(vue)  {
    if (vue == 'default') {
        $('.text-side').empty();

        g.console.print('Back to default vue, you can now send commands.');
        g.console.setDefaultBinds();
        g.options.vue = 'default';
    }
    else if (vue == 'hackers_progress') {
        if (g.hack.isHacking)
            return g.console.print('Wait for your hack to finish before changing vue.');

        $('.text-side').empty();
        $('#console-input').unbind()
        .bind('keydown', function(e) {
            if (e.which == 13)
                g.console.strictMode('options display default');
        });

        for (var hacker in g.hackers) {
            if (typeof g.hackers[hacker] == 'object' && g.hackers[hacker].owned)
                $('.text-side').append('<p id="' + hacker + '-progress">');
        };

        g.options.vue = 'hackers_progress';
        g.console.print('Type <b>options display default</b> to write commands and leave this screen.');
    };
};

g.options.saveManager = function(what)  {
    if (what == 'save')
        return g.save.save(true);
    else if (what == 'load')
        return g.save.load(true);
    else if (what == 'erase')
        return g.save.erase();
    else
        g.console.print('<b><u>Error</u></b>: unknown save action.');
};

g.options.varInit = function()  {
    // os detection
    if (navigator.appVersion.indexOf("Win")!=-1)
        g.options.whatOS = "Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1)
        g.options.whatOS = "MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1)
        g.options.whatOS = "UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1)
        g.options.whatOS = "Linux";

    if (g.options.matrix)
        $('#matrix').css('display', 'none');
    else
        $('#matrix').fadeIn('slow');

    // browser detection
    g.options.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    g.options.isFirefox = typeof InstallTrigger !== 'undefined';
    g.options.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    g.options.isIE = /*@cc_on!@*/false || !!document.documentMode;
    g.options.isEdge = !g.options.isIE && !!window.StyleMedia;
    g.options.isChrome = !!window.chrome && !!window.chrome.webstore;
    g.options.isBlink = (g.options.isChrome || g.options.isOpera) && !!window.CSS;

    g.options.interval = Math.ceil(1000 / g.options.fps);
    g.options.intervals.core = setInterval(function() {
        g.loop();
    }, g.options.interval);
    g.options.intervals.jobs = setInterval(function() {
        g.jobs.spawn();
    }, g.jobs.interval);
    g.options.intervals.save = setInterval(function() {
        g.save.save(false, true);
    }, g.save.interval);

    window.onbeforeunload = function() {
        g.save.save();
    };

    g.options.debug == true && debug('g.options.varInit finished');
};;

g.options.notes = {
	latest: '<b>v0.20: SkidInc full-rewrite.</b><br>' +
		'- <b>better UI</b>: new console, you can switch between themes, try <b>options console -help</b>.<br>' +
		'- <b>commands executer rewrite</b>: no more bugs with commands, case sensitive, options not buggy anymore, code is easier to manage.<br>' +
		'- <b>random events</b>: jobs are random offers, you gain a consecutive amount of $$$ and exp just for a few seconds of your time.<br>' +
		'- <b>added \'scripts\'</b>: you can buy them like servers to automatize the <b>hack</b> command.<br>' +
		'- <b>balancing changes</b>: servers cost and effect have been reviewed, same for places rewards ($$$, exp, level requirement), hackers prices.',
	
	previous: ''
};

g.options.notes.write = function()  {
	g.console.print(g.options.notes.latest);
};;

game.player = {
    rank: 'Script Kid',
    money: 0,
    totalMoney: 0,
    level: 1,
    exp: 0,
    expReq: 100,
    expInflation: 1.30,

    isNew: true,
    difficulty: 'normal'
};

g.player.getCashMult = function()  {
	return g.servers.getAllCashMult();
};

g.player.getExpMult = function()  {
	return g.servers.getAllExpMult();
};

g.player.calculateExpReq = function()  {
	var exp = Math.floor(Math.pow(g.player.expInflation, g.player.level) * (100 * g.player.level));

	g.player.expReq = exp;
};;

game.console = {};

g.console.getFirstWord = function(command)  {
    var gotWhitespace = command.indexOf(' '),
        firstWord = command.substring(0, (gotWhitespace > 0) ? gotWhitespace : command.length);

    return firstWord;
};

g.console.getWordsAfterFirstWord = function(command)  {
    var parts = [];

    if (command.indexOf(' '))
        return command.split(' ');
    else
        return false;
};

g.console.clear = function()  {
    $('.text-side').empty();
};

g.console.print = function(text, typed)  {
    var rand = Math.floor(Math.random() * 1e9);

    if (typeof typed == 'undefined' || typed) {
        $('.text-side').prepend('<div id="text-' + rand + '" class="typed">');
        $('#text-' + rand).prepend('<p>');
        $('#text-' + rand + ' p').typed({
            strings: [text],
            contentType: 'html',
            typeSpeed: -30,
            callback: function() {
                $('.typed-cursor').remove();
            }
        });
    }
    else
        $('.text-side').prepend('<p id="text-' + rand + '" class="typed">').html(text);

    if ($('.typed').size() >= 18)
        $($('.typed').get(18)).remove();
};

g.console.guide = function()  {
    g.console.print('Start by typing the <b>hack</b> command to earn some $$$ and experience.<br>' +
        'You can take a look at commands available with the <b>help</b> command.<br>' +
        'But it\'s not the list of all the commands available, a command like <b>hack</b> have many commands hidden on it. Try <b>hack -help</b>.<br>' +
        'When you earned some $$$ (at least more than 50$), you can hire your first script. This script will automatically execute the <b>hack</b> command for you.<br>' +
        'Take a look at the <b>buy</b> command, at this point you should be able to buy your first script.');
};

g.console.credits = function()  {
    g.console.print('SkidInc v' + g.options.version + '.<br>' +
        'An idle/incremental-game made by TotomInc.<br>' +
        'An original idea from Emiel.<br>' +
        'Logo made by Tim.<br>' +
        'Thanks to /r/incremental_games and /r/skidinc for their help!<br>' +
        'Subscribe to <a target="_blank" href="http://www.reddit.com/r/skidinc">/r/skidinc</a> for news about the game.');
};

g.console.help = function()  {
    for (var i = 0; i < g.console.commands.length; i++)
        g.console.print('<b>' + g.console.commands[i].name + '</b>: ' + g.console.commands[i].desc);
    g.console.print('For more in-depth help about a command, type <b>command -help</b>, it works too for commands with options <b>command cmd -help</b>.');
};

g.console.strictMode = function(cmd)  {
    var command = $('#console-input').val();

    if (command !== cmd)
        g.console.print('<b><u>Error</u></b>: you can\'t execute other commands than <b>' + cmd + '</b>.');
    else if (command == cmd)
        g.console.execute(command);

    $('#console-input').val('');
};

g.console.commandsHelp = function(command, cmdCmd)  {
    g.console.commands.filter(function(baseCmd) {
        if (baseCmd.name !== command)
            return;

        baseCmd.commands.filter(function(cmd) {
            var split = cmd.cleanCmd.split(' ');

            if (split.indexOf('-help') > -1)
                return;

            if (typeof cmd.options == 'object' && typeof cmdCmd == 'undefined')
                g.console.print('<b>' + cmd.cleanCmd + '</b>: ' + cmd.desc);
            else if (typeof cmd.options == 'object' && typeof cmdCmd == 'string' && cmd.cleanCmd.indexOf(cmdCmd) > 0) {
                for (var i = 0; i < cmd.options.length; i++) {
                    var cmdParts = cmd.cleanCmd.split(' ');
                    cmdParts[cmd.optionsIndex] = cmd.options[i];
                    cmdParts = cmdParts.join(' ');
                    g.console.print('<b>' + cmdParts + '</b>: ' + cmd.customDesc[i])
                };
            }
            else if (typeof cmdCmd == 'undefined')
                g.console.print('<b>' + cmd.cleanCmd + '</b>: ' + cmd.desc);
        });
    });
};

g.console.enter = function()  {
    var command = $('#console-input').val();

    g.console.execute(command);

    $('#console-input').val('');
};

g.console.execute = function(command)  {
    var firstWord = g.console.getFirstWord(command),
        baseCmdFound = false,
        cmdFound = false,
        emptyCmd = false,
        result;

    if (command == '') {
        emptyCmd = true;
        g.console.errorHandler(command, emptyCmd);
        return;
    };

    g.console.commands.filter(function(baseCmd) {
        var baseCmdRegex = new RegExp(baseCmd.pattern);

        if (!baseCmdRegex.test(firstWord) && !baseCmdFound)
            return;
        else
            baseCmdFound = true;

        baseCmd.commands.filter(function(cmd) {
            if (typeof cmd.options == 'object') {
                var parts = command.split(' '),
                    goodOption = undefined;

                for (var i = 0; i < cmd.options.length; i++) {
                    if (parts[cmd.optionsIndex] == cmd.options[i])
                        goodOption = cmd.options[i];
                };

                if (typeof goodOption == 'string') {
                    var pattern = cmd.pattern,
                        firstPart = pattern.substring(0, pattern.indexOf('[\\w]')),
                        secondPart = pattern.substring(pattern.indexOf('[\\w]') + 4, pattern.length),
                        fullStr = firstPart + goodOption + secondPart,
                        regex = new RegExp(fullStr);

                    if (regex.test(command)) {
                        cmdFound = true;
                        result = cmd;
                        result.cmd = command;
                        return;
                    };
                };
            }
            else {
                var cmdRegex = new RegExp(cmd.pattern);

                if (cmdFound || (!cmdRegex.test(command) && !cmdFound))
                    return;
                else if (cmdRegex.test(command) && !cmdFound) {
                    cmdFound = true;
                    result = cmd;
                };
            };
        });
    });

    if (!cmdFound || !baseCmdFound) 
        g.console.errorHandler(command, false, baseCmdFound, cmdFound);
    else {
        if (typeof result.options == 'object') {
            var parts = command.split(' ');

            typeof result.callback == 'function' && result.callback();
            eval(result.execute)(parts[result.optionsIndex]);
        }
        else {
            typeof result.callback == 'function' && result.callback();
            eval(result.execute);
        };
    };
};

g.console.errorHandler = function(command, emptyCmd, baseCmdFound, cmdFound)  {
    var firstWord = g.console.getFirstWord(command),
        wordsAfterFirstWord = g.console.getWordsAfterFirstWord(command);

    if (emptyCmd)
        return g.console.print('<b><u>CommandError</u></b>: you can\'t send an empty command.');
    else if (!baseCmdFound)
        return g.console.print('<b><u>CommandError</u></b>: <b>' + firstWord + '</b> is not a recognized command.');
    else if (!cmdFound && wordsAfterFirstWord.length > 1)
        return g.console.print('<b><u>CommandError</u></b>: unrecognized parameters.');
    else if (!cmdFound && wordsAfterFirstWord.length == 1)
        return g.console.print('<b><u>CommandError</u></b>: this command need parameters.');
};

g.console.setDefaultBinds = function()  {
    $('.enter, #console-input').unbind();

    $('.enter').on('click', function() {
        g.console.enter();
    });

    $('#console-input').bind('keydown', function(e) {
        if (e.which == 13)
            g.console.enter();
    }).bind(('cut copy paste'), function(e) {
        e.preventDefault();
    });
};

g.console.update = function()  {
    $('#console-name').html(g.player.rank);
    $('#console-money').html('$' + fix(g.player.money));
    $('#console-level').html('Level ' + fix(g.player.level, 0));
    $('#console-exp').html('Exp. ' + fix(g.player.exp) + '/' + fix(g.player.expReq));
    $('#script-income').html('Scripts ~$' + fix(g.scripts.getAverageCashPerSec()) + '/sec<br>' +
        '~exp ' + fix(g.scripts.getAverageExpPerSec()) + '/sec');
    $('#player-mults').html('Money mult x' + fix(g.player.getCashMult(), 2) + '<br>' +
        'Exp mult x' + fix(g.player.getExpMult()));
};

g.console.varInit = function()  {
    g.console.commands.filter(function(baseCmd) {
        if (baseCmd.name == 'help')
            return;

        baseCmd.commands.push({
            pattern: '^' + baseCmd.name + '[\\s]-help$',
            cleanCmd: baseCmd.name + ' -help',
            desc: 'more in-depth help for command ' + baseCmd.name,
            execute: 'g.console.commandsHelp("' + baseCmd.name + '")'
        });

        baseCmd.commands.filter(function(cmd) {
            if (typeof cmd.options == 'object') {
                var indexFirstS = cmd.pattern.indexOf('\\s]') + 3,
                    indexSecondS = cmd.pattern.indexOf('[\\s', indexFirstS),
                    cmdCmd = cmd.pattern.substring(indexFirstS, indexSecondS);

                baseCmd.commands.push({
                    pattern: '^' + baseCmd.name + '[\\s]' + cmdCmd + '[\\s]-help$',
                    cleanCmd: baseCmd.name + ' ' + cmdCmd + ' -help',
                    desc: 'more in-depth help for command ' + baseCmd.name + ' ' + cmdCmd + '.',
                    execute: 'g.console.commandsHelp("' + baseCmd.name + '", "' + cmdCmd + '")'
                });
            };
        });
    });

    g.options.debug == true && debug('g.console.varInit finished');
};

g.console.domInit = function()  {
    $('.infos-side')
        .append('<div id="player-stats">')
        .append('<div id="player-multipliers" class="console-mults">')
        .append('<div id="game-stuff" class="console-bottom">');
    $('#player-stats')
        .append('<p id="console-name">')
        .append('<p id="console-money">')
        .append('<p id="console-level">')
        .append('<p id="console-exp">')
        .append('<p id="script-income">');
    $('#player-multipliers')
        .append('<p id="player-mults">');
    $('#game-stuff')
        .append('<p id="game-version">');
    $('#game-version')
        .html('v' + g.options.version);

    $('.input').hover(function() {
        if ($('.console').hasClass('dark'))
            $('.input-container').css('box-shadow', '0 0 4px #fff');
        else
            $('.input-container').css('box-shadow', '0 0 4px #18FF62');
    }, function() {
        $('.input-container').css('box-shadow', '');
    });

    $('.blinking-arrow').on('click', function() {
        $('#console-input').focus();
    });

    g.console.setDefaultBinds();

    g.options.debug == true && debug('g.console.domInit finished');
};;

game.places = {
	'mini_market': {
		name: 'mini_market',
		cleanName: 'mini-market',
		hacker: 'noob',
		minMoney: 250,
		maxMoney: 750,
		minExp: 100,
		maxExp: 300,
		time: 20,
		levelReq: 2
	},
	'market': {
		name: 'market',
		cleanName: 'market',
		hacker: 'script_kiddie',
		minMoney: 650,
		maxMoney: 2500,
		minExp: 200,
		maxExp: 500,
		time: 60,
		levelReq: 8
	},
	'jewelry': {
		name: 'jewelry',
		cleanName: 'jewelry',
		hacker: 'coder',
		minMoney: 7500,
		maxMoney: 15000,
		minExp: 400,
		maxExp: 1500,
		time: 480,
		levelReq: 15
	},
	'bank': {
		name: 'bank',
		cleanName: 'bank',
		hacker: 'hax0r',
		minMoney: 25000,
		maxMoney: 50000,
		minExp: 2500,
		maxExp: 10000,
		time: 2880,
		levelReq: 20
	},
	'trading_center': {
		name: 'trading_center',
		cleanName: 'trading-center',
		hacker: 'prodigy',
		minMoney: 1e5,
		maxMoney: 4e5,
		minExp: 15000,
		maxExp: 50000,
		time: 11520,
		levelReq: 28
	},
	'anonymous_hideout': {
		name: 'anonymous_hideout',
		cleanName: 'anonymous-hideout',
		hacker: 'elite_hacker',
		minMoney: 1e6,
		maxMoney: 1e7,
		minExp: 75000,
		maxExp: 150000,
		time: 34560,
		levelReq: 35
	},
	'deepweb': {
		name: 'deepweb',
		cleanName: 'deepweb',
		hacker: 'elite_skid',
		minMoney: 5e8,
		maxMoney: 15e8,
		minExp: 300000,
		maxExp: 1000000,
		time: 81920,
		levelReq: 50
	}
};

g.places.getTime = function(what)  {
	return g.places[what].time;
};

g.places.getAverageCash = function(what)  {
	var cashMult = g.player.getCashMult();

	return (g.places[what].maxMoney - g.places[what].minMoney) * cashMult;
};

g.places.getAverageExp = function(what)  {
	var expMult = g.player.getExpMult();

	return (g.places[what].maxExp - g.places[what].minExp) * expMult;
};

g.places.getCash = function(what)  {
	var cashMult = g.player.getCashMult();

	return randomInclusive(g.places[what].minMoney, g.places[what].maxMoney) * cashMult;
};

g.places.getExp = function(what)  {
	var expMult = g.player.getExpMult();

	return randomInclusive(g.places[what].minExp, g.places[what].maxExp) * expMult;
};;

g.servers = {
	personal: {
		baseCost: 15e3,
		inflation: 1.30,
		moneyMult: 0.15,
		expMult: 0.08,
		owned: 0
	}
};

g.servers.getCost = function(what)  {
	return Math.floor(Math.pow(g.servers[what].inflation, g.servers[what].owned) * g.servers[what].baseCost);
};

g.servers.getAllCashMult = function()  {
	var mult = 1;

	for (var server in g.servers) {
		if (typeof g.servers[server] == 'object')
			mult += g.servers.getCashMult(server);
	};

	return mult;
};

g.servers.getAllExpMult = function()  {
	var mult = 1;

	for (var server in g.servers) {
		if (typeof g.servers[server] == 'object')
			mult += g.servers.getExpMult(server);
	};

	return mult;
};

g.servers.getCashMult = function(what)  {
	if (typeof g.servers[what].moneyMult == 'number')
		return g.servers[what].moneyMult * g.servers[what].owned;
};

g.servers.getExpMult = function(what)  {
	if (typeof g.servers[what].expMult == 'number')
		return g.servers[what].expMult * g.servers[what].owned;
};

g.servers.buy = function(what)  {
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
};;

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

g.hackers.getPrice = function(who)  {
	return g.hackers[who].price;
};

g.hackers.buy = function(who)  {
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

g.hackers.loop = function()  {
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
};;

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

g.scripts.getTotalEffect = function()  {
	var total = 0;

	for (var item in g.scripts) {
		if (typeof g.scripts[item] == 'object') {
			var countOnThis = g.scripts[item].owned * g.scripts[item].effect;
			total += countOnThis;
		};
	};

	return total;
};

g.scripts.getPrice = function(what)  {
	return Math.pow(g.scripts[what].inflation, g.scripts[what].owned) * g.scripts[what].baseCost;
};

g.scripts.getAverageCashPerSec = function()  {
	var total = g.scripts.getTotalEffect(),
		cashMult = g.player.getCashMult();

	return ((g.hack.maxDefaultHackCash - g.hack.minDefaultHackCash) * total) * cashMult;
};

g.scripts.getAverageExpPerSec = function()  {
	var total = g.scripts.getTotalEffect(),
		expMult = g.player.getExpMult();

	return ((g.hack.maxDefaultHackExp - g.hack.minDefaultHackExp) * total) * expMult;
};

g.scripts.buy = function(what)  {
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

g.scripts.action = function(times)  {
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

g.t = function()  {
	return 1;
};

var t = [g.t()];

g.t = function()  {
	return 2;
};;

/*****
 *  Commands constructor:
 *
 *  object
 *      name:string
 *      desc:string
 *      pattern:regexString
 *      commands:array
 *          object:
 *              pattern:regexString : options must be tagged as [\\w] flag
 *                                  : must have [\\s] after the [\\w] flag
 *
 *              execute:string : if got an option, don't add parenthesis at the end
 *              cleanCmd:string : command without regex pattern, if options add (option) at right place
 *
 *              desc:string     : if cmd got options, desc is a global desc of the command with options
 *                              : else it explain the command
 *
 *              callback:function : a function called when the command have been executed
 *
 *              options:array : commands only have 1 option max. but can have multiple option on the array (at the same index)
 *
 *              optionsIndex:number : number 0-indexed, required if got options
 *
 *              customDesc:array : required if got options, each string in array match option index
 *
 *  Each command have cmd -help added on g.console.varInit
 *  Each command with an option have its specific help section added on g.console.varInit
 *****/

g.console.commands = [
    {
        name: 'hack',
        desc: 'hack things to earn money, experience and reputation.',
        pattern: '^hack$',
        commands: [
            {
                pattern: '^hack$',
                cleanCmd: 'hack',
                desc: 'quickhack, instant cash and experience, no cooldown.',
                execute: 'g.hack.quickhack()'
            },
            {
                pattern: '^hack[\\s]-p[\\s][\\w]$',
                cleanCmd: '^hack -p (option)',
                execute: 'g.hack.place',
                desc: 'hack a place to earn more $$$ and experience, can take some time depending the place.',
                customDesc: [
                    '~$' + fix(g.places.getAverageCash('mini_market')) + ', ~exp ' + fix(g.places.getAverageExp('mini_market')) + ', ' + fix(g.places.getTime('mini_market'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('market')) + ', ~exp ' + fix(g.places.getAverageExp('market')) + ', ' + fix(g.places.getTime('market'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('jewelry')) + ', ~exp ' + fix(g.places.getAverageExp('jewelry')) + ', ' + fix(g.places.getTime('jewelry'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('bank')) + ', ~exp ' + fix(g.places.getAverageExp('bank')) + ', ' + fix(g.places.getTime('bank'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('trading_center')) + ', ~exp ' + fix(g.places.getAverageExp('trading_center')) + ', ' + fix(g.places.getTime('trading_center'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('anonymous_hideout')) + ', ~exp ' + fix(g.places.getAverageExp('anonymous_hideout')) + ', ' + fix(g.places.getTime('anonymous_hideout'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('deepweb')) + ', ~exp ' + fix(g.places.getAverageExp('deepweb')) + ', ' + fix(g.places.getTime('deepweb'), 0) + ' sec.'
                ],
                options: [
                    'mini_market',
                    'market',
                    'jewelry',
                    'bank',
                    'trading_center',
                    'anonymous_hideout',
                    'deepweb'
                ],
                optionsIndex: 2
            }
        ]
    },

    {
        name: 'buy',
        desc: 'buy things such as bots and servers to automatize tasks.',
        pattern: '^buy$',
        commands: [
            {
                pattern: '^buy[\\s]script[\\s][\\w]',
                cleanCmd: 'buy script (option)',
                execute: 'g.scripts.buy',
                desc: 'buy some scripts to automatize tasks.',
                customDesc: [
                    'a script execute the <b>hack</b> command ' + g.scripts.script.effect + ' time/sec, cost $' + fix(g.scripts.getPrice('script')) + '.',
                    'a bot execute the <b>hack</b> command ' + g.scripts.bot.effect + ' times/sec, cost $' + fix(g.scripts.getPrice('bot')) + '.',
                    'a vm execute the <b>hack</b> command ' + g.scripts.vm.effect + 'times/sec, cost $' + fix(g.scripts.getPrice('vm')) + '.',
                    'a raspberry execute the <b>hack</b> command ' + g.scripts.raspberry.effect + ' times/sec, cost $' + fix(g.scripts.getPrice('raspberry')) + '.',
                    'a computer execute the <b>hack</b> command ' + g.scripts.computer.effect + ' times/sec, cost $' + fix(g.scripts.getPrice('computer')) + '.'
                ],
                options: ['script', 'bot', 'vm', 'raspberry', 'computer'],
                optionsIndex: 2
            },
            {
                pattern: '^buy[\\s]hacker[\\s][\\w]',
                cleanCmd: 'buy hacker (option)',
                execute: 'g.hackers.buy',
                desc: 'hire an hacker to automatize places hacks.',
                customDesc: [
                    'a noob auto-hack the mini-market, cost $' + fix(g.hackers.getPrice('noob')) + '.',
                    'a script-kiddie auto-hack the market, cost $' + fix(g.hackers.getPrice('script_kiddie')) + '.',
                    'a coder auto-hack the jewelry, cost $' + fix(g.hackers.getPrice('coder')) + '.',
                    'a hax0r auto-hack the bank, cost $' + fix(g.hackers.getPrice('hax0r')) + '.',
                    'a prodigy auto-hack the trading-center, cost $' + fix(g.hackers.getPrice('prodigy')) + '.',
                    'an elite-hacker auto-hack the anonymous-hideout, cost $' + fix(g.hackers.getPrice('elite_hacker')) + '.',
                    'an elite-skid auto-hack the deepweb, cost $' + fix(g.hackers.getPrice('elite_skid')) + '.'
                ],
                options: [
                    'noob',
                    'script_kiddie',
                    'coder',
                    'hax0r',
                    'prodigy',
                    'elite_hacker',
                    'elite_skid'
                ],
                optionsIndex: 2
            },
            {
                pattern: '^buy[\\s]server[\\s][\\w]',
                cleanCmd: 'buy server (option)',
                execute: 'g.servers.buy',
                desc: 'buy a server to earn more cash and exp.',
                customDesc: [
                    'increase global money multiplier by x' + fix(g.servers.personal.moneyMult, 2) +
                        ' and exp multiplier by x' + fix(g.servers.personal.expMult, 2) +
                        ', cost $' + fix(g.servers.getCost('personal')) + '.'
                ],
                options: [
                    'personal'
                ],
                optionsIndex: 2
            }
        ]
    },

    {
        name: 'jobs',
        desc: 'accept jobs when they are available to earn extra $$$ and exp.',
        pattern: '^jobs$',
        commands: [
            {
                pattern: '^jobs[\\s]respond[\\s][\\w]',
                cleanCmd: 'jobs respond (option)',
                execute: 'g.jobs.respond',
                desc: 'accept or reject a job offer.',
                customDesc: [
                    'accept the current job offer.',
                    'reject the current job offer.'
                ],
                options: ['accept', 'reject'],
                optionsIndex: 2
            }
        ]
    },

    {
        name: 'options',
        desc: 'change in-game options.',
        pattern: '^options$',
        commands: [
            {
                pattern: '^options[\\s]notes$',
                desc: 'print the latest patch-notes.',
                cleanCmd: 'options notes',
                execute: 'g.options.notes.write()'
            },
            {
                pattern: '^options[\\s]difficulty[\\s][\\w]$',
                cleanCmd: 'options difficulty (option)',
                desc: 'switch game difficulty, can only be done one time.',
                execute: 'g.options.switchDifficulty',
                customDesc: [
                    'change game difficulty to normal (no exp/money multiplier but access to user interface).',
                    'change game difficulty to hardcore (exp/money multiplier of x2 but no access to user interface).'
                ],
                options: ['normal', 'hardcore'],
                optionsIndex: 2
            },
            {
                pattern: '^options[\\s]console[\\s][\\w]$',
                cleanCmd: 'options console (option)',
                desc: 'change console theme.',
                execute: 'g.options.switchTheme',
                customDesc: [
                    'change console theme to green (default theme, better hacking experience).',
                    'change console theme to dark (classical theme, easier to read).'
                ],
                options: ['green', 'dark'],
                optionsIndex: 2
            },
            {
                pattern: '^options[\\s]matrix[\\s][\\w]$',
                cleanCmd: 'options matrix (option)',
                desc: 'enable/disable matrix background effect.',
                execute: 'g.options.toggleBackground',
                customDesc: [
                    'enable matrix background effect.',
                    'disable matrix background effect (disable it if game lags).'
                ],
                options: ['enable', 'disable'],
                optionsIndex: 2
            },
            {
                pattern: '^options[\\s]display[\\s][\\w]$',
                cleanCmd: 'options display (option)',
                desc: 'change console display.',
                execute: 'g.options.changeVue',
                customDesc: [
                    'set vue to default.',
                    'set vue to hackers_progress (show hackers progress, can\'t execute other commands).'
                ],
                options: [
                    'default',
                    'hackers_progress'
                ],
                optionsIndex: 2
            },
            {
                pattern: '^options[\\s]savegame[\\s][\\w]',
                cleanCmd: 'options savegame (option)',
                desc: 'save, load or erase your save data.',
                execute: 'g.options.saveManager',
                customDesc: [
                    'save now.',
                    'load savegame.',
                    'hard-reset, erase all data and start from scratch. <b>CAREFUL, NO WARNING! YOU CAN\'T GO BACK IF YOU DO THIS!</b>'
                ],
                options: [
                    'save',
                    'load',
                    'erase'
                ],
                optionsIndex: 2
            }
        ]
    },

    {
        name: 'help',
        desc: 'print a list of commands available.',
        pattern: '^help$',
        commands: [
            {
                pattern: '^help$',
                cleanCmd: 'help',
                execute: 'g.console.help()'
            }
        ]
    },

    {
        name: 'clear',
        desc: 'clear console output.',
        pattern: '^clear$',
        commands: [
            {
                pattern: '^clear$',
                cleanCmd: 'clear',
                desc: 'clear console output.',
                execute: 'g.console.clear()'
            }
        ]
    },

    {
        name: 'guide',
        desc: 'a guide to help you.',
        pattern: '^guide$',
        commands: [
            {
                pattern: '^guide$',
                cleanCmd: 'guide',
                desc: 'print the guide.',
                execute: 'g.console.guide()'
            }
        ]
    },

    {
        name: 'credit',
        desc: 'print credits.',
        pattern: '^credit$',
        commands: [
            {
                pattern: '^credit$',
                cleanCmd: 'credit',
                desc: 'print credits.',
                execute: 'g.console.credits()'
            }
        ]
    }
];;

game.hack = {
	minDefaultHackCash: 15,
	maxDefaultHackCash: 25,
	minDefaultHackExp: 5,
	maxDefaultHackExp: 10,

	isHacking: false,
	hackingWhat: undefined,
	hackProgress: 0
};

g.hack.quickhack = function()  {
	var randCash = randomInclusive(g.hack.minDefaultHackCash, g.hack.maxDefaultHackCash) * g.player.getCashMult(),
		randExp = randomInclusive(g.hack.minDefaultHackExp, g.hack.maxDefaultHackExp) * g.player.getExpMult();

	g.earnMoney(randCash);
	g.earnExp(randExp);
	g.console.print('+$' + fix(randCash) + ', +' + fix(randExp) + ' exp.');
};

g.hack.place = function(place)  {
	if (!g.hack.isHacking && !g.hackers[g.places[place].hacker].owned && g.player.level >= g.places[place].levelReq) {
		g.hack.isHacking = true;
		g.hack.hackingWhat = place;
		g.console.print('Starting ' + g.places[place].cleanName + ' hack.');
		$('.text-side').prepend('<p id="hack-progress"></p>');
	}
	else if (g.hackers[g.places[place].hacker].owned)
		g.console.print('<b><u>Error</u></b>: you already hired an hacker to hack this place.');
	else if (g.hack.isHacking)
		g.console.print('<b><u>Error</u></b>: you are already hacking a place.');
	else if (g.player.level < g.places[place].levelReq)
		g.console.print('<b><u>Error</u></b>: you don\'t have the required level to hack this place.');
	else
		g.console.print('<b><u>Error</u></b>: you can\'t hack this place.');
};

g.hack.hackerLoop = function(times)  {
	for (var place in g.places) {
		if (typeof g.places[place] == 'object' && g.hackers[g.places[place].hacker].owned && g.player.level >= g.places[place].levelReq) {
			var hacker = g.hackers[g.places[place].hacker],
				time = g.places.getTime(place);

			hacker.progress += times / g.options.fps;

			if (hacker.progress >= time) {
				var money = g.places.getCash(place),
					exp = g.places.getExp(place);

				g.earnMoney(money);
				g.earnExp(exp);

				g.hackers[g.places[place].hacker].progress = 0;
			};
		};
	};
};

g.hack.loop = function(times)  {
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

g.hack.userinput = function(typed)  {
	debug(typed);
};;

g.varInit = function()  {
    g.options.varInit();
    g.console.varInit();

    g.options.debug == true && debug('g.varInit finished');
};

g.domInit = function()  {
    g.console.domInit();

    g.options.debug == true && debug('g.domInit finished');
};

$(document).ready(function() {
    g.varInit();
    g.save.load();
    g.domInit();
    g.quickTutorial();

    g.player.options == true && debug('game ready to play', g);
});;

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

g.jobs.getCash = function()  {
	var cashMult = g.player.getCashMult();

	return Math.floor(Math.pow(1.23, g.player.level) * g.jobs.baseCash);
};

g.jobs.getExp = function()  {
	var expMult = g.player.getExpMult();

	return Math.floor(Math.pow(1.23, g.player.level) * g.jobs.baseExp);
};

g.jobs.getTime = function()  {
	return g.jobs.baseTime + randomInclusive(0, 45);
};

g.jobs.loop = function(times)  {
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

g.jobs.spawn = function()  {
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

g.jobs.respond = function(response)  {
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
};;

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

g.save.save = function(console)  {
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

g.save.load = function(console, auto)  {
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

g.save.erase = function()  {
	if (localStorage.getItem(g.save.salt) == null)
		return warn('No save found.');
	else {
		window.onbeforeunload = null;
		clearInterval(g.options.intervals.save);
		localStorage.removeItem(g.save.salt);
		location.reload();
	};
};