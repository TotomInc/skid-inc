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
};