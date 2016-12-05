var game = {
	now: new Date().getTime(),
	before: new Date().getTime(),
	version: 0.21,
	fps: 30,
	interval: 1000,
	intervals: {
		core: undefined,
		save: undefined
	},
	theme: 'snow',

	core: function() {
		game.now = new Date().getTime();

		var elapsed = game.now - game.before,
			times = Math.floor(elapsed / game.interval);

		elapsed > game.interval ? game.update(times) : game.update(1);

		game.before = new Date().getTime();
	},

	update: function(times) {
		game.hack.loop(times);
		game.virus.loop(times);
		game.hack.hackerLoop(times);
		game.kongregate.bonusTimeLoop(times);
		
		game.display();
	},

	display: function() {
		$('#stats-money').html('Money: $' + fix(game.player.money));
		$('#stats-level').html('Level: ' + game.player.level);
		$('#stats-exp').html('Exp: ' + fix(game.player.exp, 0) + '/' + fix(game.player.expReq, 0));
		$('#stats-reputation').html('Reputation: ' + fix(game.player.reputation));
		$('#stats-moneymult').html('Money mult: x' + fix(game.player.getGlobalMoneyMult()));
		$('#stats-expmult').html('Exp mult: x' + fix(game.player.getGlobalExpMult()));
		$('#stats-timemult').html('Time mult: /' + fix(game.player.getGlobalTimeMult()));
		$('#stats-totalmoney').html('Total money: $' + fix(game.player.totalMoney));
		$('#stats-prestigied').html('Prestigied: ' + fix(game.player.prestigied, 0) + ' times');
		$('#stats-irccost').html('IRC cost: $' + fix(game.servers.getCost(game.servers.irc)));
		$('#stats-vmcost').html('VM cost: $' + fix(game.servers.getCost(game.servers.vm)));
		$('#stats-ircowned').html('IRC owned: ' + game.servers.irc.owned);
		$('#stats-vmowned').html('VM owned: ' + game.servers.vm.owned);
		$('#stats-zombieowned').html('Zombies owned: ' + game.servers.zombie.owned);
		$('#stats-infectionspersec').html('Infections/sec: ' + game.virus.getAllVirusSend());
		$('#stats-botnetpower').html('Botnet power: ' + fix(game.botnet.power));
		$('#stats-powermult').html('Power mult: x' + fix(game.botnet.getPowerMult()));
		
		if (typeof game.kongregate.isGuest == 'boolean')
			$('#navbar-bonustime').html('<b>x' + game.kongregate.getMult() + '</b> ads boost: ' + msToTime(game.kongregate.bonusTime));
	},

	varInit: function() {
		game.console.varInit();

		game.interval = 1000 / game.fps;

		game.intervals.core = setInterval(function() {
			game.core();
		}, game.interval);
        
        game.intervals.save = setInterval(function() {
            game.save.save();
        }, game.save.interval);
        
        window.onbeforeunload = function() {
        	game.save.save();
        };
	},

	domInit: function() {
		$('#game-version').html('v' + game.version);
		
		$('#console-input').bind('keydown', function(e) {
			if (e.which == 13)
				game.console.parser();
		}).bind(('cut copy paste'), function(e) {
			e.preventDefault();
		});
		
		$('.enter').on('click', function() {
			game.console.parser();
		});
		
		$('.blinking-arrow').on('click', function() {
			$('#console-input').focus();
		});
		
		$('#console-input').focus();
		
		setTimeout(function() {
			if (!game.options.background)
				game.options.toggleBackground('disabled');
		}, 1000);
		
		switch(game.theme) {
			case 'default':
				initMatrixBackground();
				break;
			
			case 'snow':
				initSnowBackground();
				break;
		};
	},

	init: function() {
		game.varInit();
		game.save.load();
		game.update(Math.floor((game.now - game.before) / game.interval));
		game.domInit();
		game.kongregate.init();

		console.info('v' + game.version + ':', 'game ready to play!');
	}
};
game.hack = {
    isHacking: false,
    currentHack: false,
    hackProgress: 0,
    
    getTime: function(what) {
        return what.time / game.player.getGlobalTimeMult();
    },
    
    getMoney: function(what) {
        var rand = Math.random() * 0.5;

        return (what.money + (what.money * rand)) * game.player.getGlobalMoneyMult();
    },
    
    getExp: function(what) {
        var rand = Math.random() * 0.25;

        return (what.exp + (what.exp * rand)) * game.player.getGlobalExpMult();
    },
    
    buyHacker: function(who) {
        var Hacker = game.hack.hackers[who],
            Place = game.hack.places[Hacker.placeObject];
        
        if (Hacker.owned)
            game.console.print('You already hired <b>' + Hacker.readable +'</b>.', 'error');
        else if (game.player.money < Hacker.price)
            game.console.print('You don\'t have enough money to hire <b>' + Hacker.readable + '</b>.', 'error');
        else if (game.hack.isHacking) {
            if (game.hack.currentHack.name == Hacker.placeName)
                game.console.print('You are currently hacking the place that the hacker should hack, hire him when hack is finished.', 'error');
        }
        else {
            Hacker.owned = true;
            game.player.money -= Hacker.price;
            game.console.print('You successfully hired <b>' + Hacker.name + '</b> hacker.');
        };
    },
    
    hackerDesc: function(what) {
        var Hacker = game.hack.hackers[what];
        return Hacker.readable + ' will hack <b>' + Hacker.placeName + '</b>, hire him for $<b>' + fix(Hacker.price) + '</b>.';
    },
    
    placeDesc: function(what) {
        var Place = game.hack.places[what];
        return 'level req. <b>' + Place.levelReq + '</b>, takes <b>' + fix(game.hack.getTime(Place), 0) + '</b> sec, <b>≈ +$'
            + fix(game.hack.getMoney(Place), 0) + ' and ≈ +' + fix(game.hack.getExp(Place), 0) + '</b> exp.';
    },
    
    cancel: function() {
        if (!game.hack.isHacking)
            game.console.print('You are not hacking a place.', 'error');
        else if (game.hack.isHacking) {
    	    $('#hack-progress').html('<b>' + cap(game.hack.currentHack.name) + '</b> hack cancelled.').attr('id', 'old-hack-progress');
    	    
    	    game.hack.isHacking = false;
    	    game.hack.currentHack = undefined;
    	    game.hack.hackProgress = 0;
        };
    },
    
    basic: function() {
        var money = (Math.random() + 1) * (150 * Math.pow(1.4, game.player.level)),
            exp = (Math.random() + 1) * (25 * Math.pow(1.35, game.player.level));
        
        game.player.earnExp(exp);
        game.player.earnMoney(money);
        
        game.console.print('You gained <b>$' + fix(money) + '</b> and <b>' + fix(exp) + '</b> exp.');
    },
    
    place: function(what) {
        var Place = game.hack.places[what];
        
        if (!game.hack.isHacking && !game.virus.doingVirus && !game.hack.hackers[Place.hacker].owned && game.player.level >= Place.levelReq) {
            game.hack.isHacking = true;
            game.hack.currentHack = Place;
            $('.text-side').append('<p id="hack-progress">');
            game.console.print('Starting ' + Place.name + ' hack... You can cancel the hack with <b>hack place cancel</b>.');
        }
        else if (game.virus.doingVirus)
            game.console.print('You can\'t create a virus and hack a place at the same time.', 'error');
        else if (game.hack.isHacking)
            game.console.print('You can\'t hack more than one place at a time.', 'error');
        else if (game.player.level < Place.levelReq)
            game.console.print('Your level is too low for this place, you need to be at least level ' + Place.levelReq + ' to hack it.', 'error');
        else
            game.console.print('You can\'t hack this place.', 'error');
    },
    
    loop: function(times) {
    	if (game.hack.isHacking) {
    	    var Place = game.hack.currentHack,
    	        time = game.hack.getTime(Place),
    	        timeLeft = 0,
    	        percent = Math.floor(game.hack.hackProgress / time * 100),
    	        filled = Math.floor(game.hack.hackProgress / time * 35),
    	        left = Math.ceil(35 - filled),
    	        bar = '|';

    	    game.hack.hackProgress += times / game.fps;

    	    if (game.hack.hackProgress < time) {
    	        for (var i = 0; i < filled; i++)
    	            bar += '#';

    	        for (var e = 0; e < left; e++)
    	            bar += '=';

    	        timeLeft = time - game.hack.hackProgress;
    	        bar += '| <b>' + fix(percent, 0) + '%, ' + fix(timeLeft, 2) + ' sec.</b>';

    	        $('#hack-progress').html(bar);
    	    }
    	    else if (game.hack.hackProgress >= time) {
    	        var money = game.hack.getMoney(game.hack.currentHack),
    	            exp = game.hack.getExp(game.hack.currentHack);

    	        for (var j = 0; j < 35; j++)
    	            bar += '#';

    	        bar += '| <b>100%, 0.00 sec</b>';

    	        game.console.print(cap(game.hack.currentHack.readable) + ' hack finished: <b>+$' + fix(money) + ', +' + fix(exp) + '</b> exp.');
    	        $('#hack-progress').html(bar).attr('id', 'old-hack-progress');

                game.player.earnMoney(money);
                game.player.earnExp(exp);

    	        game.hack.isHacking = false;
    	        game.hack.currentHack = undefined;
    	        game.hack.hackProgress = 0;
    	    };
    	};
    },
    
    hackerLoop: function(times) {
        for (var place in game.hack.places) {
            var Place = game.hack.places[place];
            
            if (game.hack.hackers[Place.hacker].owned && game.player.level >= Place.levelReq) {
                var Hacker = game.hack.hackers[Place.hacker],
                    time = game.hack.getTime(Place);
                
                Hacker.progress += times / game.fps;
                
                while (Hacker.progress >= time) {
                    var money = game.hack.getMoney(Place),
                        exp = game.hack.getExp(Place);
                    
                    game.player.earnMoney(money);
                    game.player.earnExp(exp);
                    
                    Hacker.progress -= time;
                };
            };
        };
    }
};
game.hack.hackers = {
    'grocer': {
        name: 'grocer',
        readable: 'grocer',
        placeObject: 'grocery',
        placeName: 'grocery',
        price: 10000,
        owned: false,
        progress: 0
    },
    'business_man': {
        name: 'business-man',
        readable: 'business-man',
        placeObject: 'business',
        placeName: 'business',
        price: 50000,
        owned: false,
        progress: 0
    },
    'cashier': {
        name: 'cashier',
        readable: 'cashier',
        placeObject: 'market',
        placeName: 'market',
        price: 75000,
        owned: false,
        progress: 0
    },
    'banker': {
        name: 'banker',
        readable: 'banker',
        placeObject: 'bank',
        placeName: 'bank',
        price: 1000000,
        owned: false,
        progress: 0
    },
    'jeweler': {
        name: 'jeweler',
        readable: 'jeweler',
        placeObject: 'jewelry',
        placeName: 'jewelry',
        price: 15000000,
        owned: false,
        progress: 0
    },
    'mark': {
        name: 'mark',
        readable: 'Mark',
        placeObject: 'facebook',
        placeName: 'facebook',
        price: 500000000,
        owned: false,
        progress: 0
    },
    'steve': {
        name: 'steve',
        readable: 'Steve',
        placeObject: 'apple',
        placeName: 'apple',
        price: 5000000000,
        owned: false,
        progress: 0
    },
    'larry': {
        name: 'larry',
        readable: 'Larry',
        placeObject: 'google',
        placeName: 'google',
        price: 75000000000,
        owned: false,
        progress: 0
    }
};
game.hack.places = {
    'grocery': {
        name: 'grocery',
        readable: 'grocery',
		hacker: 'grocer',
		money: 1500,
		exp: 500,
		time: 15,
		levelReq: 1
    },
    'business': {
        name: 'business',
        readable: 'business',
		hacker: 'business_man',
		money: 2819,
		exp: 1628,
		time: 49,
		levelReq: 5
    },
    'market': {
        name: 'market',
        readable: 'market',
		hacker: 'cashier',
		money: 13807,
		exp: 6638,
		time: 158,
		levelReq: 10
    },
    'bank': {
        name: 'bank',
        readable: 'bank',
		hacker: 'banker',
		money: 92919,
		exp: 35334,
		time: 515,
		levelReq: 20
    },
    'jewelry': {
        name: 'jewelry',
        readable: 'jewelry',
		hacker: 'jeweler',
		money: 915645,
		exp: 258434,
		time: 1673,
		levelReq: 30
    },
    'facebook': {
        name: 'facebook',
        readable: 'Facebook',
		hacker: 'mark',
		money: 14258454,
		exp: 2758652,
		time: 5439,
		levelReq: 45
    },
    'apple': {
        name: 'apple',
        readable: 'Apple',
		hacker: 'steve',
		money: 384491667,
		exp: 46177388,
		time: 17676,
		levelReq: 60
    },
    'google': {
        name: 'google',
        readable: 'Google',
		hacker: 'larry',
		money: 20038458884,
		exp: 1320294906,
		time: 57448,
		levelReq: 75
    }
};
game.virus = {
    doingVirus: false,
    whatVirus: undefined,
    virusProgress: 0,
    oneSecInterval: 0,
    
    getTime: function(what) {
        return what.time / game.player.getGlobalTimeMult();
    },
    
    getEffect: function(what) {
        return what.effect;
    },
    
    getTotalEffect: function(what) {
        return getEffect(what) * what.send;
    },
    
    getSuccessRate: function(what) {
        return what.success * 100;
    },
    
    getAllVirusSend: function() {
        var count = 0;
        
        for (var virus in game.virus.list)
            count += game.virus.list[virus].effect * game.virus.list[virus].send;
    
        return count;
    },
    
    virusDesc: function(what) {
        var Virus = game.virus.list[what];
        return 'level req. <b>' + Virus.reqLevel + '</b>, takes <b>' + game.virus.getTime(Virus) + '</b> sec, success rate of <b>' + game.virus.getSuccessRate(Virus) +
            '</b>, one ' + Virus.name + ' infect <b>' + Virus.effect + '</b> computers/sec. <span class="virus-factoid"><i class="fa fa-question-circle-o" aria-hidden="true"></i> <span class="virus-factoid-content"><i>' + Virus.factoid + '</i></span></span>';
    },
    
    cancel: function() {
        $('#virus-progress').html('Virus ' + game.virus.whatVirus.name + ' cancelled.').attr('id', 'old-virus-progress');
        game.virus.doingVirus = false;
        game.virus.whatVirus = undefined;
        game.virus.virusProgress = 0;
    },
    
    create: function(what) {
        var Virus = game.virus.list[what];
        
        if (!game.hack.isHacking && !game.virus.doingVirus && game.player.level >= Virus.reqLevel) {
            game.virus.doingVirus = true;
            game.virus.whatVirus = Virus;
            game.console.print('Creating ' + Virus.name + ' virus... You can cancel your virus with <b>virus create cancel</b>.');
            $('.text-side').append('<p id="virus-progress">');
        }
        else if (game.hack.isHacking)
            game.console.print('You can\'t hack a place and create a virus at the same time.', 'error');
        else if (game.virus.doingVirus)
            game.console.print('You can\'t create multiple virus at once.', 'error');
        else if (game.player.level < Virus.reqLevel)
            game.console.print('Your level is too low to create this virus.', 'error');
        else
            game.console.print('You can\'t create this virus.', 'error');
    },
    
    loop: function(times) {
        if (game.virus.oneSecInterval >= 1000) {
            game.virus.oneSecInterval = 0;
            game.servers.zombie.owned += game.virus.getAllVirusSend();
            game.botnet.power = game.botnet.getPower();
        }
        else
            game.virus.oneSecInterval += (times / game.fps) * 1000;
        
        if (game.virus.doingVirus) {
            var Virus = game.virus.whatVirus,
                time = game.virus.getTime(Virus),
                timeLeft = 0,
                percent = Math.floor(game.virus.virusProgress / time * 100),
                filled = Math.floor(game.virus.virusProgress / time * 35),
                left = Math.ceil(35 - filled),
                bar = '|';

            game.virus.virusProgress += times / game.fps;

            if (game.virus.virusProgress < time) {
                for (var i = 0; i < filled; i++)
                    bar += '#';

                for (var e = 0; e < left; e++)
                    bar += '=';

                timeLeft = time - game.virus.virusProgress;
                bar += '| <b>' + fix(percent, 0) + '%, ' + fix(timeLeft, 2) + ' sec</b>';

                $('#virus-progress').html(bar);
            }
            else if (game.virus.virusProgress >= time) {
                var successRate = Math.random();

                for (var j = 0; j < 35; j++)
                    bar += '#';

                bar += '| <b>100%, 0.00 sec</b>';

                if (successRate <= Virus.success) {
                    Virus.send++;
                    game.console.print('Your ' + Virus.name + ' virus works well and will infect computers over time.');
                }
                else
                    game.console.print('Your ' + Virus.name + ' virus is a fail.', 'error');

                $('#virus-progress').html(bar).attr('id', 'old-virus-progress');
                
                game.virus.doingVirus = false;
                game.virus.whatVirus = undefined;
                game.virus.virusProgress = 0;
            };
        }
    }
};
game.virus.list = {
    'boza': {
        name: 'boza',
        factoid: 'Boza, also know as Bizatch, was the first virus to infect PE executable. It was discovered in 1995.',
        time: 30,
        success: 0.25,
        effect: 1,
        reqLevel: 1,
        send: 0
    },
    'happy99': {
        name: 'happy99',
        factoid: 'Happy99 is not a destructive virus, indeed it\'s just a space animation pop-up.',
        time: 210,
        success: 0.2,
        effect: 3,
        reqLevel: 10,
        send: 0
    },
    'memz': {
        name: 'memz',
        factoid: 'MEMZ is a very destructive trojan, it will overwrite your MBR (you will not be able to boot) and will display a Nyan Cat animation.',
        time: 735,
        success: 0.25,
        effect: 9,
        reqLevel: 30,
        send: 0
    },
    'faggot': {
        name: 'faggot',
        factoid: 'Faggot is a virus that appeared on IRC. His goal is to create blue screen and delete files required to boot. This name was given by Kaspersky.',
        time: 2572,
        success: 0.3,
        effect: 81,
        reqLevel: 50,
        send: 0
    },
    'magistr': {
        name: 'magistr',
        factoid: 'Magistr is one of the most powerful viruses that can exist. His goal is to delete random files and destroy the BIOS chip.',
        time: 9002,
        success: 0.35,
        effect: 6561,
        reqLevel: 100,
        send: 0
    }
};
game.kongregate = {
    adAvailable: false,
    onAd: false,
    adsCompleted: 0,
    bonusTime: 0,
    bonusMult: 3,
    boughtMults: 0,
    
    getMult: function() {
        return game.kongregate.bonusMult + game.kongregate.boughtMults;
    },
    
    getBonusMult: function() {
        if (game.kongregate.bonusTime > 0)
            return game.kongregate.bonusMult + game.kongregate.boughtMults;
        else
            return 1;
    },
    
    init: function() {
        if (kongregateAPI)
            kongregateAPI.loadAPI(onComplete);
        
        function onComplete() {
            var api = kongregateAPI.getAPI();
            
            game.kongregate.isGuest = api.services.isGuest();
            
            api.mtx.addEventListener("adsAvailable", function() {
                game.kongregate.adAvailable = true;
                
                console.info('Ad available.');
            });
            
            api.mtx.addEventListener("adsUnavailable", function() {
                game.kongregate.adAvailable = false;
                
                console.info('Ad unavailable.')
            });
            
            api.mtx.addEventListener("adOpened", function() {
                game.kongregate.onAd = true;
            });
            
            api.mtx.addEventListener("adCompleted", function() {
                game.kongregate.adsCompleted++;
                game.kongregate.onAd = false;
                game.kongregate.bonusTime += 2.16E7;
                game.console.print('Thanks, you help the developer when watching ads.');
            });
            
            api.mtx.addEventListener("adAbandoned", function() {
                game.kongregate.onAd = false;
                game.console.print('You closed the ad before it ended, you are not rewarded of your bonus.');
            });
            
            api.mtx.initializeIncentivizedAds();
            
            if (!game.kongregate.isGuest) {
                game.kongregate.userId = api.services.getUserId();
                game.kongregate.username = api.services.getUsername();
                game.kongregate.token = api.services.getGameAuthToken();
            };
        };
    },
    
    submitScore: function() {
        // var api = kongregateAPI.getAPI(),
        //     money = game.player.money,
        //     level = game.player.level;
        
        // api.stats.submit('Level', level);
        // api.stats.submit('Money', money);
    },
    
    getAllMtx: function() {
        if (typeof game.kongregate.isGuest !== 'boolean') {
            console.error('Not on Kongregate.');
            return;
        };
        
        var api = kongregateAPI.getAPI(),
            result = api.mtx.requestItemList(undefined, onItemList),
            items = [];
        
        function onItemList(result) {
            if (result.success) {
                for (var i = 0; i < result.data.length; i++) {
                    var item = result.data[i];
                    items.push(item);
                };
                
                return items;
            };
        };
    },
    
    buyMtx: function(what) {
        if (typeof game.kongregate.isGuest !== 'boolean') {
            game.console.print('This feature is only available for Kongregate players.', 'error');
            return;
        };
        
        var api = kongregateAPI.getAPI();
        
        api.mtx.purchaseItems([what], onPurchaseResult);
        
        function onPurchaseResult(result) {
            if (!result.success) {
                game.console.print('Purchase failed, if you think this is an error, report this as a Powerup Reward bug.', 'error');
                return;
            };
            
            switch(what) {
                case 'ad_mult':
                    game.kongregate.boughtMults++;
                    game.console.print('Your ads multiplier is now of <b>x' + game.kongregate.getMult() + '</b>.');
                    break;
                
                case 'ad_mult_x5':
                    game.kongregate.boughtMults += 5;
                    game.console.print('Your ads multiplier is now of <b>x' + game.kongregate.getMult() + '</b>.');
                    break;
                
                case 'black_theme':
                    game.console.black = true;
                    game.console.print('To enable your theme, write <b>option theme black</b>.');
                    break;
                
                case 'monokai_theme':
                    game.console.monokai = true;
                    game.console.print('To enable your theme, write <b>option theme monokai</b>.');
                    break;
                
                case 'afterglow_theme':
                    game.console.afterglow = true;
                    game.console.print('To enable your theme, write <b>option theme afterglow</b>.');
                    break;
                
                case 'fluoro_theme':
                    game.console.fluoro = true;
                    game.console.print('To enable your theme, write <b>option theme fluoro</b>.');
                    break;
            };
        };
    },
    
    watch: function() {
        if (typeof game.kongregate.isGuest !== 'boolean')
            game.console.print('You need to play on Kongregate to enable this functionnality.', 'error');
        else {
            var api = kongregateAPI.getAPI();
            
            if (!game.kongregate.adAvailable)
                game.console.print('Sorry, no ads available, try again later.', 'error');
            else
                api.mtx.showIncentivizedAd();
        };
    },
    
    bonusTimeLoop: function(times) {
        if (game.kongregate.bonusTime > 0)
            game.kongregate.bonusTime -= (times / game.fps) * 1000;
        else if (game.kongregate.bonusTime <= 0)
            game.kongregate.bonusTime = 0;
    }
};
game.player = {
	money: 0,
	totalMoney: 0,
	reputation: 0,
	level: 1,
	exp: 0,
	expReq: 1000,
	expInflation: 1.5,
	power: 0,
	prestigied: 0,
	
	getGlobalMoneyMult: function() {
		var ircEffect = game.servers.getTotalEffects(game.servers.irc).moneyEffect,
			adMult = game.kongregate.getBonusMult();

		return (ircEffect) * adMult;
	},

	getGlobalExpMult: function() {
		var ircEffect = game.servers.getTotalEffects(game.servers.irc).expEffect,
			adMult = game.kongregate.getBonusMult();

		return (ircEffect) * adMult;
	},

	getGlobalTimeMult: function() {
		var vmEffect = game.servers.getTotalEffects(game.servers.vm).timeEffect;

		return (vmEffect);
	},

	earnMoney: function(amount) {
		game.player.money += amount;
		game.player.totalMoney += amount;
	},
	
	earnExp: function(amount) {
		game.player.exp += amount;
		
		while (game.player.exp >= game.player.expReq) {
			game.player.level++;
			game.player.exp -= game.player.expReq;
			game.player.expReq = Math.floor(1000 * Math.pow(game.player.expInflation, game.player.level));
			
			game.console.print('Level-up, you are now level <b>' + game.player.level + '</b>.');
		};
	}
};
game.servers = {
    vm: {
        name: 'vm',
        owned: 0,
        price: 1e6,
        inflation: 5.5,
        timeEffect: 0.25,
        maxCount: 50,
        buyable: true
    },
    
    irc: {
        name: 'irc',
        owned: 0,
        price: 1e4,
        inflation: 1.23,
        moneyEffect: 1.15,
        expEffect: 0.75,
        maxCount: 1e6,
        buyable: true
    },
    
    zombie: {
        name: 'zombie',
        owned: 0,
        powerEffect: 0.1,
        buyable: false
    },
    
    getCost: function(what) {
        if (what.owned < 1)
            return what.price;
        else
            return what.price * Math.pow(what.owned, what.inflation);
    },
    
    getEffects: function(what) {
        var effects = [],
            result = {};
        
        for (var key in what)
            if (key.indexOf('Effect') > -1)
                effects.push(key);
        
        for (var i = 0; i < effects.length; i++)
            result[effects[i]] = what[effects[i]];
        
        return result;
    },
    
    getTotalEffects: function(what) {
        var effects = [],
            result = {};
        
        for (var key in what)
            if (key.indexOf('Effect') > -1)
                effects.push(key);
        
        for (var i = 0; i < effects.length; i++)
            result[effects[i]] = what[effects[i]] * what.owned + 1;
        
        return result;
    },
    
    buy: function(what) {
        var Server = game.servers[what];

        if (game.player.money >= game.servers.getCost(Server) && (Server.owned + 1) < Server.maxCount && Server.buyable) {
            game.player.money -= game.servers.getCost(Server);
            Server.owned++;
            game.servers.priceUpdate();
            game.console.print('You successfully bought <b>1 ' + Server.name + '</b> server.');
        }
        else if (!Server.buyable)
            game.console.print('You can\'t buy this type of server.', 'error');
        else if (game.player.money < game.servers.getCost(Server))
            game.console.print('Not enough money, you need $<b>' + fix(game.servers.getCost(Server)) + '</b>.', 'error');
        else
            game.console.print('Can\'t buy server.');
    },

    priceUpdate: function() {
        game.console.commands.filter(function(base) {
            if (base.name == 'buy') {
                base.commands.filter(function(command) {
                    if (command.id == 0) {
                        command.optionsDesc[0] = 'VM servers decrease time required to hack a place by <b>25%</b>.' +
                            ' Cost $<b>' + fix(game.servers.getCost(game.servers.vm)) + '</b>.';
                        command.optionsDesc[1] = 'IRC servers increase your money multiplier by +<b>' + game.servers.getEffects(game.servers.irc).moneyEffect +
                            '</b>, same for experience multiplier by +<b>' + game.servers.getEffects(game.servers.irc).expEffect + '</b>. Cost $<b>' +
                            fix(game.servers.getCost(game.servers.irc)) + '</b>.';
                    };
                });
            };
        });
    }
};
game.botnet = {
    power: 0,
    
    getPowerMult: function() {
        return 1;
    },
    
    getPower: function() {
        return (game.servers.zombie.owned * 0.1) * game.botnet.getPowerMult();
    }
};
game.console = {
    monokai: false,
    black: false,
    afterglow: false,
    fluoro: false,
    
    getFirstWord: function(str) {
        var gotWhitespace = str.indexOf(' '),
            firstWord = str.substring(0, (gotWhitespace > 0) ? gotWhitespace : str.length);

        return firstWord;
    },
    
    parser: function(str) {
        var str = typeof str !== 'string' ? str = $('#console-input').val() : null,
            firstWord = game.console.getFirstWord(str),
            emptyRegex = /^\s*$/,
            commandIndex = null,
            error = [false, false, false, false, false];
        
        if (emptyRegex.test(str)) {
            error[0] = 1;
            game.console.handler(str, error);
            return;
        };
        
        for (var i = 0; i < game.console.commands.length; i++) {
            var commandRegex = new RegExp(game.console.commands[i].pattern);
            
            if (commandRegex.test(firstWord)) {
                commandIndex = i;
                break;
            };
        };
        
        if (typeof commandIndex !== 'number') {
            error[1] = true;
            game.console.handler(str, error);
            return;
        }
        else {
            var splitted = str.split(' '),
                command = game.console.commands[commandIndex],
                argument = command.pattern.indexOf('[\\w]');
                
            if (splitted.length == 1 && !command.optionsNeeded) {
                error = [false, false, false, false, false];
                $('#console-input').val('');
                eval(command.execute);
            }
            else if (splitted.length == 1 && command.optionsNeeded) {
                error[2] = true;
                game.console.handler(str, error);
                return;
            }
            else if (splitted.length > 1 && !command.optionsNeeded) {
                error[3] = true;
                game.console.handler(str, error);
                return;
            }
            else if (splitted.length > 1 && command.optionsNeeded) {
                var found = false;
                
                command.commands.filter(function(cmd) {
                    if (typeof cmd.options == 'object') {
                        var rightOption;

                        if (cmd.options[0] == 'userinput') {
                            if (cmd.userInputExpected == 'number')
                                rightOption = parseInt(splitted[cmd.optionIndex]);
                        }
                        else {
                            for (var i = 0; i < cmd.options.length; i++)
                                if (splitted[cmd.optionIndex] == cmd.options[i])
                                    rightOption = cmd.options[i];
                        };
                        
                        if (typeof rightOption == 'string' || typeof rightOption == 'number') {
                            var pattern = cmd.pattern,
                                newPattern = pattern.substring(0, pattern.indexOf('[\\w]')) + rightOption + pattern.substring(pattern.indexOf('[\\w]') + 4, pattern.length),
                                newPatternRegex = new RegExp(newPattern);
                            
                            error = [false, false, false, false, false];
                            
                            if (newPatternRegex.test(str)) {
                                found = true;
                                $('#console-input').val('');
                                eval(cmd.execute)(rightOption);
                            };
                            
                            return;
                        };
                    }
                    else {
                        var cmdRegex = new RegExp(cmd.pattern);
                        
                        if (found)
                            return;
                        else if (cmdRegex.test(str)) {
                            error = [false, false, false, false, false];
                            found = true;
                            $('#console-input').val('');
                            eval(cmd.execute);
                        }
                        else if (!found)
                            error[4] = true;
                    };
                });
                
                game.console.handler(str, error);
            };
        };
    },
    
    handler: function(str, error, option) {
        var firstWord = game.console.getFirstWord(str);
        
        switch(error.join('-')) {
            case 'true-false-false-false-false':
                game.console.print('You can\'t send empty commands.', 'error');
                break;
            case 'false-true-false-false-false':
                game.console.print('<b>' + firstWord + '</b> is not reconized as a command.', 'error');
                break;
            case 'false-false-true-false-false':
                game.console.print('<b>' + firstWord + '</b> command need options.', 'error');
                break;
            case 'false-false-false-true-false':
                game.console.print('<b>' + firstWord + '</b> command don\'t need options and/or arguments.', 'error');
                break;
            case 'false-false-false-false-true':
                game.console.print('Unknown option/argument or option/argument missing/not expected here, try <b>' + firstWord + ' -help</b>.', 'error');
                break;
        };
        
        $('#console-input').val('');
    },
    
    print: function(str, type) {
        var rand = Math.floor(Math.random() * 1e6),
            totalHeight = 0;

        $('.text-side > div').each(function() {
            totalHeight += $(this).height();
        });
        
        if (totalHeight >= (460 * 2))
            $('.text-side > div')[0].remove();

        if (game.hack.isHacking)
            $('#hack-progress').before('<div id="text-' + rand + '" class="typed">');
        else
            $('.text-side').append('<div id="text-' + rand + '" class="typed">');
        
        typeof type == 'string' ? $('#text-' + rand).append('<p class="' + type + '">') : $('#text-' + rand).append('<p>');
        
        if (game.options.typedEffect) {
            $('#text-' + rand + ' p').typed({
                strings: [str],
                contentType: 'html',
                typeSpeed: -30,
                callback: function() {
                    $('.typed-cursor').remove();
                    $('.text-side').scrollTop(460 * 2);
                }
            });
        }
        else {
            $('#text-' + rand + ' p').html(str);
            $('.text-side').scrollTop(460 * 2);
        };
    },
    
    detailedHelp: function(Command, subCommand) {
        game.console.commands.filter(function(base) {
            if (base.name !== Command)
                return;
            
            base.commands.filter(function(command) {
                var split = command.readable.split(' ');
                
                if (split.indexOf('-help') > -1)
                    return;
                
                if (typeof command.options == 'object' && typeof subCommand == 'undefined')
                    game.console.print('<b>' + command.readable + '</b>: ' + command.desc);
                else if (typeof command.options == 'object' && typeof subCommand == 'string' && command.readable.indexOf(subCommand) > 0) {
                    for (var i = 0; i < command.options.length; i++) {
                        var cmdParts = command.readable.split(' ');
                        cmdParts[command.optionIndex] = command.options[i];
                        cmdParts = cmdParts.join(' ');
                        game.console.print('<b>' + cmdParts + '</b>: ' + command.optionsDesc[i]);
                    };
                }
                else if (typeof subCommand == 'undefined')
                    game.console.print('<b>' + command.readable + '</b>: ' + command.desc);
            });
        });
    },
    
    help: function() {
        for (var i = 0; i < game.console.commands.length; i++)
            game.console.print('<b>' + game.console.commands[i].name + '</b>: ' + game.console.commands[i].desc);
        
        game.console.print('For more in-depth help about a command, type <b>command -help</b>, it works for commands with options <b>command cmd -help</b> too.');
    },
    
    clear: function() {
        if (game.hack.isHacking || game.virus.doingVirus)
            game.console.print('You can\'t clear console while doing a hack/virus.', 'error');
        else
            $('.text-side').empty();
    },
    
    varInit: function() {
        game.console.commands.filter(function(base) {
            if (base.name == 'help' || !base.optionsNeeded)
                return;
            
            base.commands.push({
                pattern: '^' + base.name + '[\\s]-help$',
                readable: base.name + ' -help',
                desc: 'in-depth help for ' + base.name + ' command.',
                execute: 'game.console.detailedHelp("' + base.name + '")'
            });
            
            base.commands.filter(function(command) {
                if (typeof command.options == 'object') {
                    var firstEspace = command.pattern.indexOf('\\s]') + 3,
                        secondEspace = command.pattern.indexOf('[\\s', firstEspace),
                        subCommand = command.pattern.substring(firstEspace, secondEspace);
                    
                    base.commands.push({
                        pattern: '^' + base.name + '[\\s]' + subCommand + '[\\s]-help$',
                        readable: base.name + ' ' + subCommand + ' -help',
                        desc: 'in-depth help for ' + base.name + ' ' + subCommand + ' command.',
                        execute: 'game.console.detailedHelp("' + base.name + '", "' + subCommand + '")'
                    });
                };
            });
        });
    }
};
game.console.commands = [
{
    name: 'hack',
    desc: 'execute hacks to earn money, gain experience and even reputation.',
    pattern: '^hack$',
    optionsNeeded: true,
    commands: [
    {
        pattern: '^hack[\\s]place[\\s][\\w]$',
        readable: 'hack place (option)',
        desc: 'hack a specified place to earn money, experience and reputation.',
        execute: 'game.hack.place',
        options: [
            'grocery',
            'business',
            'market',
            'bank',
            'jewelry',
            'facebook',
            'apple',
            'google'
        ],
        optionsDesc: [
            game.hack.placeDesc('grocery'),
            game.hack.placeDesc('business'),
            game.hack.placeDesc('market'),
            game.hack.placeDesc('bank'),
            game.hack.placeDesc('jewelry'),
            game.hack.placeDesc('facebook'),
            game.hack.placeDesc('apple'),
            game.hack.placeDesc('google')
        ],
        optionIndex: 2
    }, {
        pattern: '^hack[\\s]place[\\s]cancel$',
        readable: 'hack place cancel',
        desc: 'cancel your current hack.',
        execute: 'game.hack.cancel()'
    }, {
        pattern: '^hack[\\s]basic$',
        readable: 'hack basic',
        desc: 'execute a simple hack, a quick way to gain a small amount of money and exp.',
        execute: 'game.hack.basic()'
    }]
}, {
    name: 'virus',
    desc: 'create virus, if they works well they will infect computers and transform them into zombie computers, for your needs.',
    pattern: '^virus$',
    optionsNeeded: true,
    commands: [
    {
        pattern: '^virus[\\s]create[\\s][\\w]$',
        readable: 'virus create (option)',
        desc: 'create a virus, it has a percent to fail and take some time to make.',
        execute: 'game.virus.create',
        options: [
            'boza',
            'happy99',
            'memz',
            'faggot',
            'magistr'
        ],
        optionsDesc: [
            game.virus.virusDesc('boza'),
            game.virus.virusDesc('happy99'),
            game.virus.virusDesc('memz'),
            game.virus.virusDesc('faggot'),
            game.virus.virusDesc('magistr')
        ],
        optionIndex: 2
    }, {
        pattern: '^virus[\\s]create[\\s]cancel$',
        readable: 'virus create cancel',
        desc: 'cancel your current virus.',
        execute: 'game.virus.cancel()'
    }]
}, {
    name: 'buy',
    desc: 'buy stuff to earn more money and experience.',
    pattern: '^buy$',
    optionsNeeded: true,
    commands: [{
        id: 0,
        pattern: '^buy[\\s]server[\\s][\\w]$',
        readable: 'buy server (option)',
        desc: 'buy different types of servers to buff your multipliers.',
        execute: 'game.servers.buy',
        options: ['vm', 'irc', 'zombie'],
        optionIndex: 2,
        optionsDesc: [
            'VM servers decrease time required to hack a place by <b>1%</b>.' + ' Cost $<b>' + fix(game.servers.getCost(game.servers.vm)) + '</b>.',
            'IRC servers increase your money multiplier by +<b>' + game.servers.getEffects(game.servers.irc).moneyEffect + '</b>, same for experience multiplier by +<b>' + game.servers.getEffects(game.servers.irc).expEffect + '</b>. Cost $<b>' + fix(game.servers.getCost(game.servers.irc)) + '</b>.',
            'Zombie servers increase your botnet power by +<b>0.1</b>, you get them when creating virus and infecting computers.'
        ]
    }, {
        id: 1,
        pattern: '^buy[\\s]hacker[\\s][\\w]$',
        readable: 'buy hacker (option)',
        desc: 'hire an hacker to auto-hack his specified place.',
        execute: 'game.hack.buyHacker',
        options: [
            'grocer',
            'business_man',
            'cashier',
            'banker',
            'jeweler',
            'mark',
            'steve',
            'larry'
        ],
        optionIndex: 2,
        optionsDesc: [
            game.hack.hackerDesc('grocer'),
            game.hack.hackerDesc('business_man'),
            game.hack.hackerDesc('cashier'),
            game.hack.hackerDesc('banker'),
            game.hack.hackerDesc('jeweler'),
            game.hack.hackerDesc('mark'),
            game.hack.hackerDesc('steve'),
            game.hack.hackerDesc('larry')
        ]
    }, {
        id: 2,
        pattern: '^buy[\\s]theme[\\s][\\w]$',
        readable: 'buy theme (option)',
        desc: 'buy terminal theme with kreds (Kongregate money).',
        execute: 'game.kongregate.buyMtx',
        options: ['black_theme', 'monokai_theme', 'afterglow_theme', 'fluoro_theme'],
        optionIndex: 2,
        optionsDesc: [
            'buy the black and white theme with a blue accentuation color for the terminal, cost <b>50 Kreds</b>.',
            'buy the monokai theme (light blue background and text, pink and green accentuation color), cost <b>50 Kreds</b>.',
            'buy the afterglow theme (light pink background, light orange text, pink and red accentuation colors), cost <b>50 Kreds</b>.',
            'buy the fluoro theme (dark purple background, heavy pink text with green and orange accentuation colors), cost <b>50 Kreds</b>.'
        ]
    }, {
        id: 3,
        pattern: '^buy[\\s]ad_mult$',
        readable: 'buy ad_mult',
        desc: 'add +1 to the ads multiplier (available on the Kongregate version), cost 10 Kreds.',
        execute: 'game.kongregate.buyMtx("ad_mult")'
    }, {
        id: 4,
        pattern: '^buy[\\s]ad_mult[\\s]x5$',
        readable: 'buy ad_mult x5',
        desc: 'add +5 to the ads multiplier (available on the Kongregate version), cost 35 Kreds.',
        execute: 'game.kongregate.buyMtx("ad_mult_x5")'
    }]
}, {
    name: 'option',
    desc: 'change in-game options.',
    pattern: '^option$',
    optionsNeeded: true,
    commands: [{
        pattern: '^option[\\s]background[\\s][\\w]$',
        readable: 'option background (option)',
        desc: 'enable/disable matrix background effect (can reduce lag).',
        execute: 'game.options.toggleBackground',
        options: ['enable', 'disable'],
        optionIndex: 2,
        optionsDesc: [
            'enable matrix background effect.',
            'disable matrix background effect (can reduce lag).'
        ]
    }, {
        pattern: '^option[\\s]blackbars[\\s][\\w]$',
        readable: 'option blackbars (option)',
        desc: 'enable/disable blackbars effect on the terminal.',
        execute: 'game.options.toggleBlackbars',
        options: ['enable', 'disable'],
        optionIndex: 2,
        optionsDesc: [
            'enable blackbars visual effect on the terminal.',
            'disable blackbars visual effect on the terminal.'
        ]
    }, {
        pattern: '^option[\\s]typed[\\s][\\w]$',
        readable: 'option typed (option)',
        desc: 'enable/disable typing text effect (can reduce lag).',
        execute: 'game.options.toggleTyped',
        options: ['enable', 'disable'],
        optionIndex: 2,
        optionsDesc: [
            'enable typing text effect.',
            'disable typing text effect (can reduce lag).'
        ]
    }, {
        pattern: '^option[\\s]fps[\\s][\\w]$',
        readable: 'option fps (option)',
        desc: 'change fps of the game (default is 30).',
        execute: 'game.options.setFps',
        options: ['userinput'],
        userInputExpected: 'number',
        optionIndex: 2,
        optionsDesc: ['set your own amount of fps desired (low value can reduce lag).']
    }, {
        pattern: '^option[\\s]view[\\s][\\w]$',
        readable: 'option view (option)',
        desc: 'change displayed stats under the terminal.',
        execute: 'game.options.changeStats',
        options: ['default', 'servers', 'botnet'],
        optionIndex: 2,
        optionsDesc: [
            'default stats view.',
            'servers stats view.',
            'botnet stats view.'
        ]
    }, {
        pattern: '^option[\\s]theme[\\s][\\w]$',
        readable: 'option theme (option)',
        desc: 'change the theme of the console.',
        execute: 'game.options.changeTheme',
        options: ['default', 'black', 'monokai', 'afterglow', 'fluoro'],
        optionIndex: 2,
        optionsDesc: [
            'The default SkidInc console theme, green and black.',
            'Black and white theme, like in the 90s.',
            'Monokai theme, based on the original and famous Monokai color scheme.',
            'Afterglow theme, based on the original afterglow color scheme.',
            'Fluoro theme, high in pink.'
        ]
    }, {
        pattern: '^option[\\s]savegame[\\s][\\w]$',
        readable: 'option savegame (option)',
        desc: 'save, load or reset your current game progression.',
        execute: 'game.save.consoleHandler',
        options: ['save', 'load', 'hardreset', 'export', 'import'],
        optionIndex: 2,
        optionsDesc: [
            'Save your current game state in your browser.',
            'Load your save from your browser.',
            'Start from scratch, reset everything.',
            'Export your save code.',
            'Import your save code.'
        ]
    }, {
        pattern: '^option[\\s]code[\\s][\\w]$',
        readable: 'option code (option)',
        desc: 'redeem a code to earn some bonuses.',
        execute: 'game.options.redeemCode',
        options: ['userinput'],
        userInputExpected: 'number',
        optionIndex: 2,
        optionsDesc: ['check skidinc twitter account for codes.']
    }]
}, {
    name: 'clear',
    desc: 'clear console logs.',
    pattern: '^clear$',
    optionsNeeded: false,
    execute: 'game.console.clear()'
}, {
    name: 'help',
    desc: 'show a list of available commands.',
    pattern: '^help$',
    optionsNeeded: false,
    execute: 'game.console.help()'
}, {
    name: 'watch',
    desc: 'watch an ad to increase your ads bonus multiplier for 6h (only on Kongregate).',
    pattern: '^watch$',
    optionsNeeded: false,
    execute: 'game.kongregate.watch()'
}];
game.options = {
	typedEffect: false,
	background: false,
	view: 'default',

	toggleBackground: function(toggle) {
		if (toggle == 'enable') {
			game.options.background = true;
			$('.matrix-effect').fadeIn('slow');
		}
		else {
			game.options.background = false;
			$('.matrix-effect').fadeOut('slow');
		};
	},
	
	toggleBlackbars: function(toggle) {
		toggle == 'enable' ? $('.screen').removeClass('no-blackbars') : $('.screen').addClass('no-blackbars');
	},

	toggleTyped: function(toggle) {
		toggle == 'enable' ? game.options.typedEffect = true : game.options.typedEffect = false;
		game.console.print('Typed effect <b>' + toggle + '</b>.');
	},

	setFps: function(num) {
		if (num > 60)
			game.console.print('You can\'t put a value greater than <b>60 fps</b>.', 'error');
		else if (num < 1)
			game.console.print('You can\'t put a value lower than <b>1 fps</b>.', 'error');
		else {
			game.fps = num;
			game.interval = 1000 / game.fps;
			
			clearInterval(game.intervals.core);

			game.intervals.core = setInterval(function() {
				game.core();
			}, game.interval);
			
			game.console.print('FPS set to <b>' + num + '</b>. If the game lag, try to reduce fps.');
		};
	},
	
	changeStats: function(view) {
		var col1 = $('#col-1 > p'),
			col2 = $('#col-2 > p'),
			col3 = $('#col-3 > p');
		
		switch (view) {
			case 'default':
				$(col1[0]).attr('id', 'stats-money').html('');
				$(col1[1]).attr('id', 'stats-level').html('');
				$(col1[2]).attr('id', 'stats-exp').html('');
				$(col2[0]).attr('id', 'stats-timemult').html('');
				$(col2[1]).attr('id', 'stats-moneymult').html('');
				$(col2[2]).attr('id', 'stats-expmult').html('');
				$(col3[0]).attr('id', 'stats-reputation').html('');
				$(col3[1]).attr('id', 'stats-totalmoney').html('');
				$(col3[2]).attr('id', 'stats-prestigied').html('');
				break;
			
			case 'servers':
				$(col1[0]).attr('id', 'stats-money').html('');
				$(col1[1]).attr('id', 'stats-level').html('');
				$(col1[2]).attr('id', 'stats-moneymult').html('');
				$(col2[0]).attr('id', 'stats-irccost').html('');
				$(col2[1]).attr('id', 'stats-vmcost').html('');
				$(col2[2]).attr('id', 'stats-expmult').html('');
				$(col3[0]).attr('id', 'stats-ircowned').html('');
				$(col3[1]).attr('id', 'stats-vmowned').html('');
				$(col3[2]).attr('id', 'stats-timemult').html('');
				break;
			
			case 'botnet':
				$(col1[0]).attr('id', 'stats-money').html('');
				$(col1[1]).attr('id', 'stats-exp').html('');
				$(col1[2]).attr('id', 'stats-level').html('');
				$(col2[0]).attr('id', 'stats-infectionspersec').html('');
				$(col2[1]).attr('id', 'stats-zombieowned').html('');
				$(col2[2]).attr('id', '').html('');
				$(col3[0]).attr('id', 'stats-botnetpower').html('');
				$(col3[1]).attr('id', 'stats-powermult').html('');
				$(col3[2]).attr('id', '').html('');
				break;
		};
		
		game.options.view = view;
		game.console.print('Stats view switched to <b>' + view + '</b>.');
	},
	
	changeTheme: function(what) {
		switch (what) {
			case 'default':
				$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top');
				$('.console').attr('class', 'console');
				break;
			
			case 'black':
				if (game.console.black) {
					$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top dark');
					$('.console').attr('class', 'console dark');
				}
				else
					game.console.print('This theme is locked, you need to buy it.', 'error');
				break;
			
			case 'monokai':
				if (game.console.monokai) {
					$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top monokai');
					$('.console').attr('class', 'console monokai');
				}
				else
					game.console.print('This theme is locked, you need to buy it.', 'error');
				break;
			
			case 'afterglow':
				if (game.console.afterglow) {
					$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top afterglow');
					$('.console').attr('class', 'console afterglow');
				}
				else
					game.console.print('This theme is locked, you need to buy it.', 'error');
				break;
			
			case 'fluoro':
				if (game.console.afterglow) {
					$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top fluoro');
					$('.console').attr('class', 'console fluoro');
				}
				else
					game.console.print('This theme is locked, you need to buy it.', 'error');
				break;
		};
	},
	
	redeemCode: function(code) {
		var time = new Date().getTime();
		
		switch(code) {
			case 1337:
				var limit = new Date(2016,12,25).getTime();
				
				if (time < limit) {
					game.console.print('TODO');
				};
				break;
		};
	}
};
game.save = {
    salt: 'U2tpZEluYw==',
    interval: 60e3,
    toSave: [
        'game.before',
        'game.fps',
        'game.version',
        
        'game.player.money',
        'game.player.totalMoney',
        'game.player.reputation',
        'game.player.level',
        'game.player.exp',
        'game.player.expReq',
        
        'game.console.monokai',
        'game.console.black',
        'game.console.afterglow',
        'game.console.fluoro',
        
        'game.options.typedEffect',
        'game.options.background',
        
        'game.servers.vm.owned',
        'game.servers.irc.owned',
        'game.servers.zombie.owned',
        
        'game.virus.list.boza.send',
        'game.virus.list.happy99.send',
        'game.virus.list.memz.send',
        'game.virus.list.faggot.send',
        'game.virus.list.magistr.send',
        
        'game.hack.hackers.grocer.owned',
        'game.hack.hackers.business_man.owned',
        'game.hack.hackers.cashier.owned',
        'game.hack.hackers.banker.owned',
        'game.hack.hackers.jeweler.owned',
        'game.hack.hackers.mark.owned',
        'game.hack.hackers.steve.owned',
        'game.hack.hackers.larry.owned',
        
        'game.hack.hackers.grocer.progress',
        'game.hack.hackers.business_man.progress',
        'game.hack.hackers.cashier.progress',
        'game.hack.hackers.banker.progress',
        'game.hack.hackers.jeweler.progress',
        'game.hack.hackers.mark.progress',
        'game.hack.hackers.steve.progress',
        'game.hack.hackers.larry.progress',
        
        'game.botnet.power',
        
        'game.kongregate.boughtMults'
    ],
    
    consoleHandler: function(what) {
        if (what == 'save')
            return game.save.save('user');
        else if (what == 'load')
            return game.save.load();
        else if (what == 'hardreset')
            return game.save.reset();
        else if (what == 'export')
            return game.save.export();
        else if (what == 'import')
            return game.save.import();
    },
    
    export: function() {
        if (localStorage.getItem('SkidInc' + game.save.salt) === null) {
            game.console.print('There is no save.', 'error');
            return;
        };
        
        game.save.save();
        
        var saveEncrypted = localStorage.getItem(('SkidInc' + game.save.salt));
        
        prompt('Here is your save code, keep it in a safe place! Use ctrl+a and ctrl+c to copy it.', saveEncrypted);
    },
    
    import: function() {
        var save = prompt('Put your save code, it will be loaded.');
        
        if (typeof save == 'string') {
            var saveDecrypted = JSON.parse(atob(save));
            
            for (var i = 0; i < game.save.toSave.length; i++) {
                if (typeof saveDecrypted[i] == 'undefined' || saveDecrypted[i].name !== game.save.toSave[i])
                    return;
                
                var path = game.save.toSave[i].split('.'),
                    str = 'game';
                
                path.shift();
                
                for (var e = 0; e < path.length; e++)
                    str += '["' + path[e] + '"]';
                
                eval(str + "=" + saveDecrypted[i].value);
            };
            
            game.console.print('Save successfully loaded.', 'success');
        };
    },
    
    save: function(calledFrom) {
        var save = '',
            values = [];
        
        for (var i = 0; i < game.save.toSave.length; i++) {
            var item = {
                name: game.save.toSave[i],
                value: eval(game.save.toSave[i])
            };
            
            values.push(item);
        };
        
        save = btoa(JSON.stringify(values));
        localStorage.setItem(('SkidInc' + game.save.salt), save);
        
        if (calledFrom == 'user')
            game.console.print('Save-game successfully saved.', 'success');
    },
    
    load: function(from) {
        if (localStorage.getItem('SkidInc' + game.save.salt) === null)
            return;
        
        var saveLoaded = localStorage.getItem(('SkidInc' + game.save.salt)),
            saveDecrypted = JSON.parse(atob(saveLoaded));
        
        for (var i = 0; i < game.save.toSave.length; i++) {
            if (typeof saveDecrypted[i] == 'undefined' || saveDecrypted[i].name !== game.save.toSave[i])
                return;
            
            var path = game.save.toSave[i].split('.'),
                lastItemPath = path[path.length - 1],
                str = 'game';
            
            path.shift();
            
            for (var e = 0; e < path.length; e++)
                str += '["' + path[e] + '"]';
            
            eval(str + "=" + saveDecrypted[i].value);
        };
    },
    
    reset: function() {
        var conf = confirm('Do you really want to do a hard-reset? You\'ll start from the beginning with nothing.');
        
        if (conf) {
            var intervalID = game.intervals.save;
            
            window.onbeforeunload = null;
            clearInterval(intervalID);
            localStorage.removeItem('SkidInc' + game.save.salt);
            location.reload();
        };
    }
};