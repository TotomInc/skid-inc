/*! skid-inc - v1.0.0 - 2016-05-29 */
var beautify = {
	prefixes: [
	    "m ", "b ", "t ", "q ", "Q ", "s ", "S ", "o ", "n ",
		"D ", "UD ", "DD ", "TD ", "qD ", "QD ", "sD ", "SD ", "OD ", "ND ",
		"V ", "UV ", "DV ", "TV ", "qV ", "QV ", "sV ", "SV ", "OV ", "NV ",
		"T ", "UT ", "DT ", "TT ", "qT ", "QT ", "sT ", "ST ", "OT ", "NT "
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

var game = {
    randomInclusive: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    setInputTimeout: function() {
        $('#console-input').val('');
        $('#console-input').unbind('keydown');

        setTimeout(function() {
            $('#console-input').bind('keydown', function(e) {
                if (e.which == 13)
                    game.console.executer();
            });
        }, game.options.bindTime);
    },
    
    earnMoney: function(amount) {
        game.player.money += amount;
        game.player.totalMoney += amount;
    },
    
    earnExp: function(amount) {
        game.player.exp += amount;
        
        while (game.player.exp >= game.player.maxExp) {
            game.player.exp -= game.player.maxExp;
            game.player.level++;
            game.player.maxExp = Math.floor(Math.pow(game.player.expInflation, game.player.level) * 100);
        };
    },
    
    hackProgress: function(times) {
        if (game.player.isHacking) {
            var thisPlace = game.console.cmds.hack.places[game.player.hackingWhat],
                time = thisPlace.time,
                fps = game.options.fps,
                barStatus = '|',
                maxBar = 50,
                filled = Math.floor(game.player.hackingProgress / time * maxBar),
                left = Math.ceil(maxBar - filled),
                percent = Math.floor(game.player.hackingProgress / time * 100),
                moneyReward = game.randomInclusive(thisPlace.minMoneyReward, thisPlace.maxMoneyReward),
                expReward = game.randomInclusive(thisPlace.minExpReward, thisPlace.maxExpReward);
            
            game.player.hackingProgress += times / fps;
            
            if (game.player.hackingProgress < time) {
                for (var i = 0; i < filled; i++)
                    barStatus += '#';
                
                for (var i = 0; i < left; i++)
                    barStatus += '=';
                
                barStatus += '| (' + fix(percent, 2) + '%)';
                
                $('#hacking-progress').html(barStatus);
            }
            else if (game.player.hackingProgress >= time) {
                game.player.isHacking = false;
                game.player.hackingWhat = undefined;
                game.player.hackingProgress = 0;
                
                for (var i = 0; i < maxBar; i++)
                    barStatus += '#';
                
                barStatus += '| (100.00%)';
                
                $('#hacking-progress').html(barStatus).removeAttr('id');
                
                game.earnMoney(moneyReward);
                game.earnExp(expReward);
                
                game.console.print('gain', cap(thisPlace.name) + ' hack finished: you earned $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.');
            };
        };
    },
    
    display: function() {
        $('#well-resources').html(
            'Money: $' + fix(game.player.money) + '<br>' +
            'Level: ' + fix(game.player.level, 0) + '<br>' +
            'Exp: ' + fix(game.player.exp) + '/' + fix(game.player.maxExp, 0)
        );
        
        document.title = '$' + fix(game.player.money) + ' - SkidInc.';
    },
    
    loop: function() {
		game.options.now = new Date().getTime();
		
		var elapsed = game.options.now - game.options.before,
			times = Math.floor(elapsed / game.options.interval);
		
		elapsed > game.options.interval ? game.updateGame(times) : game.updateGame(1);
		
		game.options.before = new Date().getTime();
    },
    
    updateGame: function(times) {
        game.hackProgress(times);
        game.display();
    },
    
    varInit: function() {
        game.options.interval = (1000 / game.options.fps);
        
        game.options.intervals.loop = setInterval(game.loop, game.options.interval);
        
        game.sounds.varInit();
    },
    
    domInit: function() {
        $('#hack-button').on('click', function() {
            game.hack('sp-click');
        });
        
		$('#console-enter').on('click', function() {
			game.console.executer();
		});

		$('#console-input').bind('keydown', function(e) {
			if (e.which == 13)
				game.console.executer();
		});

		$('#console-input').bind('copy paste', function(e) {
			e.preventDefault();
		});
		
		$('img').on('dragstart', function(e) {
		    e.preventDefault();
		});
    },
    
    init: function() {
        game.varInit();
        game.domInit();
    }
};;

game.options = {
    intervals: {},
    interval: undefined,
    fps: 10,
    bindTime: 500,
    sounds: false,
    background: false,
    version: 0.001,
    
    now: new Date().getTime(),
    before: new Date().getTime(),
    
    isOpera: false,
    isFirefox: false,
    isSafari: false,
    isIE: false,
    isEdge: false,
    isChrome: false,
    isBlink: false
};

game.config = function(from) {
    if (from == "sp") {
        game.console.print('error', game.console.errors.configNoArgs);
        return;
    };
    
    if (from == "sound-off") {
        game.console.print('log', 'Sounds have been turned off.');
        game.options.sounds = false;
        game.sounds.disableSounds();
        return;
    };
    
    if (from == "sound-on") {
        game.console.print('log', 'Sounds have been turned on.');
        game.options.sounds = true;
        game.sounds.enableSounds();
        return;
    };
    
    if (from == "background-off") {
        game.console.print('log', 'Background have been turned off.');
        game.options.background = false;
        return;
    };
    
    if (from == "background-on") {
        game.console.print('log', 'Background have been turned on');
        game.options.background = true;
        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.config);
        return;
    };
};

game.options.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
game.options.isFirefox = typeof InstallTrigger !== 'undefined';
game.options.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
game.options.isIE = /*@cc_on!@*/false || !!document.documentMode;
game.options.isEdge = !game.options.isIE && !!window.StyleMedia;
game.options.isChrome = !!window.chrome && !!window.chrome.webstore;
game.options.isBlink = (game.options.isChrome || game.options.isOpera) && !!window.CSS;

if (game.options.isIE || game.options.isEdge)
    alert('Skid-Inc is not fully supported on Internet Explorer and Edge. We recommend you to play with Chrome or Firefox.');;

game.hack = function(from) {
    if (from == 'sp' || from == 'sp-click') {
        var moneyReward = game.randomInclusive(game.player.randMoneyMin, game.player.randMoneyMax),
            expReward = game.randomInclusive(game.player.randExpMin, game.player.randExpMax);

        if (from == 'sp-click') {
            moneyReward /= game.player.clickReducer;
            expReward /= game.player.clickReducer;
        };
        
        game.earnMoney(moneyReward);
        game.earnExp(expReward);

        if (from == 'sp-click')
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp. (reward divided by ' + game.player.clickReducer + ' when clicking button)');
        else
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.');

        return;
    };
    
    if (from == "stats") {
        var thisPlayer = game.player;
        game.console.print('log', '<b>Hack stats</b>: $' + fix(thisPlayer.randMoneyMin) + ' ~ $' + fix(thisPlayer.randMoneyMax) + ', ' +
            fix(thisPlayer.randExpMin) + ' exp ~ ' + fix(thisPlayer.randExpMax) + ' exp, ' +
            'hack click reducer: /' + thisPlayer.clickReducer);
        
        return;
    };

    if (from == "list") {
        for (var place in game.console.cmds.hack.places) {
            var thisPlace = game.console.cmds.hack.places[place];
            game.console.print('help', '<b>' + thisPlace.name + '</b>: $' + fix(thisPlace.maxMoneyReward) + ' max, ' + fix(thisPlace.maxExpReward) + ' max exp, take ' + fix(thisPlace.time, 0) + ' sec, require level ' + fix(thisPlace.reqLevel, 0));
        };
        
        return;
    };

    if (from == 'mini-market' || from == 'market' || from == 'bank' || from == 'jewelry' || from == 'trading-center') {
        var thisPlace = game.console.cmds.hack.places[from];

        if (!game.player.isHacking) {
            if (game.player.level >= thisPlace.reqLevel) {
                game.player.isHacking = true;
                game.player.hackingWhat = from;
                game.console.print('log', 'Hack in progress...');
                game.console.print('hack-bar');
            }
            else
                game.console.print('error', game.console.errors.levelLow);
        }
        else
            game.console.print('error', game.console.errors.hackInProgress);


        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.hack);
        
        return;
    };
};;

