game.upgrade = function(from, option) {
    // if (from == 'sp') {
    //     game.console.print('error', game.console.errors.upgradeNoArgs);
        
    //     return;
    // };
    
    // if (from == 'help') {
    //     game.console.print('help', game.console.help.upgrade);
        
    //     return;
    // };
    
    // if (from == 'info') {
    //     var types = ['personal', 'professional'],
    //         costs = [
    //             Math.floor(10000 * Math.pow(game.servers.personal.upInflation, game.servers.personal.level)),
    //             Math.floor(1e6 * Math.pow(game.servers.professional.upInflation, game.servers.professional.level))
    //         ],
    //         addMults = [
    //             1 + game.servers.personal.multAdd * game.servers.personal.level,
    //             1 + game.servers.professional.multAdd * game.servers.professional.level
    //         ];
        
    //     game.console.print('log', 'Upgrade servers infos:');
        
    //     for (var i = 0; i < types.length; i++)
    //         game.console.print('log', '<b>' + types[i] + '</b>: current upgrade level ' + game.servers[types[i]].level + ', additionnal mult: x' + fix(addMults[i], 2) + ', cost $' + fix(costs[i]) + '.');

    //     return;
    // };
    
    // if (from == 'server') {
    //     var cost = undefined;
        
    //     if (option == 'personal')
    //         cost = Math.floor(10000 * Math.pow(game.servers.personal.upInflation, game.servers.personal.level));
    //     else if (option == 'professional')
    //         cost = Math.floor(1e6 * Math.pow(game.servers.professional.upInflation, game.servers.professional.level));
        
    //     console.log(cost)
        
    //     if (game.player.money >= cost) {
    //         game.player.money -= cost;
    //         game.servers[option].level++;
    //         game.servers[option].mult += game.servers[option].multAdd;
            
    //         game.console.print('gain', 'You successfully upgraded your ' + option + ' server for $' + fix(cost) + '.');
    //     }
    //     else
    //         game.console.print('error', 'Not enough money, cost $' + fix(cost) + '.');
        
    //     return;
    // };
};