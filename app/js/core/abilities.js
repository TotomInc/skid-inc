game.abilities = {
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
        
        if (game.player.money >= thisAbility.price && !thisAbility.owned) {
            game.player.money -= thisAbility.price;
            thisAbility.owned = true;
            
            game.console.print('log', 'You successfully bought the ' + thisAbility.name + ' ability.');
        };
    },
    
    exec: function(from) {
        if (from == 'sp') {
            game.console.print('error', game.console.errors.abilityNoArgs);
            
            return;
        };
        
        if (from == 'help') {
            game.console.print('help', game.console.help.ability);
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