game.player = {
    money: 0,
    totalMoney: 0,

    level: 1,

    exp: 0,
    maxExp: 100,
    expInflation: 1.10,

    moneyMult: 1,

    randMoneyMax: 7,
    randMoneyMin: 3,

    expMult: 1,

    randExpMax: 5,
    randExpMin: 1,
    
    clickReducer: 16,
    
    isHacking: false,
    hackingWhat: undefined,
    hackingProgress: 0
};;

game.console = {
    executer: function() {
        var input = $('#console-input').val(),
            cmd = input.split(' '),
            thisCmd = game.console.cmds[cmd[0]],
            execIndex = undefined,
            argsExists = false;
        
        if (typeof game.console.cmds[cmd[0]] == 'object') {
            console.info('full command detected: ' + input + '\n', cmd);
            console.info('command detected: ' + cmd[0] + '\n', thisCmd);
            
            for (var i = 0; i < thisCmd.args.length; i++) {
                var argsCheck = [];
                
                for (var e = 0; e < thisCmd.args[i].length; e++) {
                    if (cmd.length == thisCmd.args[i].length && cmd[e] == thisCmd.args[i][e] && argsCheck.length < cmd.length) {
                        console.info('command successfully passed test: ' + e, cmd[e]);
                        
                        argsCheck.push(true);
                        execIndex = i;

                        if (argsCheck.length == cmd.length) {
                            var thisCmdArgs = thisCmd.exec[i].substring(thisCmd.exec[i].indexOf('"') + 1, thisCmd.exec[i].length - 2);
                            
                            console.info('exec index: ' + execIndex);
                            console.info('running function: ' + thisCmd.exec[execIndex]);
                            
                            argsExists = true;
                            eval(thisCmd.exec[execIndex]);
                            game.setInputTimeout();
                            
                            if (game.options.sounds)
                                game.sounds.button.play();
                            
                            return;
                        };
                    };
                };
            };
            
            if (!argsExists)
                game.console.print('error', game.console.errors.unknownArgs);
        } else
            game.console.print('error', game.console.errors.unknownCmd);
        
        $('#console-input').val('');
    }
};;

