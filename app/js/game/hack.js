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
            game.console.print('You already hired this hacker.', 'error');
        if (game.player.money < Hacker.price)
            game.console.print('You don\'t have enough money to hire this hacker.', 'error');
        if (game.hack.currentHack.name == Hacker.placeName)
            game.console.print('You are currently hacking the place that the hacker should hack, hire him when hack is finished.', 'error');
        else {
            Hacker.owned = true;
            game.player.money -= Hacker.price;
            game.console.print('You successfully hired <b>' + Hacker.name + '</b> hacker.');
        };
    },
    
    hackerDesc: function(what) {
        var Hacker = game.hack.hackers[what];
        return Hacker.name + ' hacker will hack <b>' + Hacker.placeName + '</b>, hire him for $<b>' + fix(Hacker.price) + '</b>.';
    },
    
    placeDesc: function(what) {
        var Place = game.hack.places[what];
        return Place.readable + ', level >= <b>' + Place.levelReq + '</b>; <b>' + fix(game.hack.getTime(Place), 0) + '</b> sec; <b>≈ +$' + fix(game.hack.getMoney(Place), 0) + '</b>; <b>≈ +' + fix(game.hack.getExp(Place), 0) + '</b> exp.';
    },
    
    place: function(what) {
        var Place = game.hack.places[what];
        
        if (!game.hack.isHacking && game.player.level >= Place.levelReq) {
            game.hack.isHacking = true;
            game.hack.currentHack = Place;
            $('.text-side').append('<p id="hack-progress">');
            game.console.print('Starting ' + Place.name + ' hack...');
        }
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
    	        bar += '| <b>' + fix(percent, 0) + '%</b>, <b>' + fix(timeLeft, 2) + '</b> s.';

    	        $('#hack-progress').html(bar);
    	    }
    	    else if (game.hack.hackProgress >= time) {
    	        var money = game.hack.getMoney(game.hack.currentHack),
    	            exp = game.hack.getExp(game.hack.currentHack);

    	        for (var j = 0; j < 35; j++)
    	            bar += '#';

    	        bar += '| 100%, 0.00s';

    	        game.console.print(cap(game.hack.currentHack.readable) + ' hack finished: +$<b>' + fix(money) + '</b>, +<b>' + fix(exp) + '</b> exp.');
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
                
                if (Hacker.progress >= time) {
                    var money = game.hack.getMoney(Place),
                        reputation = game.hack.getReputation(Place),
                        exp = game.hack.getExp(Place);
                    
                    game.player.earnMoney(money);
                    game.player.earnExp(exp);
                    game.player.earnReputation(reputation);
                    
                    Hacker.progress = 0;
                };
            };
        };
    }
};