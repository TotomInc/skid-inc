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
        
        console.log(thisAbility)
        console.log(game.player.money >= thisAbility.cost)
        console.log(!thisAbility.owned)
        console.log(game.player.level >= thisAbility.reqLevel)
        
        if (game.player.money >= thisAbility.cost && !thisAbility.owned && game.player.level >= thisAbility.reqLevel) {
            game.player.money -= thisAbility.cost;
            thisAbility.owned = true;
            
            game.console.print('log', 'You successfully bought the ' + thisAbility.name + ' ability.');
        }
        else if (game.player.level < thisAbility.reqLevel)
            game.console.print('error', 'You don\'t have the required level to buy this ability.');
        else if (game.player.money < thisAbility.price)
            game.console.print('error', 'Not enough money to buy this ability!');
        else if (thisAbility.owned)
            game.console.print('error', 'You already own this ability.');
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