game.upgrade = function(from) {
    if (from == 'sp') {
        game.console.print('errors', game.console.errors.upgradeNoArgs);
        
        return;
    };
    
    if (from == 'help') {
        game.console.print('help', game.console.help.upgrade);
        
        return;
    };
    
    if (from == 'info') {
        var types = ['personal', 'professional'],
            costs = [
                Math.floor(10000 * Math.pow(1.15, game.servers.personal.level)),
                Math.floor(1e6 * Math.pow(1.15, game.servers.professional.level))
            ],
            addMults = [
                1 + game.servers.personal.multAdd * game.servers.personal.level,
                1 + game.servers.professional.multAdd * game.servers.professional.level
            ];
        
        game.console.print('log', 'Upgrade servers infos:');
        
        for (var i = 0; i < types.length; i++)
            game.console.print('log', '<b>' + types[i] + '</b>: current upgrade level ' + game.servers[types[i]].level + ', additionnal mult: x' + fix(addMults[i], 2) + ', cost $' + fix(costs[i]) + '.');

        return;
    };
    
    if (from == 'personal') {
        var cost = Math.floor(10000 * Math.pow(game.servers.personal.upInflation, game.servers.personal.level));
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.personal.level++;
            game.servers.personal.mult += game.servers.personal.multAdd;
            
            var newCost = Math.floor(10000 * Math.pow(game.servers.personal.upInflation, game.servers.personal.level));
            
            game.console.print('log', 'You successfully upgraded your personal server. Next one cost: $' + fix(newCost));
        }
        else
            game.console.print('error', 'Not enough money to upgrade this server.');
        
        return;
    };
    
    if (from == 'professional') {
        var cost = Math.floor(1e6 * Math.pow(game.servers.professional.upInflation, game.servers.professional.level));
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.professional.level++;
            game.servers.professional.mult += game.servers.professional.multAdd;
            
            var newCost = Math.floor(100000 * Math.pow(game.servers.professional.upInflation, game.servers.professional.level));
            
            game.console.print('log', 'You successfully upgraded your professional server. Next one cost: $' + fix(newCost));
        }
        else
            game.console.print('error', 'Not enough money to upgrade this server.');
        
        return;
    };
};