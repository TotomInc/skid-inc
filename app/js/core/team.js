game.team = {
    list: {
        'mini-market': {
            name: 'mini-market-hacker',
            effect: 'mini-market',
            price: 10000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'market': {
            name: 'market-hacker',
            effect: 'market',
            price: 75000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'jewelry': {
            name: 'jewelry-hacker',
            effect: 'jewelry',
            price: 600000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'bank': {
            name: 'bank-hacker',
            effect: 'bank',
            price: 1000000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'trading-center': {
            name: 'trading-hacker',
            effect: 'trading-center',
            price: 12500000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'anonymous-hideout': {
            name: 'anonymous-hacker',
            effect: 'anonymous-hideout',
            price: 37500000,
            owned: false,
            progress: 0,
            done: 0
        },
        
        'deepweb': {
            name: 'deepweb-hacker',
            effect: 'deepweb',
            price: 250000000,
            owned: false,
            progress: 0,
            done: 0
        }
    },
    
    buy: function(who) {
        var thisHacker = game.team.list[who];
        
        if (game.player.money >= thisHacker.price && !thisHacker.owned) {
            game.player.money -= thisHacker.price;
            thisHacker.owned = true;
            
            game.console.print('log', 'You successfully engaged a <b>' + thisHacker.name + '</b> working for the ' + thisHacker.effect + ' hack.');
        };
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