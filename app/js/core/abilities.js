game.abilities = {
    list: {
        'up_key': {
            name: 'up_key',
            desc: 'press your up-key to type the latest command entered.',
            cost: 1e6,
            reqLevel: 20,
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
            for (var ability in game.abilities.list) {
                var thisAbility = game.abilities.list[ability];
                
                game.console.print('help', '<b>' + thisAbility.name + '</b>: cost $' + fix(thisAbility.cost) + ', owned: ' + thisAbility.owned + '. Effect: ' + thisAbility.desc);
            };
            
            return;
        };
    }
};