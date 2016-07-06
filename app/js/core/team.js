game.team = {
    list: {
        'mini_market': {
            name: 'mini_market',
            effect: 'mini_market',
            price: 2000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 2
        },
        
        'market': {
            name: 'market',
            effect: 'market',
            price: 25000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 10
        },
        
        'jewelry': {
            name: 'jewelry',
            effect: 'jewelry',
            price: 600000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 20
        },
        
        'bank': {
            name: 'bank',
            effect: 'bank',
            price: 1000000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 30
        },
        
        'trading_center': {
            name: 'trading_center',
            effect: 'trading_center',
            price: 12500000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 40
        },
        
        'anonymous_hideout': {
            name: 'anonymous_hideout',
            effect: 'anonymous_hideout',
            price: 37500000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 50
        },
        
        'deepweb': {
            name: 'deepweb',
            effect: 'deepweb',
            price: 250000000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 50
        }
    },
    
    exec: function(from, option) {
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
                    thisPlace = game.console.cmds[0].places[thisHacker.effect],
                    time = game.getPlaceTime(thisPlace);
                
                if (thisHacker.owned)
                    game.console.print('log', '<b>' + thisHacker.name + '</b>: hack ' + thisHacker.effect + ', current progress at ' + fix(thisHacker.progress, 2) + '/' + fix(time, 2) + ' sec, engaged: ' + thisHacker.owned);
            };
            
            return;
        };
    }
};