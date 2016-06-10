/*! skid-inc - v1.0.0 - 2016-06-11 */
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

function checkRegexGlobally(stringToSearch, pattern) {
    var regex = new RegExp(pattern, "g");
    
    return (stringToSearch.search(regex) != -1);
};

function filterArrayOnRegexPattern(stringToSearch, arrayToFilter) {
    return arrayToFilter.filter(function(elementWithPattern) {
        if (typeof elementWithPattern.pattern === "undefined")
            return false;
        
        return checkRegexGlobally(stringToSearch, elementWithPattern.pattern);
    });
};;

var floating = {
    addFloating: function(where, text) {
        var floatingText = document.createElement('div'),
            divWidth = $('#' + where).width() - 35,
            randWidth = game.randomInclusive(0, divWidth);
        
        $(floatingText).addClass('floating-text')
            .html(text)
            .css({
                'margin-top': '-62px',
                'margin-left': randWidth + 'px'
            })
            .animate({
                'opacity': 0,
                'margin-top': '-85px'
            }, 750, function() {
                $(this).remove();
            });
        
        $('#' + where).append(floatingText);
    }
};;

function msToTime(duration) {
    var duration = new Date().getTime(),
        milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
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
            }).keydown(function(e) {
                if (e.which == 38) {
                    e.preventDefault();
                    game.console.typeLast();
                };
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
            var randAscii = Math.ceil(game.randomInclusive(0, game.console.ascii.levelUp.length - 1));

            game.player.exp -= game.player.maxExp;
            game.player.level++;
            game.player.maxExp = Math.floor(Math.pow(game.player.expInflation, game.player.level) * (100 * (game.player.level * 1.01)));

            game.console.print('levelup', 'You are now level ' + game.player.level + '!');
            game.console.print('ascii', game.console.ascii.levelUp[randAscii]);
        };
    },

    getGlobalMoneyMult: function() {
        var persMult = game.servers.getPersReward(),
            proMult = game.servers.getProReward().money;

        return (persMult + proMult) - 1;
    },

    getGlobalExpMult: function() {
        var proMult = game.servers.getProReward().exp;

        return proMult;
    },

    getPlaceTime: function(thisPlace) {
        return thisPlace.time / (1 + (game.servers.vm.owned * game.servers.vm.accelerator));
    },

    hackProgress: function(times) {
        var isHacking = (game.player.isHacking == true ? true : false);

        if (isHacking) {
            var thisPlace = game.console.cmds[0].places[game.player.hackingWhat],
                time = game.getPlaceTime(thisPlace),
                fps = game.options.fps,
                barStatus = '|',
                maxBar = 50,
                filled = Math.floor(game.player.hackingProgress / time * maxBar),
                left = Math.ceil(maxBar - filled),
                percent = Math.floor(game.player.hackingProgress / time * 100),
                timeLeft = undefined,
                moneyReward = game.randomInclusive(thisPlace.minMoneyReward, thisPlace.maxMoneyReward),
                expReward = game.randomInclusive(thisPlace.minExpReward, thisPlace.maxExpReward),
                globalMoneyMult = game.getGlobalMoneyMult(),
                globalExpMult = game.getGlobalExpMult();

            game.player.hackingProgress += times / fps;

            if (game.player.hackingProgress < time) {
                for (var i = 0; i < filled; i++)
                    barStatus += '#';

                for (var i = 0; i < left; i++)
                    barStatus += '=';

                timeLeft = time - game.player.hackingProgress;

                barStatus += '| (' + fix(percent, 2) + '%), time left: ' + fix(timeLeft, 2) + 's.';

                $('#hacking-progress').html(barStatus);
            }
            else if (game.player.hackingProgress >= time) {
                for (var i = 0; i < maxBar; i++)
                    barStatus += '#';

                game.player.isHacking = false;
                game.player.hackingProgress = 0;

                barStatus += '| (100.00%)';

                $('#hacking-progress').html(barStatus).removeAttr('id');

                moneyReward *= globalMoneyMult;
                expReward *= globalExpMult;

                game.earnMoney(moneyReward);
                game.earnExp(expReward);
                game.player.timesPlacesHacked++;

                game.notif.showNotif('Skid-Inc', 'You have successfully hacked ' + game.player.hackingWhat + ', and earned $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.', 'app/assets/images/icons/logonotif.png');
                game.console.print('gain', cap(thisPlace.name) + ' hack finished: you earned <b>$' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.</b>');

                game.player.hackingWhat = undefined;
            };
        }
        else if (!isHacking) {
            for (var hacker in game.team.list) {
                if (game.team.list[hacker].owned) {
                    var thisHacker = game.team.list[hacker],
                        thisPlace = game.console.cmds[0].places[thisHacker.effect],
                        time = game.getPlaceTime(thisPlace),
                        fps = game.options.fps,
                        moneyReward = game.randomInclusive(thisPlace.minMoneyReward, thisPlace.maxMoneyReward),
                        expReward = game.randomInclusive(thisPlace.minExpReward, thisPlace.maxExpReward),
                        globalMoneyMult = game.getGlobalMoneyMult(),
                        globalExpMult = game.getGlobalExpMult();

                    thisHacker.progress += times / fps;

                    if (thisHacker.progress >= time) {
                        moneyReward *= globalMoneyMult;
                        expReward *= globalExpMult;

                        game.earnMoney(moneyReward);
                        game.earnExp(expReward);

                        thisHacker.progress = 0;
                        thisHacker.done++;
                    };
                }
            }
        }
    },

    display: function() {
        $('#well-resources').html(
            'Money: $' + fix(game.player.money) + '<br>' +
            'Level: ' + fix(game.player.level, 0) + '<br>' +
            'Exp: ' + fix(game.player.exp) + '/' + fix(game.player.maxExp, 0) + '<br>' +
            '<br>' +
            'Money mult: x' + fix(game.getGlobalMoneyMult(), 2) + '<br>' +
            'Exp. mult: x' + fix(game.getGlobalExpMult(), 2) + '<br>' +
            'Hack time div: /' + fix(game.servers.getVMReward(), 2) + '<br>' +
            'Click div: /' + fix(game.servers.getClickDivider(), 0) + '<br>' +
            '<br>' +
            'Pers. servers: ' + fix(game.servers.personal.owned, 0) + '<br>' +
            'Pro. servers: ' + fix(game.servers.professional.owned, 0) + '<br>' +
            'VM servers: ' + fix(game.servers.vm.owned, 0) + '<br>' +
            'QuickHack servers: ' + fix(game.servers.quickhack.owned, 0)
        );

        document.title = '$' + fix(game.player.money) + ' - SkidInc.';
    },

    hackerOwned: function(name) {
        if (game.team.list[name].owned)
            return 'yes';
        else
            return 'no';
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

    varInit: function(callback) {
        game.options.interval = (1000 / game.options.fps);

        game.options.intervals.loop = setInterval(game.loop, game.options.interval);
        game.options.intervals.achievements = setInterval(game.achievements.check, 1000);
        game.options.intervals.save = setInterval(game.save.save, 30000);

        game.achievements.varInit();
        game.sounds.varInit();
        game.save.varInit();
        game.notif.requestPermission();

        window.onfocus = function() {
            game.options.gotFocus = true;
        };

        window.onblur = function() {
            game.options.gotFocus = false;
        };

        console.info('Var init finished.');
    },

    domInit: function() {
        $('#tab-container').css({
            'max-height': '600px',
            'overflow-y': 'auto'
        });

        $('#navbar-version').html('v' + game.options.version);

        $('#navbar-mute').on('click', function() {
            game.sounds.switchSounds();
        });

        $('#navbar-save').on('click', function() {
            game.save.save('user');
        });

        $('#options-reset').on('click', function() {
            game.save.reset();
        });

        $('#options-load').on('click', function() {
            game.save.load('user');
        });

        $('#options-save').on('click', function() {
            game.save.save();
        });

        $('#options-effect').on('click', function() {
            game.options.triggerBackground();
        });

        $('#hack-button').on('click', function() {
            game.hack('sp-click');
        });

        $('#console-enter').on('click', function() {
            game.console.executer();
        });

        $('#console-input').bind('keydown', function(e) {
          switch(e.which) {
            case 13:
              e.preventDefault();
              game.console.executer();
              break;
            case 38:
              e.preventDefault();
              game.console.pressUpArrow();
              break;
            case 40:
              e.preventDefault();
              game.console.pressDownArrow();
              break;
            }
        });

        // abilities
        $('#console-input').keydown(function(e){
            if(event.ctrlKey){
              if(e.keyCode === 13){
                e.preventDefault();
//                console.log('call ability');
                game.console.ability_00();
              }
            }
          });

        $('#console-input').bind('copy paste', function(e) {
            e.preventDefault();
        });

        $('#console-input').bind('cut paste', function(e) {
            e.preventDefault();
        });

        $('html').bind('contextmenu', function(e) {
            e.preventDefault();
            return;
        });

        $('img').on('dragstart', function(e) {
            e.preventDefault();
        });

        console.info('Dom init finished.');
    },

    init: function() {
        game.varInit();
        game.save.load();
        game.domInit();

        game.options.isInit = true;
    }
};
;

game.options = {
    intervals: {},
    interval: undefined,
    fps: 10,
    bindTime: 350,
    sounds: false,
    version: 0.05,
    
    now: new Date().getTime(),
    before: new Date().getTime(),
    
    gotFocus: true,
    effectEnabled: false,
    
    isOpera: false,
    isFirefox: false,
    isSafari: false,
    isIE: false,
    isEdge: false,
    isChrome: false,
    isBlink: false,
    
    isInit: false,
    
    triggerBackground: function() {
        if (game.options.effectEnabled) {
            $('#matrix-effect').fadeOut('slow', function() {
                game.options.effectEnabled = false;
            });
        }
        else {
            $('#matrix-effect').fadeIn('slow', function() {
                game.options.effectEnabled = true;
            });
        };
    }
};

game.abilities = {
  // name and description needs change
    list: {
        'up-key': {
            name: 'up-key',
            desc: 'press your up-key to type the latest command entered.',
            cost: 1e6,
            reqLevel: 20,
            owned: false
        }
    },

    buy: function(who) {
        var thisAbility = game.abilities.list[who];

        console.log(thisAbility)
        console.log(game.player.money >= thisAbility.cost)
        console.log(!thisAbility.owned)
        console.log(game.player.level >= thisAbility.reqLevel)

        if (game.player.money >= thisAbility.cost && !thisAbility.owned && game.player.level >= thisAbility.reqLevel) {
            game.player.money -= thisAbility.cost;
            thisAbility.owned = true;

            game.console.print('log', 'You successfully bought the ' + thisAbility.name + ' ability.');
        }
        else if (game.player.level < thisAbility.reqLevel)
            game.console.print('error', 'You don\'t have the required level to buy this ability.');
        else if (game.player.money < thisAbility.price)
            game.console.print('error', 'Not enough money to buy this ability!');
        else if (thisAbility.owned)
            game.console.print('error', 'You already own this ability.');
    },

    exec: function(from) {
        if (from == 'sp') {
            game.console.print('error', game.console.errors.abilityNoArgs);

            return;
        };

        if (from == 'help') {
            game.console.print('help', game.console.help.ability);

            return;
        };

        if (from == 'list') {
            for (var ability in game.abilities.list) {
                var thisAbility = game.abilities.list[ability];

                game.console.print('help', '<b>' + thisAbility.name + '</b>: cost $' + fix(thisAbility.cost) + ', owned: ' + thisAbility.owned + '. Effect: ' + thisAbility.desc);
            };

            return;
        };
    }
};
;

game.buy = function(from, option) {
    if (from == "sp") {
        game.console.print('error', game.console.errors.buyNoArgs);
        
        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.buy);
        
        return;
    };
    
    if (from == "info") {
        var persReward = game.servers.getPersReward(),
            persCost = game.servers.getPersCost(),
            proReward = game.servers.getProReward(),
            proCost = game.servers.getProCost(),
            VMReward = game.servers.getVMReward(),
            VMCost = game.servers.getVMCost(),
            quickCost = game.servers.getQuickhackCost(),
            clickDivider = game.servers.getClickDivider();
        
        game.console.print('log', '<b>Servers infos</b>:<br>' +
            '<b>Personal servers</b>: ' + fix(game.servers.personal.owned, 0) + ', money multiplier: x' + fix(persReward, 2) + ', next cost: $' + fix(persCost) + '<br>' +
            '<b>Professional servers</b>: ' + fix(game.servers.professional.owned, 0) + ', money multiplier: x' + fix(proReward.money, 2) + ', experience reward: x' + fix(proReward.exp, 2) + ', next cost: $' + fix(proCost) + '<br>' +
            '<b>Virtual machines (VM) servers</b>: ' + fix(game.servers.vm.owned, 0) + ', place hack time divider: /' + fix(VMReward, 2) + ', next cost: $' + fix(VMCost, 2) + '<br>' +
            '<b>Quickhack servers</b>: ' + fix(game.servers.quickhack.owned, 0) + ', click divider: /' + fix(clickDivider, 0) + ', next cost: $' + fix(quickCost));
        
        return;
    };
    
    if (from == "serv-pers") {
        var cost = game.servers.getPersCost();
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.personal.owned++;
            
            var newCost = game.servers.getPersCost();
            game.console.print('gain', 'You successfully bought a personal server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else
            game.console.print('error', 'Not enough money to buy a personal server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');
        
        return;
    };
    
    if (from == "serv-pro") {
        var cost = game.servers.getProCost();
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.professional.owned++;
            
            var newCost = game.servers.getProCost();
            game.console.print('gain', 'You successfully bought a professional server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else
            game.console.print('error', 'Not enough money to buy a professional server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');
        
        return;
    };
    
    if (from == "serv-speedhack") {
        var cost = game.servers.getVMCost();
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.vm.owned++;
            
            var newCost = game.servers.getVMCost();
            game.console.print('gain', 'You successfully bought a VirtualMachine for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else
            game.console.print('error', 'Not enough money to buy a VirtualMachine, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');

        return;
    };
    
    if (from == "serv-quickhack") {
        var cost = game.servers.getQuickhackCost();
        
        if (game.player.money >= cost && game.servers.quickhack.owned < 15) {
            game.player.money -= cost;
            game.servers.quickhack.owned++;

            var newCost = game.servers.getQuickhackCost();
            game.console.print('gain', 'You successfully bought a quickhack server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else if (game.servers.quickhack.owned >= 15)
            game.console.print('error', 'You already bought the maximum of speedhack servers (15).');
        else
            game.console.print('error', 'Not enough money to buy a quickhack server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');

        return;
    };

    
    
    
    if (from == 'server') {
        console.log('want a ' + option + ' server.');
        game.console.print('warn', 'TODO');
        
        return;
    };
    
    if (from == "server-help") {
        game.console.print('help', game.console.help.buyServer);
        
        return;
    };
    
    if (from == 'hacker') {
        console.log('want ' + option + ' hacker.');
        game.console.print('warn', 'TODO');
        
        return;
    };
    
    if (from == "hacker-help") {
        game.console.print('help', game.console.help.buyHacker);
        
        return;
    };
    
    if (from == "hacker-list") {
        for (var hacker in game.team.list)
            game.console.print('help', '<b>' + game.team.list[hacker].name + '</b>: cost $' + fix(game.team.list[hacker].price) + ', manage ' + game.team.list[hacker].effect + ', owned: ' + game.team.list[hacker].owned);
    
        return;
    };
    
    if (from == 'ability') {
        console.log('want ' + option + ' ability.');
        game.console.print('warn', 'TODO');
        
        return;
    };
    
    if (from == "ability-help") {
        game.console.print('help', game.console.help.buyAbility);
        
        return;
    };
    
    if (from == "ability-list") {
        for (var ability in game.abilities.list)
            game.console.print('help', '<b>' + game.abilities.list[ability].name + '</b>: cost $' + fix(game.abilities.list[ability].cost) + ', require level ' + game.abilities.list[ability].reqLevel + '. Effect: ' + game.abilities.list[ability].desc);
    
        return;
    };
};

game.config = function(from, option) {
    if (from == "sp") {
        game.console.print('error', game.console.errors.configNoArgs);
        
        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.config);
        
        return;
    };
    
    if (from == 'triggerSounds') {
        game.console.print('warn', 'TODO');
        
        return;
    };
    
    if (from == "triggerBackground") {
        game.console.print('warn', 'TODO');
        
        return;
    };
    
    // if (from == "sound-off") {
    //     game.console.print('log', 'Sounds have been turned off.');
    //     game.options.sounds = false;
    //     game.sounds.disableSounds();
        
    //     return;
    // };
    
    // if (from == "sound-on") {
    //     game.console.print('log', 'Sounds have been turned on.');
    //     game.options.sounds = true;
    //     game.sounds.enableSounds();
        
    //     return;
    // };
    
    // if (from == "background-off") {
    //     game.console.print('log', 'Background have been turned off.');
    //     game.options.background = false;
    //     game.options.triggerBackground();
        
    //     return;
    // };
    
    // if (from == "background-on") {
    //     game.console.print('log', 'Background have been turned on');
    //     game.options.background = true;
    //     game.options.triggerBackground();
        
    //     return;
    // };
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

game.hack = function(from, option) {
    if (from == 'mini-market' || from == 'market' || from == 'jewelry' || from == 'bank' || from == 'trading-center' || from == 'anonymous-hideout' || from == 'deepweb') {
        var thisPlace = game.console.cmds.hack.places[from];

        if (!game.player.isHacking) {
            console.log('h')
            console.log(from)
            console.log(game.team.list[from])
            
            if (game.team.list[from].owned)
                game.console.print('error', 'You already have a hacker to hack this place.');
            else if (game.player.level >= thisPlace.reqLevel) {
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
    
    
    
    
    if (from == 'sp' || from == 'sp-click') {
        var moneyReward = game.randomInclusive(game.player.randMoneyMin, game.player.randMoneyMax),
            expReward = game.randomInclusive(game.player.randExpMin, game.player.randExpMax),
            globalMoneyMult = game.getGlobalMoneyMult(),
            globalExpMult = game.getGlobalExpMult(),
            divider = game.servers.getClickDivider();

        moneyReward *= globalMoneyMult;
        expReward *= globalExpMult;

        if (from == 'sp-click') {
            moneyReward /= divider;
            expReward /= divider;
            game.player.timesHacked++;
        }
        else
            game.player.timesHacked += 16;
        
        game.earnMoney(moneyReward);
        game.earnExp(expReward);

        if (from == 'sp-click') {
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp. ' + '(reward divided by ' + fix(divider, 0) + ' when clicking button)');
            floating.addFloating('hack-button', '+$' + fix(moneyReward));
        }
        else
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.');

        return;
    };
    
    if (from == "stats") {
        var thisPlayer = game.player,
            globalMoneyMult = game.getGlobalMoneyMult(),
            globalExpMult = game.getGlobalExpMult();
        
        game.console.print('log', '<b>Hack stats</b>:<br>' +
            'Basic reward <b>$' + fix(thisPlayer.randMoneyMin) + ' ~ $' + fix(thisPlayer.randMoneyMax) + ', ' +
            fix(thisPlayer.randExpMin) + ' exp ~ ' + fix(thisPlayer.randExpMax) + ' exp</b>, ' +
            'hack click reducer: <b>/' + thisPlayer.clickReducer + '</b>, ' +
            'global money multiplier: x<b>' + fix(globalMoneyMult, 2) + '</b>, global exp. multiplier: x<b>' + fix(globalExpMult, 2) + '</b>.');
        
        return;
    };

    if (from == "list") {
        var vmEffect = game.servers.getVMReward(),
            globalExpMult = game.getGlobalExpMult(),
            globalMoneyMult = game.getGlobalMoneyMult();
        
        for (var place in game.console.cmds[0].places) {
            var thisPlace = game.console.cmds[0].places[place],
                maxExpReward = thisPlace.maxExpReward * globalExpMult,
                maxMoneyReward = thisPlace.maxMoneyReward * globalMoneyMult,
                time = thisPlace.time / vmEffect;
            
            game.console.print('help', '<b>' + thisPlace.name + '</b>: $' + fix(maxMoneyReward) + ' max, ' + fix(maxExpReward) + ' max exp, take ' + fix(time, 0) + ' sec, require level ' + fix(thisPlace.reqLevel, 0));
        };
        
        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.hack);
        
        return;
    };
    
    if (from == 'place') {
        console.log('want to hack ' + option);
        game.console.print('TODO');
        
        return;
    };
};;

game.notif = {
    requestPermission: function() {
        if (window.Notification && Notification.permission !== "granted") {
            Notification.requestPermission(function(status) {
                if (Notification.permission !== status)
                    Notification.permission = status;
            });
        };
    },
    
    showNotif: function(title, content, iconAccess) {
        if (window.Notification && Notification.permission === "granted" && !game.options.gotFocus) {
            var notif = new Notification(title, {
                body: content,
                icon: iconAccess
            });

            notif.onclick = function() {
                window.focus();
                this.close();
            };

            setTimeout(notif.close(), 10000);
        };
    }
};;

game.player = {
    money: 0,
    totalMoney: 0,

    level: 1,

    exp: 0,
    maxExp: 100,
    expInflation: 1.15,

    randMoneyMax: 30,
    randMoneyMin: 15,

    randExpMax: 25,
    randExpMin: 10,
    
    clickReducer: 16,
    
    achievementsPoints: 0,
    
    timesHacked: 0,
    timesPlacesHacked: 0,
    
    isHacking: false,
    hackingWhat: undefined,
    hackingProgress: 0
};;

game.save = {
    key: 'SK-Inc',

    save: function(from) {
      localStorage.setItem(game.save.key, LZString.compressToBase64(JSON.stringify(game.save.toSave)));

        if (from == "user")
            game.console.print('save', 'Game successfully saved to local-storage.');
        else
            console.log('Game saved.');
    },

    reset: function() {
        clearInterval(game.options.intervals.save);
        localStorage.removeItem(game.save.key);
        location.reload();
    },

    load: function() {
        if (localStorage.getItem(game.save.key) == null) {
            game.console.printGuide();
            console.warn('No save found!');
        }
        else {
          var s = JSON.parse(LZString.decompressFromBase64(localStorage.getItem(game.save.key)));
                sgp = s.gp,
                sga = s.ga,
                sgo = s.go,
                sga = s.ga,
                sgs = s.gs,
                sgt = s.gt,
                sgab = s.gab,
                g = game,
                gp = game.player,
                go = game.options,
                ga = game.achievements,
                gs = game.servers,
                gt = game.team,
                gab = game.abilities;

            if (go.version !== sgo.version)
                console.warn('Loading savegame from an older version.');

            gp.money = sgp.money;
            gp.totalMoney = sgp.totalMoney;
            gp.level = sgp.level;
            gp.exp = sgp.exp;
            gp.maxExp = sgp.maxExp;
            gp.moneyMult = sgp.moneyMult;
            gp.expMult = sgp.expMult;
            gp.achievementsPoints = sgp.achievementsPoints;

            gp.timesHacked = sgp.timesHacked;
            gp.timesPlacesHacked = sgp.timesPlacesHacked;

            gs.personal.owned = sgs.personal.owned;
            gs.personal.mult = sgs.personal.mult;
            gs.personal.level = sgs.personal.level;
            gs.professional.owned = sgs.professional.owned;
            gs.professional.mult = sgs.professional.mult;
            gs.professional.level = sgs.professional.level;
            gs.vm.owned = sgs.vm.owned;
            gs.quickhack.owned = sgs.quickhack.owned;

            ga.owned = sga.owned;
            ga.printed = sga.printed;

            go.before = sgo.before;
            go.sounds = sgo.sounds;
            go.effectEnabled = sgo.effectEnabled;

            gt.list['mini_market'].owned = sgt.list['mini_market'].owned;
            gt.list['market'].owned = sgt.list['market'].owned;
            gt.list['jewelry'].owned = sgt.list['jewelry'].owned;
            gt.list['bank'].owned = sgt.list['bank'].owned;
            gt.list['trading_center'].owned = sgt.list['trading_center'].owned;
            gt.list['anonymous_hideout'].owned = sgt.list['anonymous_hideout'].owned;
            gt.list['deepweb'].owned = sgt.list['deepweb'].owned;

            gt.list['mini_market'].progress = sgt.list['mini_market'].progress;
            gt.list['market'].progress = sgt.list['market'].progress;
            gt.list['jewelry'].progress = sgt.list['jewelry'].progress;
            gt.list['bank'].progress = sgt.list['bank'].progress;
            gt.list['trading_center'].progress = sgt.list['trading_center'].progress;
            gt.list['anonymous_hideout'].progress = sgt.list['anonymous_hideout'].progress;
            gt.list['deepweb'].progress = sgt.list['deepweb'].progress;

            gab.list['up-key'].owned = sgab.list['up-key'].owned;

            game.achievements.checkLoaded();

            console.info('Game loaded.');
            game.console.print('save', 'Save-game successfully loaded.');
        }
    },

    varInit: function() {
        game.save.toSave = {
            'gp': game.player,
            'go': game.options,
            'ga': game.achievements,
            'gs': game.servers,
            'gt': game.team,
            'gab': game.abilities
        };
    }
};
;

game.servers = {
    getPersCost: function() {
        return Math.floor(game.servers.personal.cost * Math.pow(game.servers.personal.inflation, game.servers.personal.owned));
    },
    
    getPersReward: function() {
        return (1 + (game.servers.personal.owned * (game.servers.personal.moneyReward - 1)) + (game.servers.personal.mult * game.servers.personal.owned - game.servers.personal.owned));
    },
    
    getProCost: function() {
        return Math.floor(game.servers.professional.cost * Math.pow(game.servers.professional.inflation, game.servers.professional.owned));
    },
    
    getProReward: function() {
        return {
            money: (1 + (game.servers.professional.owned * (game.servers.professional.moneyReward - 1)) + (game.servers.professional.mult * game.servers.professional.owned - game.servers.professional.owned)),
            exp: (1 + (game.servers.professional.owned * (game.servers.professional.expReward - 1)) + (game.servers.professional.mult * game.servers.professional.owned - game.servers.professional.owned))
        };
    },
    
    getVMCost: function() {
        return Math.floor(game.servers.vm.cost * Math.pow(game.servers.vm.inflation, game.servers.vm.owned));
    },
    
    getVMReward: function() {
        return (1 + (game.servers.vm.owned * (game.servers.vm.accelerator - 1)));
    },
    
    getQuickhackCost: function() {
        return Math.floor(game.servers.quickhack.cost * Math.pow(game.servers.quickhack.inflation, game.servers.quickhack.owned));
    },
    
    getClickDivider: function() {
        return Math.floor(16 - game.servers.quickhack.owned);
    },
    
    // increase money income for hack cmd/button
    personal: {
        owned: 0,
        cost: 750,
        inflation: 1.08,
        moneyReward: 1.08,
        mult: 1,
        level: 0,
        upInflation: 10,
        multAdd: 0.05
    },
    
    // increase money/exp income for hack cmd/button
    professional: {
        owned: 0,
        cost: 150000,
        inflation: 1.08,
        moneyReward: 1.20,
        expReward: 1.05,
        mult: 1,
        level: 0,
        upInflation: 50,
        multAdd: 0.10
    },
    
    // reduce place hack time
    vm: {
        owned: 0,
        cost: 5000,
        inflation: 1.40,
        accelerator: 1.01
    },
    
    // reduce click divider (default 16)
    quickhack: {
        owned: 0,
        cost: 1e6,
        inflation: 1e3,
        accelerator: 1.5
    }
};;

game.team = {
    list: {
        'mini_market': {
            name: 'mini_market',
            effect: 'mini-market',
            price: 10000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'market': {
            name: 'market',
            effect: 'market',
            price: 75000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'jewelry': {
            name: 'jewelry',
            effect: 'jewelry',
            price: 600000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'bank': {
            name: 'bank',
            effect: 'bank',
            price: 1000000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'trading_center': {
            name: 'trading_center',
            effect: 'trading-center',
            price: 12500000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'anonymous_hideout': {
            name: 'anonymous_hideout',
            effect: 'anonymous-hideout',
            price: 37500000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'deepweb': {
            name: 'deepweb',
            effect: 'deepweb',
            price: 250000000,
            owned: false,
            progress: 0,
            done: 0
        }
    },
    
    buy: function(who) {
        var thisHacker = game.team.list[who],
            thisPlace = game.console.cmds.hack.places[who];
        
        if (game.player.money >= thisHacker.price && !thisHacker.owned && game.player.level >= thisPlace.reqLevel) {
            game.player.money -= thisHacker.price;
            thisHacker.owned = true;
            
            game.console.print('log', 'You successfully engaged a <b>' + thisHacker.name + '</b> working for the ' + thisHacker.effect + ' hack.');
        }
        else if (game.player.level < thisPlace.reqLevel)
            game.console.print('error', 'You don\'t have the required level to buy this hacker.');
        else if (thisHacker.owned)
            game.console.print('error', 'You already engaged this hacker.');
    },
    
    exec: function(from) {
        if (from == 'sp') {
            game.console.print('error', game.console.errors.hackerNoArgs);
            
            return;
        };
        
        if (from == 'help') {
            game.console.print('help', game.console.help.hackers);
            
            return;
        };
        
        if (from == 'status') {
            for (var hacker in game.team.list) {
                var thisHacker = game.team.list[hacker],
                    thisPlace = game.console.cmds.hack.places[thisHacker.effect],
                    time = game.getPlaceTime(thisPlace);
                
                game.console.print('log', '<b>' + thisHacker.name + '</b>: hack ' + thisHacker.effect + ', current progress at ' + fix(thisHacker.progress, 2) + '/' + fix(time, 2) + ' sec, engaged: ' + thisHacker.owned);
            };
            
            return;
        };
    }
};;

game.upgrade = function(from, option) {
    if (from == 'sp') {
        game.console.print('errors', game.console.errors.upgradeNoArgs);
        
        return;
    };
    
    if (from == 'help') {
        game.console.print('help', game.console.help.upgrade);
        
        return;
    };
    
    if (from == 'info') {
        var types = ['personal', 'professional'],
            costs = [
                Math.floor(10000 * Math.pow(1.15, game.servers.personal.level)),
                Math.floor(1e6 * Math.pow(1.15, game.servers.professional.level))
            ],
            addMults = [
                1 + game.servers.personal.multAdd * game.servers.personal.level,
                1 + game.servers.professional.multAdd * game.servers.professional.level
            ];
        
        game.console.print('log', 'Upgrade servers infos:');
        
        for (var i = 0; i < types.length; i++)
            game.console.print('log', '<b>' + types[i] + '</b>: current upgrade level ' + game.servers[types[i]].level + ', additionnal mult: x' + fix(addMults[i], 2) + ', cost $' + fix(costs[i]) + '.');

        return;
    };
    
    if (from == 'server') {
        console.log('want to upgrade a ' + option + ' server.');
        game.console.print('warn', 'TODO');
        
        return;
    };
    
    
    
    
    if (from == 'personal') {
        var cost = Math.floor(10000 * Math.pow(game.servers.personal.upInflation, game.servers.personal.level));
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.personal.level++;
            game.servers.personal.mult += game.servers.personal.multAdd;
            
            var newCost = Math.floor(10000 * Math.pow(game.servers.personal.upInflation, game.servers.personal.level));
            
            game.console.print('log', 'You successfully upgraded your personal server. Next one cost: $' + fix(newCost));
        }
        else
            game.console.print('error', 'Not enough money to upgrade this server.');
        
        return;
    };
    
    if (from == 'professional') {
        var cost = Math.floor(1e6 * Math.pow(game.servers.professional.upInflation, game.servers.professional.level));
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.professional.level++;
            game.servers.professional.mult += game.servers.professional.multAdd;
            
            var newCost = Math.floor(100000 * Math.pow(game.servers.professional.upInflation, game.servers.professional.level));
            
            game.console.print('log', 'You successfully upgraded your professional server. Next one cost: $' + fix(newCost));
        }
        else
            game.console.print('error', 'Not enough money to upgrade this server.');
        
        return;
    };
};;

game.console = {
    history: [],
    historyNum: null,
    arrowPressed: false,

    // these code needs refactoring !!
    pressUpArrow: function() {
      var history = game.console.history;
      var historyNum = game.console.historyNum;

      if(game.console.arrowPressed === false) {
        game.console.arrowPressed = true;
        game.console.historyNum = history.length;
        console.log(game.console.historyNum);
        if(game.console.historyNum < 0) {
          game.console.historyNum = 0;
        }
      }

      if(game.console.historyNum > 0) {
        game.console.historyNum -= 1;
      } else {
        game.console.historyNum = 0;
      }

      var command = history[game.console.historyNum];

      console.log(game.console.historyNum); // test
      $('#console-input').val(command);
    },

    pressDownArrow: function() {
      var history = game.console.history;
      var historyNum = game.console.historyNum;

      if(game.console.historyNum >= history.length) {
        game.console.historyNum = history.length;
      } else {
        game.console.historyNum += 1;
      }

      var command = history[game.console.historyNum];

      console.log(game.console.historyNum); // test
      $('#console-input').val(command);
    },

    // need change the method name
    ability_00: function() {
      if(game.abilities.list['up-key'].owned === false) {
        console.log('up-key owned false');
        return false;
      }

      var command = game.console.history[game.console.history.length - 1];
      $('#console-input').val(command);
      game.console.executer();
    },

    executer: function() {
        var input = $('#console-input').val();
        var results = filterArrayOnRegexPattern(input, game.console.cmds);

        if(input === '') {
          return false;
        }

        if (results.length == 1) {
            var result = results[0],
                instances = filterArrayOnRegexPattern(input, result.commandRegex);

            if (instances.length == 1) {
                var instance = instances[0],
                    option = '';

                if (instance.options) {
                    var optionRegex = new RegExp(instance.options, 'g'),
                        matches = input.match(optionRegex);

                    if (matches.length == 1) {
                        var option = matches[0];
                        eval(instance.exec);
                    }
                    else
                        game.console.print('error', 'Unknown argument value.');
                }
                else
                    eval(instance.exec);
            }
            else
                game.console.print('error', 'Unknown arguments.');
        }
        else
            game.console.print('error', 'Unknown command.');


        game.console.history.push(input);
        console.log(game.console.history); // test
        game.console.arrowPressed = false;
        $('#console-input').val('');
    }
};
;

game.console.cmds = [
    {
        // DON'T CHANGE HACK COMMAND PLACE IN THIS ARRAY!
        // IT MUST BE IN INDEX 0!
        name: 'hack',
        desc: 'hack a place to earn money and experience.',
        pattern: '^hack',
        commandRegex: [
            {
                'pattern': '^hack[\\s]*$',
                'exec': 'game.hack("sp")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-help[\\s]*$',
                'exec': 'game.hack("help")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-stats[\\s]*$',
                'exec': 'game.hack("stats")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-list[\\s]*$',
                'exec': 'game.hack("list")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-place[\\s]+[\\w]*$',
                'exec': 'game.hack("place", option)',
                'options': '(mini_market|market|jewelry|bank|trading_center|anonymous_hideout|deepweb)'
            }
        ]
    },
    
    {
        name: 'upgrade',
        desc: 'upgrade your servers for an higher income.',
        pattern: '^upgrade',
        commandRegex: [
            {
                'pattern': '^upgrade[\\s]*$',
                'exec': 'game.upgrade("sp")',
                'options': false
            }, {
                'pattern': '^upgrade[\\s]+-help[\\s]*$',
                'exec': 'game.upgrade("help")',
                'options': false
            }, {
                'pattern': '^upgrade[\\s]+-info[\\s]*$',
                'exec': 'game.upgrade("info")',
                'options': false
            }, {
                'pattern': '^upgrade[\\s]+[\\w]+[\\s]*$',
                'exec': 'game.upgrade("server", option)',
                'options': '(personal|professional)'
            }
        ]
    },
    
    {
        name: 'buy',
        desc: 'buy servers, abilities or hire hackers to increase your hack income.',
        pattern: '^buy',
        commandRegex: [
            {
                'pattern': '^buy[\\s]*$',
                'exec': 'game.buy("sp")',
                'options': false
            }, {
                'pattern': '^buy[\\s]-help[\\s]*$',
                'exec': 'game.buy("help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-info[\\s]*$',
                'exec': 'game.buy("info")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-server[\\s]+-help[\\s]*$',
                'exec': 'game.buy("server-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-server[\\s]+[\\w]*$',
                'exec': 'game.buy("server", option)',
                'options': '(personal|professional|vm|quickhack)'
            }, {
                'pattern': '^buy[\\s]+-hacker[\\s]+[\\w]*$',
                'exec': 'game.buy("hacker", option)',
                'options': '(mini_market|market|jewelry|bank|trading_center|anonymous_hideout|deepweb)'
            }, {
                'pattern': '^buy[\\s]+-hacker[\\s]+-help*$',
                'exec': 'game.buy("hacker-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-hacker[\\s]+-list*$',
                'exec': 'game.buy("hacker-list")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-ability[\\s]+-help*$',
                'exec': 'game.buy("ability-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-ability[\\s]+[\\w]*$',
                'exec': 'game.buy("ability", option)',
                'options': '(key_up)'
            }, {
                'pattern': '^buy[\\s]+-ability[\\s]+-list*$',
                'exec': 'game.buy("ability-list")',
                'options': false
            }
        ]
    },
    
    {
        name: 'hackers',
        desc: 'used to perform actions on your hackers.',
        pattern: '^hackers',
        commandRegex: [
            {
                'pattern': '^hackers[\\s]*$',
                'exec': 'game.team.exec("sp")',
                'options': false
            }, {
                'pattern': '^hackers[\\s]+-help*$',
                'exec': 'game.team.exec("help")',
                'options': false
            }, {
                'pattern': '^hackers[\\s]+-status*$',
                'exec': 'game.team.exec("status")',
                'options': false
            }
        ]
    },
    
    {
        name: 'ability',
        desc: 'abilities are special skills to buy to enhance your hacker power.',
        pattern: '^ability',
        commandRegex: [
            {
                'pattern': '^ability[\\s]*$',
                'exec': 'game.abilities.exec("sp")',
                'options': false
            }, {
                'pattern': '^ability[\\s]+-help*$',
                'exec': 'game.abilities.exec("help")',
                'options': false
            }, {
                'pattern': '^ability[\\s]+-list*$',
                'exec': 'game.abilities.exec("list")',
                'options': false
            }
        ]
    },
    
    {
        name: 'achievements',
        desc: 'track your progress through the game.',
        pattern: '^achievements',
        commandRegex: [
            {
                'pattern': '^achievements[\\s]*$',
                'exec': 'game.achievements.exec("sp")',
                'options': false
            }, {
                'pattern': '^achievements[\\s]+-help[\\s]*$',
                'exec': 'game.achievements.exec("help")',
                'options': false
            }, {
                'pattern': '^achievements[\\s]+-list[\\s]*$',
                'exec': 'game.achievements.exec("list")',
                'options': false
            }
        ]
    },
    
    {
        name: 'config',
        desc: 'configure game settings.',
        pattern: '^config',
        commandRegex: [
            {
                'pattern': '^config[\\s]*$',
                'exec': 'game.config("sp")',
                'options': false
            }, {
                'pattern': '^config[\\s]+-help[\\s]*$',
                'exec': 'game.config("help")',
                'options': false
            }, {
                'pattern': '^config[\\s]+-sounds[\\s]+[\\w]+[\\s]*$',
                'exec': 'game.config("triggerSounds")',
                'options': '(true|false)'
            }, {
                'pattern': '^config[\\s]+-background[\\s]+[\\w]+[\\s]*$',
                'exec': 'game.config("triggerBackground", option)',
                'options': '(true|false)'
            }
        ]
    },
    
    {
        name: 'clear',
        desc: 'clear console output.',
        pattern: '^clear',
        commandRegex: [
            {
                "pattern": "^clear[\\s]*$",
                "exec": "game.console.clear()",
                "options": false
            }, {
                "pattern": "^clear[\\s]+-help[\\s]*$",
                "exec": "game.console.clear('help')",
                "options": false
            }
        ]
    },
    
    {
        name: 'help',
        desc: 'print a list of all the commands.',
        pattern: '^help',
        commandRegex: [
            {
                "pattern": "^help[\\s]*$",
                "exec": 'game.console.printHelp()',
                "options": false
            }
        ]
    },
    
    {
        name: 'guide',
        desc: 'learn to play this game if you are not familiar with the command line interface.',
        pattern: '^guide',
        commandRegex: [
            {
                'pattern': '^guide[\\s]*$',
                'exec': 'game.console.printGuide()',
                'options': false
            }
        ]
    }
];;

game.console.ascii = {
    levelUp: [
        ' /$$                                     /$$         /$$   /$$ /$$$$$$$<br>' +
        '| $$                                    | $$        | $$  | $$| $$__  $$<br>' +
        '| $$        /$$$$$$  /$$    /$$ /$$$$$$ | $$        | $$  | $$| $$  \\ $$<br>' +
        '| $$       /$$__  $$|  $$  /$$//$$__  $$| $$ /$$$$$$| $$  | $$| $$$$$$$/<br>' +
        '| $$      | $$$$$$$$ \\  $$/$$/| $$$$$$$$| $$|______/| $$  | $$| $$____/<br>' +
        '| $$      | $$_____/  \\  $$$/ | $$_____/| $$        | $$  | $$| $$<br>' +
        '| $$$$$$$$|  $$$$$$$   \\  $/  |  $$$$$$$| $$        |  $$$$$$/| $$<br>' +
        '|________/ \\_______/    \\_/    \\_______/|__/         \\______/ |__/',

         ' _                        _          _    _          _ <br>' +
         '| |                      | |        | |  | |        | |<br>' +
         '| |      ___ __   __ ___ | | ______ | |  | | _ __   | |<br>' +
         '| |     / _ \\\\ \\ / // _ \\| ||______|| |  | || \'_ \\  | |<br>' +
         '| |____|  __/ \\ V /|  __/| |        | |__| || |_) | |_|<br>' +
         '|______|\\___|  \\_/  \\___||_|         \\____/ | .__/  (_)<br>' +
         '                                            | |        <br>' +
         '                                            |_|        ',

         '#                                         #     #           ###<br>' + 
         '#       ###### #    # ###### #            #     # #####     ###<br>' + 
         '#       #      #    # #      #            #     # #    #    ###<br>' + 
         '#       #####  #    # #####  #      ##### #     # #    #     # <br>' + 
         '#       #      #    # #      #            #     # #####        <br>' + 
         '#       #       #  #  #      #            #     # #         ###<br>' + 
         '####### ######   ##   ###### ######        #####  #         ###<br>' 
    ]
};;

game.console.errors = {
    // clasics errors
    unknownCmd: 'Unknown command. Type <b>help</b> for a list of commands.',
    unknownArgs: 'Unknown arguments. Type <b>yourCommand -help</b> for more informations.',
    
    // hack errors
    levelLow: 'Level too low. Level-up to hack this area.',
    hackInProgress: 'You are already hacking a place. Wait for your hack to finish.',
    
    // config errors
    configNoArgs: 'You must use <b>config</b> with arguments. Type <b>config -help</b> for more informations.',
    
    // buy errors
    buyNoArgs: 'You must use <b>buy</b> with arguments. Type <b>buy -help</b> for more informations.',
    buyNoArgsServ: 'You must use <b>buy -server</b> with arguments. Type <b>buy -server -help</b> for more informations.',
    buyNoArgsHacker: 'You must use <b>buy -hacker</b> with arguments. Type <b>buy -hacker -help</b> for more informations.',
    buyNoArgsAbility: 'You must use <b>buy -ability</b> with arguments. Tpye <b>buy -ability -help</b> for more informations.',
    
    // achievements errors
    achNoArgs: 'You must use <b>achievements</b> with arguments. Type <b>achievements -help</b> for more informations.',
    
    // hacker errors
    hackerNoArgs: 'You must use <b>hackers</b> with arguments. Type <b>hackers -help</b> for more informations.',
    
    // abilities errors
    abilityNoArgs: 'You must use <b>ability</b> with arguments. Type <b>ability -help</b> for more informations.',
    
    // upgrade errors
    upgradeNoArgs: 'You must use <b>upgrade</b> with arguments. Type <b>upgrade -help</b> for more informations.'
};;

game.console.help = {
    hack: "<b>hack</b> can be used with arguments.<br>" + 
        "<b>hack -stats</b>: stats for the simple hack.<br>" +
        "<b>hack -place <i>nameOfPlace</i></b>: hack a place.<br> "+
        "<b>hack -place -list</b>: print a list of places with their respective informations.",

    config: "You must use <b>config</b> with arguments.<br>" +
        "<b>config -sounds <i>value</i></b>: enable (1) or disable (0) the sound of the game. (default 0)<br>" +
        "<b>config -background <i>value</i></b>: enable (1) or disable (0) the background animation. (defaut 0)",

    clear: "<b>clear</b> don't accept any arguments.",
    
    buy: "<b>buy</b> must be used with arguments.<br>" +
        "<b>buy -server</b>: buy a server. Get a list of server with <b>buy -server -help</b>.<br>" +
        "<b>buy -info</b>: print all your server status (reward, owned, next price, ...).<br>" +
        "<b>buy -hacker</b>: buy a hacker to automatically hack places.<br>" +
        "<b>buy -ability</b>: buy an ability to enhance your hacking power.",
        
    buyServer: "<b>buy -server personal</b>: low-cost server, slightly increase money hack income.<br>" + 
        "<b>buy -server professional</b>: better than low-cost servers, greatly increase money and experience hack income.<br>" + 
        "<b>buy -server vm</b>: virtual machines can reduce the time when hacking a place.<br>" +
        "<b>buy -server quickhack</b>: a quickhack server reduce by 1 the divided reward when clicking.",
    
    buyHacker: "<b>buy -hacker <i>nameOfHacker</i></b>: buy the specified hacker.<br>" +
        "<b>buy -hacker -list</b>: print a list of all hackers available.",
    
    buyAbility: "<b>buy -ability <i>nameOfAbility</i></b>: buy the specified ability.<br>" +
        "<b>buy -ability -list</b>: print a list of all abilities available.",
    
    achievements: "<b>achievements</b> must be used with arguments.<br>" +
        "<b>achievements -list</b>: print a list of all achievements.",
    
    hackers: "<b>hackers</b> must be used with arguments.<br>" +
        '<b>hackers -status</b>: print a list of all hackers available.<br>' +
        'You can buy hackers with the <b>buy</b> command. Look at <b>buy -hacker -help</b> command.',
    
    ability: '<b>ability</b> must be used with arguments.<br>' +
        '<b>ability -list</b>: print a list of all abilities available.<br>' +
        'To buy an ability, you must use the <b>buy</b> command. Type <b>buy -ability -help</b> for more informations.',
    
    upgrade: '<b>upgrade</b> must be used with arguments.<br>' +
        '<b>upgrade nameOfServer</b>: upgrade the specified server.<br>' +
        '<b>upgrade -info</b>: print stats of current and next servers upgrades.'
};;

game.console.cmds[0].places = {
    'mini_market': {
        name: 'mini_market',
        minMoneyReward: 450,
        maxMoneyReward: 1500,
        minExpReward: 250,
        maxExpReward: 650,
        time: 20,
        reqLevel: 2
    },
    'market': {
        name: 'market',
        minMoneyReward: 2000,
        maxMoneyReward: 5000,
        minExpReward: 250,
        maxExpReward: 600,
        time: 40,
        reqLevel: 10
    },
    'jewelry': {
        name: 'jewelry',
        minMoneyReward: 10000,
        maxMoneyReward: 40000,
        minExpReward: 1500,
        maxExpReward: 3000,
        time: 320, // 5min
        reqLevel: 20
    },
    'bank': {
        name: 'bank',
        minMoneyReward: 75000,
        maxMoneyReward: 200000,
        minExpReward: 7500,
        maxExpReward: 15000,
        time: 1280, // 21min
        reqLevel: 30
    },
    'trading_center': {
        name: 'trading_center',
        minMoneyReward: 750000,
        maxMoneyReward: 2500000,
        minExpReward: 50000,
        maxExpReward: 100000,
        time: 5120, // 1,42h
        reqLevel: 40
    },
    'anonymous_hideout': {
        name: 'anonymous_hideout',
        minMoneyReward: 5000000,
        maxMoneyReward: 12500000,
        minExpReward: 250000,
        maxExpReward: 1000000,
        time: 20480, // 5,68h
        reqLevel: 50
    },
    'deepweb': {
        name: 'deepweb',
        minMoneyReward: 50000000,
        maxMoneyReward: 100000000,
        minExpReward: 3500000,
        maxExpReward: 9500000,
        time: 81920, // 22,75h
        reqLevel: 60
    }
};;

game.console.print = function(type, text) {
    switch (type) {
        case 'gain':
            $('#console-content').append('<p><span class="console-gain">[GAIN]</span> ' + text + '</p>');
            break;
        
        case 'hack':
            $('#console-content').append('<p><span class="console-gain">[HACK]</span> ' + text + '</p>');
            break;

        case 'log':
            $('#console-content').append('<p><span class="console-log">[LOG]</span> ' + text + '</p>');
            break;
            
        case 'save':
            $('#console-content').append('<p><span class="console-log">[SAVE]</span> ' + text + '</p>');
            break;

        case 'error':
            $('#console-content').append('<p><span class="console-error">[ERROR]</span> ' + text + '</p>');
            break;

        case 'warn':
            $('#console-content').append('<p><span class="console-warn">[WARN]</span> ' + text + '</p>');
            break;
        
        case 'success':
            $('#console-content').append('<p><span class="console-warn">[ACHIEVEMENT]</span> ' + text + '</p>');
            break;
        
        case 'levelup':
            $('#console-content').append('<p><span class="console-warn">[LEVEL-UP]</span> ' + text + '</p>');
            break;

        case 'help':
            $('#console-content').append('<p><span class="console-help">[HELP]</span> ' + text + '</p>');
            break;
            
        case 'guide':
            $('#console-content').append('<p><span class="console-help">[GUIDE]</span> ' + text + '</p>');
            break;
        
        case 'ascii':
            $('#console-content').append('<div class="console ascii"><pre>' + text + '</pre></div>');
            break;
            
        case '':
            $('#console-content').append('<p>' + text + '</p>');
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
};

game.console.printGuide = function() {
    game.console.print('guide',
        'Welcome to Skid-Inc, you\'re a poor script-kid trying to make money with your hacking skills.<br>' +
        'Start making money by clicking the <b>hack</b> button or by typing <b>hack</b> command in the console.<br>' +
        'Buy different servers to increase your money and experience income.<br>' +
        'Hack different places to earn even more money and experience.<br>' +
        'Type <b>help</b> for a list of commands, use <b>arguments</b> (like -help for example) to use all the potential of the command (like <b>hack -help</b>).<br>' +
        'Try some commands: <b>buy server -help</b>, <b>hack -help</b> or even <b>config -help</b> to change game settings.<br>' +
        'Good luck in your hacking adventure!');
};;

game.sounds = {
    button: new Audio('app/assets/sounds/button.mp3'),
    ambient: new Audio('app/assets/sounds/server-room.mp3'),
    
    switchSounds: function() {
        if (!game.options.sounds) {
            game.config("sound-on");
            $('#navbar-mute').html(
                '<i class="fa fa-volume-up" aria-hidden="true"></i> Sounds on'
            );
        }
        else if (game.options.sounds) {
            game.config("sound-off");
            $('#navbar-mute').html(
                '<i class="fa fa-volume-off" aria-hidden="true"></i> Sounds off'
            );
        };
    },

    enableSounds: function() {
        console.log('sounds enabled')
        game.options.sounds = true;
        game.sounds.ambient.currentTime = 0;
        // game.sounds.ambient.play();

        game.options.intervals.ambientLoop = setInterval(function() {
            game.sounds.ambient.currentTime = 0;
            // game.sounds.ambient.play();
        }, 90000);
        
        game.options.intervals.randomSound = setInterval(game.sounds.randomSound, 20000);
    },

    disableSounds: function() {
        console.log('sounds disabled')
        game.options.sounds = false;
        
        game.sounds.ambient.pause();
        clearInterval(game.options.intervals.ambientLoop);
        clearInterval(game.options.intervals.randomSound);
    },
    
    randomSound: function() {
        var gotSound = Math.floor(Math.random() * 100),
            soundType = Math.floor(Math.random() * 100),
            audio = undefined;
        
        if (gotSound >= 25 && game.options.sounds) {
            if (soundType >= 50) {
                var rand = Math.ceil(Math.floor(game.randomInclusive(0, game.sounds.bip.length - 1)));
                
                game.sounds.bip[rand].volume = 0.30;
                game.sounds.bip[rand].play();
            }
            else if (soundType < 50) {
                var rand = Math.ceil(Math.floor(game.randomInclusive(0, game.sounds.hdd.length - 1)));
                
                game.sounds.hdd[rand].volume = 0.30;
                game.sounds.hdd[rand].play();
            };
        };
    },

    varInit: function() {
        game.sounds.ambient.volume = 0.30;
        
        if (game.options.sounds) {
            game.sounds.ambient.play();

            game.options.intervals.ambientLoop = setInterval(function() {
                game.sounds.ambient.currentTime = 0;
                // game.sounds.ambient.play();
            }, 90000);
            
            game.options.intervals.randomSound = setInterval(game.sounds.randomSound, 20000);
        };
        
        game.sounds.bip = [
            new Audio('app/assets/sounds/computer-bip-1.mp3'),
            new Audio('app/assets/sounds/computer-bip-2.mp3'),
            new Audio('app/assets/sounds/computer-bip-3.mp3'),
            new Audio('app/assets/sounds/computer-bip-4.mp3'),
            new Audio('app/assets/sounds/computer-bip-5.mp3'),
            new Audio('app/assets/sounds/computer-bip-6.mp3')
        ];
        
        game.sounds.hdd = [
            new Audio('app/assets/sounds/hard-disk-writing-1.mp3'),
            new Audio('app/assets/sounds/hard-disk-writing-2.mp3'),
            new Audio('app/assets/sounds/hard-disk-writing-3.mp3'),
            new Audio('app/assets/sounds/hard-disk-writing-4.mp3'),
        ];
    },
};;

game.achievements = {
    owned: new Array(),
    list: new Array(),
    printed: new Array(),
    
    create: function(name, desc, reqName, reqNum, reward) {
        this.name = name;
        this.desc = desc;
        this.reqName = reqName;
        this.reqNum = reqNum;
        this.reward = reward;
    },
    
    check: function() {
        for (var i = 0; i < game.achievements.list.length; i++) {
            var thisAch = game.achievements.list[i],
                playerValue = eval(game.achievements.list[i].reqName);
            
            if (playerValue >= thisAch.reqNum && !game.achievements.owned[i]) {
                game.player.achievementsPoints += thisAch.reward;
                game.achievements.owned[i] = true;
                
                console.log(game.achievements.printed[i])
                
                if (!game.achievements.printed[i]) {
                    game.achievements.printed[i] = true;
                    
                    game.console.print('success', 'Achievement earned: <b>' + thisAch.name + '</b>, ' + thisAch.desc + ', +' + fix(thisAch.reward, 0) + ' ach. points.');
                };
            };
        };
    },
    
    exec: function(from) {
        if (from == "sp") {
            game.console.print('error', game.console.errors.achNoArgs);
            
            return;
        };
        
        if (from == "help") {
            game.console.print('help', game.console.help.achievements);
            
            return;
        };
        
        if (from == "list") {
            game.console.print('log', 'Achievements points: <b>' + fix(game.player.achievementsPoints, 0) + '</b>');
            
            for (var i = 0; i < game.achievements.list.length; i++)
                game.console.print('', '<b>' + game.achievements.list[i].name + '</b>: ' + game.achievements.list[i].desc + ' ' +
                    'Reward: +' + game.achievements.list[i].reward + ' ach. points, owned: ' + !!game.achievements.owned[i] + '.');
            
            return;
        };
    },
    
    checkLoaded: function() {
        if (game.achievements.owned.length !== game.achievements.list.length) {
            var diff = game.achievements.list.length - game.achievements.owned.length;
            
            for (var i = 0; i < diff; i++) {
                game.achievements.owned.push(false);
                game.achievements.printed.push(false);
            };
        };
    },
    
    varInit: function() {
        game.achievements.list = [
            new game.achievements.create('Script Kid I', 'Hack 100 times (click or via console).',
                'game.player.timesHacked', 100, 10),
            new game.achievements.create('Script Kid II', 'Hack 1,000 times (click or via console).',
                'game.player.timesHacked', 1000, 25),
            new game.achievements.create('Script Kid III', 'Hack 10,000 times (click or via console).',
                'game.player.timesHacked', 10000, 50),
            new game.achievements.create('Script Kid IV', 'Hack 100,000 times (click or via console).',
                'game.player.timesHacked', 100000, 75),
            new game.achievements.create('Script Kid V', 'Hack 1,000,000 times (click or via console).',
                'game.player.timesHacked', 1000000, 250),
            
            new game.achievements.create('Hacker I', 'Hack 10 times a place.',
                'game.player.timesPlacesHacked', 10, 10),
            new game.achievements.create('Hacker II', 'Hack 1,00 times a place.',
                'game.player.timesPlacesHacked', 100, 25),
            new game.achievements.create('Hacker III', 'Hack 1,000 times a place.',
                'game.player.timesPlacesHacked', 1000, 50),
            new game.achievements.create('Hacker IV', 'Hack 10,000 times a place.',
                'game.player.timesPlacesHacked', 10000, 75),
            new game.achievements.create('Hacker V', 'Hack 100,000 times a place.',
                'game.player.timesPlacesHacked', 100000, 250),
            
            new game.achievements.create('Personal servers I', 'Buy your first personal server.',
                'game.servers.personal.owned', 1, 10),
            new game.achievements.create('Personal servers II', 'Buy 50 personal servers.',
                'game.servers.personal.owned', 50, 20),
            new game.achievements.create('Personal servers III', 'Buy 250 personal servers.',
                'game.servers.personal.owned', 250, 40),
            new game.achievements.create('Personal servers IV', 'Buy 1,000 personal servers.',
                'game.servers.personal.owned', 1000, 80),
            new game.achievements.create('Personal servers IV', 'Buy 25,000 personal servers.',
                'game.servers.personal.owned', 25000, 160),

            new game.achievements.create('Professional servers I', 'Buy your first professional server.',
                'game.servers.professional.owned', 1, 10),
            new game.achievements.create('Professional servers II', 'Buy 50 professional servers.',
                'game.servers.professional.owned', 50, 20),
            new game.achievements.create('Professional servers III', 'Buy 250 professional servers.',
                'game.servers.professional.owned', 250, 40),
            new game.achievements.create('Professional servers IV', 'Buy 1,000 professional servers.',
                'game.servers.professional.owned', 1000, 80),
            new game.achievements.create('Professional servers IV', 'Buy 25,000 professional servers.',
                'game.servers.professional.owned', 25000, 160)
        ];
        
        for (var i = 0; i < game.achievements.list.length; i++) {
            game.achievements.owned.push(false);
            game.achievements.printed.push(false);
        };
    }
};;

// made by Neil Carpenter
// https://github.com/neilcarpenter/Matrix-code-rain

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

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
			min: 4,
			max: 8
		},
		CODE_LENGTH_PARAMS: {
			min: 20,
			max: 40
		},
		videoActive: false
	},

	animation: null,

	c: null,
	ctx: null,

	lineC: null,
	ctx2: null,

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

			M.ctx2.clearRect(0, 0, M.WIDTH, M.HEIGHT);

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
			// slow fade BG colour
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

			// check member of array isn't undefined at this point
			if (M.codes[i][0].canvas) {
				velocity = M.codes[i][0].velocity;
				height = M.codes[i][0].canvas.height;
				x = M.codes[i][0].position.x;
				y = M.codes[i][0].position.y - height;
				c = M.codes[i][0].canvas;
				ctx = c.getContext('2d');

				M.ctx.drawImage(c, x, y, M.settings.COL_WIDTH, height);

				if ((M.codes[i][0].position.y - height) < M.HEIGHT) {
					M.codes[i][0].position.y += velocity;
				}
				else {
					M.codes[i][0].position.y = 0;
				}

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

	getVideo: function() {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL;

		navigator.getUserMedia({
			video: true
		}, function(localMediaStream) {
			M.video = document.createElement('video');
			M.video.autoplay = true;
			M.video.width = M.WIDTH;
			M.video.src = window.URL.createObjectURL(localMediaStream);

			M.HEIGHT = M.WIDTH * 0.75; // ratio
			M.video.height = M.HEIGHT;

			M.settings.videoActive = true;

		}, function(error) {
			console.log(error);
		});
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
	M.init();
	
	if (game.options.effectEnabled)
		$('#matrix-effect').fadeIn('slow');
};