game.console.cmds = {
    'hack': {
        name: 'hack',
        desc: 'hack a place to earn money and experience.',
        args: [
            ['hack'],
            ['hack', '-stats'],
            ['hack', '-help'],
            // places
            ['hack', '-place', 'mini-market'],
            ['hack', '-place', 'market'],
            ['hack', '-place', '-list']
        ],
        exec: [
            'game.hack("sp")',
            'game.hack("stats")',
            'game.hack("help")',
            // places
            'game.hack("mini-market")',
            'game.hack("market")',
            'game.hack("list")'
        ]
    },

    'help': {
        name: 'help',
        desc: 'print a list of all the commands.',
        args: [
            ['help']
        ],
        exec: [
            'game.console.printHelp()'
        ]
    },

    'clear': {
        name: 'clear',
        desc: 'clear console output',
        args: [
            ['clear'],
            ['clear', '-help']
        ],
        exec: [
            'game.console.clear()',
            'game.console.clear("help")'
        ]
    },

    'config': {
        name: 'config',
        desc: 'configure game settings.',
        args: [
            ['config'],
            ['config', '-help'],
            ['config', '-sounds', '0'],
            ['config', '-sounds', '1'],
            ['config', '-background', '0'],
            ['config', '-background', '1']
        ],
        exec: [
            'game.config("sp")',
            'game.config("help")',
            'game.config("sound-off")',
            'game.config("sound-on")',
            'game.config("background-off")',
            'game.config("background-on")'
        ]
    }
};;

