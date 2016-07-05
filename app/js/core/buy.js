game.buy = function(from, option) {
    if (from == "sp") {
        game.console.print('error', game.console.errors.buyNoArgs);
        
        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.buy);
        
        return;
    };
    
    if (from == "info") {
        var persReward = game.servers.getPersReward(),
            persCost = game.servers.getPersCost(),
            proReward = game.servers.getProReward(),
            proCost = game.servers.getProCost(),
            VMReward = game.servers.getVMReward(),
            VMCost = game.servers.getVMCost(),
            quickCost = game.servers.getQuickhackCost(),
            clickDivider = game.servers.getClickDivider();
        
        game.console.print('log', '<b>Servers infos</b>:<br>' +
            '<b>Personal servers</b>: ' + fix(game.servers.personal.owned, 0) + ', money multiplier: x' + fix(persReward, 2) + ', next cost: $' + fix(persCost) + '<br>' +
            '<b>Professional servers</b>: ' + fix(game.servers.professional.owned, 0) + ', money multiplier: x' + fix(proReward.money, 2) + ', experience reward: x' + fix(proReward.exp, 2) + ', next cost: $' + fix(proCost) + '<br>' +
            '<b>Virtual machines (VM) servers</b>: ' + fix(game.servers.vm.owned, 0) + ', place hack time divider: /' + fix(VMReward, 2) + ', next cost: $' + fix(VMCost, 2) + '<br>' +
            '<b>Quickhack servers</b>: ' + fix(game.servers.quickhack.owned, 0) + ', click divider: /' + fix(clickDivider, 0) + ', next cost: $' + fix(quickCost));
        
        return;
    };

    if (from == 'server') {
        var cost = undefined;
        
        if (option == 'personal')
            cost = game.servers.getPersCost();
        else if (option == 'professional')
            cost = game.servers.getProCost();
        else if (option == 'vm')
            cost = game.servers.getVMCost();
        else if (option == 'quickhack' && game.servers.quickhack.owned < 5)
            cost = game.servers.getQuickhackCost();
        else
            return;
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers[option].owned++;
            
            game.console.print('gain', 'You successfully bought a ' + option + ' server for $' + fix(cost) + '.');
        }
        else
            game.console.print('error', 'Not enough money, cost $' + fix(cost) + '.');
        
        return;
    };
    
    if (from == "server-help") {
        game.console.print('help', game.console.help.buyServer);
        
        return;
    };
    
    if (from == 'hacker') {
        var thisHacker = game.team.list[option],
            cost = game.team.list[option].price;
        
        if (game.player.money >= cost && game.player.level >= thisHacker.levelReq && !thisHacker.owned) {
            game.player.money -= cost
            thisHacker.owned = true;
            
            game.console.print('gain', 'You successfully hired ' + thisHacker.effect + ' hacker for $' + fix(cost) + '.');
        }
        else if (thisHacker.owned)
            game.console.print('error', 'You already own this hacker!');
        else if (game.player.level < thisHacker.levelReq)
            game.console.print('error', 'You don\'t have the requried level to buy this hacker (lvl. ' + thisHacker.levelReq + ').');
        else if (game.player.money < cost)
            game.console.print('error', 'Not enough money, cost $' + fix(cost) + '.');
        
        return;
    };
    
    if (from == "hacker-help") {
        game.console.print('help', game.console.help.buyHacker);
        
        return;
    };
    
    if (from == "hacker-list") {
        for (var hacker in game.team.list)
            game.console.print('help', '<b>' + game.team.list[hacker].name + '</b>: cost $' + fix(game.team.list[hacker].price) + ', manage ' + game.team.list[hacker].effect + ', required level: ' + game.team.list[hacker].levelReq + ', owned: ' + game.team.list[hacker].owned);
    
        return;
    };
    
    if (from == 'ability') {
        var thisAbility = game.abilities.list[option],
            cost = thisAbility.cost;
        
        if (game.player.money >= cost && !thisAbility.owned && game.player.level >= thisAbility.reqLevel) {
            game.player.money -= cost;
            thisAbility.owned = true;
            
            game.console.print('gain', 'You successfully bought the ' + thisAbility.name + ' ability for $' + fix(cost) + '.');
        }
        else if (thisAbility.owned)
            game.console.print('error', 'You already own this ability!');
        else if (game.player.level < thisAbility.reqLevel)
            game.console.print('error', 'You don\'t have the required level.');
        else if (game.player.money < cost)
            game.console.print('error', 'Not enough money, cost $ ' + fix(cost) + '.');
        
        return;
    };
    
    if (from == "ability-help") {
        game.console.print('help', game.console.help.buyAbility);
        
        return;
    };
    
    if (from == "ability-list") {
        for (var ability in game.abilities.list)
            game.console.print('help', '<b>' + game.abilities.list[ability].name + '</b>: cost $' + fix(game.abilities.list[ability].cost) + ', require level ' + game.abilities.list[ability].reqLevel + '. Effect: ' + game.abilities.list[ability].desc);
    
        return;
    };
}