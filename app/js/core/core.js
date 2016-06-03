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
        if (game.player.isHacking) {
            var thisPlace = game.console.cmds.hack.places[game.player.hackingWhat],
                time = game.getPlaceTime(thisPlace),
                fps = game.options.fps,
                barStatus = '|',
                maxBar = 50,
                filled = Math.floor(game.player.hackingProgress / time * maxBar),
                left = Math.ceil(maxBar - filled),
                percent = Math.floor(game.player.hackingProgress / time * 100),
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
                
                moneyReward *= globalMoneyMult;
                expReward *= globalExpMult;
                
                game.earnMoney(moneyReward);
                game.earnExp(expReward);
                game.player.timesPlacesHacked++;
                
                game.console.print('gain', cap(thisPlace.name) + ' hack finished: you earned $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.');
            };
        };
    },
    
    display: function() {
        $('#well-resources').html(
            'Money: $' + fix(game.player.money) + '<br>' +
            'Level: ' + fix(game.player.level, 0) + '<br>' +
            'Exp: ' + fix(game.player.exp) + '/' + fix(game.player.maxExp, 0) + '<br>' +
            '<br>' +
            'Money mult: x' + fix(game.getGlobalMoneyMult(), 2) + '<br>' +
            'Exp. mult: x' + fix(game.getGlobalExpMult(), 2) + '<br>' +
            '<br>' +
            'Pers. servers: ' + fix(game.servers.personal.owned, 0) + '<br>' +
            'Pro. servers: ' + fix(game.servers.professional.owned, 0) + '<br>' +
            'VM servers: ' + fix(game.servers.vm.owned, 0) + '<br>' +
            'QuickHack servers: ' + fix(game.servers.quickhack.owned, 0)
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
    
    varInit: function(callback) {
        game.options.interval = (1000 / game.options.fps);
        
        game.options.intervals.loop = setInterval(game.loop, game.options.interval);
        game.options.intervals.achievements = setInterval(game.achievements.check, 1000);
        game.options.intervals.save = setInterval(game.save.save, 1000);
        
        game.achievements.varInit();
        game.sounds.varInit();
        game.save.varInit();
        
        console.info('Var init finished.');
    },
    
    domInit: function() {
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
        
        $('#options-background').on('click', function() {
            console.warn('TODO')
        });
        
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
		
		$('#console-input').bind('cut paste', function(e) {
			e.preventDefault();
		});
		
        $('html').bind('contextmenu', function(e) {
            e.preventDefault();
            return false;
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