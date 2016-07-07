game.team = {
    list: {
        'noob': {
            name: 'noob',
            effect: 'mini_market',
            price: 2000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 5
        },
        
        'script_kiddie': {
            name: 'script_kiddie',
            effect: 'market',
            price: 25000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 15
        },
        
        'coder': {
            name: 'coder',
            effect: 'jewelry',
            price: 600000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 25
        },
        
        'hax0r': {
            name: 'hax0r',
            effect: 'bank',
            price: 1000000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 35
        },
        
        'prodigy': {
            name: 'prodigy',
            effect: 'trading_center',
            price: 12500000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 45
        },
        
        'elite_hacker': {
            name: 'elite_hacker',
            effect: 'anonymous_hideout',
            price: 37500000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 55
        },
        
        'elite_skid': {
            name: 'elite_skid',
            effect: 'deepweb',
            price: 250000000,
            owned: false,
            progress: 0,
            done: 0,
            levelReq: 65
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
            var i = 0;
            
            for (var hacker in game.team.list) {
                var thisHacker = game.team.list[hacker],
                    thisPlace = game.console.cmds[0].places[thisHacker.effect],
                    time = game.getPlaceTime(thisPlace),
                    logType = (i == 0 ? 'log' : 'nothing');
                
                if (thisHacker.owned)
                    game.console.print(logType, '<b>' + thisHacker.name + '</b>: hack ' + thisHacker.effect + ', current progress at ' + fix(thisHacker.progress, 2) + '/' + fix(time, 2) + ' sec, engaged: ' + thisHacker.owned);

                i++;
            };
            
            return;
        };
        
        if (from == "pause") {
            console.log(option)
            
            return;
        };
    }
};