game.console.errors = {
    // clasics errors
    unknownCmd: 'Unknown command. Type <b>help</b> for a list of commands.',
    unknownArgs: 'Unknown arguments. Type <b>yourCommand -help</b> for more information.',
    
    // hack errors
    levelLow: 'Level too low. Level-up to hack this area.',
    hackInProgress: 'You are already hacking a place. Wait for your hack to finish.',
    
    // config errors
    configNoArgs: 'You must use <b>config</b> with arguments. Type <b>config -help</b> for more information.'
};

game.console.help = {
    hack: "<b>hack</b> can use with arguments.<br><b>hack -stats</b>: Print the information the potential hacks gains.<br><b>hack -place <i>nameOfPlace</i></b>: Hack a place.<br><b>hack -place -list</b>: Print a list of places can be hacked, their conditions and their potential gain",
    config: "You must use <b>config</b> with arguments.<br><b>config -sounds <i>value</i></b>: Enable (1) or disable (0) the sound of the game. (defaut 0)<br><b>config -background <i>value</i></b>: Enable (1) or disable (0) the background animation. (defaut 0)",
    clear: "<b>clear</b> don't accept any arguments."
};;

game.console.cmds.hack.places = {
    'mini-market': {
        name: 'mini-market',
        minMoneyReward: 150,
        maxMoneyReward: 500,
        minExpReward: 50,
        maxExpReward: 150,
        time: 5,
        reqLevel: 0
    },
    'market': {
        name: 'market',
        minMoneyReward: 6000,
        maxMoneyReward: 20000,
        minExpReward: 200,
        maxExpReward: 450,
        time: 40,
        reqLevel: 0
    },
    'bank': {
        name: 'bank',
        minMoneyReward: 240000,
        maxMoneyReward: 800000,
        minExpReward: 500,
        maxExpReward: 850,
        time: 80,
        reqLevel: 0
    },
    'jewelry': {
        name: 'jewelry',
        minMoneyReward: 9600000,
        maxMoneyReward: 31968000,
        minExpReward: 1000,
        maxExpReward: 1750,
        time: 160,
        reqLevel: 0
    },
    'trading-center': {
        name: 'trading-center',
        minMoneyReward: 115200000,
        maxMoneyReward: 383616000,
        minExpReward: 2500,
        maxExpReward: 5000,
        time: 280,
        reqLevel: 0
    }
};;

game.console.print = function(type, text) {
    switch (type) {
        case 'gain':
            $('#console-content').append('<p><span class="console-gain">[GAIN]</span> ' + text + '</p>');
            break;

        case 'log':
            $('#console-content').append('<p><span class="console-log">[LOG]</span> ' + text + '</p>');
            break;

        case 'error':
            $('#console-content').append('<p><span class="console-error">[ERROR]</span> ' + text + '</p>');
            break;

        case 'warn':
            $('#console-content').append('<p><span class="console-warn">[WARN]</span> ' + text + '</p>');
            break;

        case 'help':
            $('#console-content').append('<p><span class="console-help">[HELP]</span> ' + text + '</p>');
            break;
        
        case 'hack-bar':
            $('#console-content').append('<p id="hacking-progress"></p>');
            break;
    };
    
    // if console stop auto-scrolling, the player really need to clear the console
    $("#console-content").scrollTop(1e6);
};

game.console.printHelp = function() {
    for (var cmd in game.console.cmds) {
        var thisCmd = game.console.cmds[cmd];
        game.console.print('help', '<b>' + thisCmd.name + '</b>: ' + thisCmd.desc);
    };
    
    return;
};

game.console.clear = function(from) {
    if (typeof from == 'undefined') {
        $('#console-content').empty();
        return;
    };
    
    if (from == 'help') {
        game.console.print('help', game.console.help.clear);
        return;
    };
};;

game.sounds = {
    ambient: new Audio('app/assets/sounds/server-room.mp3'),
    button: new Audio('app/assets/sounds/button.mp3'),
    
    enableSounds: function() {
        game.sounds.ambient.volume = 0.25;
        game.sounds.ambient.currentTime = 0;
        game.sounds.ambient.play();
    },
    
    disableSounds: function() {
        game.sounds.ambient.volume = 0;
        game.sounds.ambient.currentTime = 0;
        game.sounds.ambient.pause();
    },

    varInit: function() {},
};