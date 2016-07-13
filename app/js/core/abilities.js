game.abilities = {
    list: {
        'up_key': {
            name: 'up_key',
            desc: 'Press your up-key to type the latest command entered. Ability got a small cooldown (500 ms).',
            cost: 1e6,
            reqLevel: 10,
            owned: false
        }
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
            var i = 0;
            
            for (var ability in game.abilities.list) {
                var thisAbility = game.abilities.list[ability],
                    logType = (i == 0 ? 'help' : 'nothing');
                
                game.console.print(logType, '<b>' + thisAbility.name + '</b>: cost $' + fix(thisAbility.cost) + ', owned: ' + thisAbility.owned + '. ' + thisAbility.desc);

                i++;
            };
            
            return;
        };
    }
};