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
    
    if (from == "serv-pers") {
        var cost = game.servers.getPersCost();
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.personal.owned++;
            
            var newCost = game.servers.getPersCost();
            game.console.print('gain', 'You successfully bought a personal server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else
            game.console.print('error', 'Not enough money to buy a personal server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');
        
        return;
    };
    
    if (from == "serv-pro") {
        var cost = game.servers.getProCost();
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.professional.owned++;
            
            var newCost = game.servers.getProCost();
            game.console.print('gain', 'You successfully bought a professional server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else
            game.console.print('error', 'Not enough money to buy a professional server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');
        
        return;
    };
    
    if (from == "serv-speedhack") {
        var cost = game.servers.getVMCost();
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers.vm.owned++;
            
            var newCost = game.servers.getVMCost();
            game.console.print('gain', 'You successfully bought a VirtualMachine for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else
            game.console.print('error', 'Not enough money to buy a VirtualMachine, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');

        return;
    };
    
    if (from == "serv-quickhack") {
        var cost = game.servers.getQuickhackCost();
        
        if (game.player.money >= cost && game.servers.quickhack.owned < 15) {
            game.player.money -= cost;
            game.servers.quickhack.owned++;

            var newCost = game.servers.getQuickhackCost();
            game.console.print('gain', 'You successfully bought a quickhack server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else if (game.servers.quickhack.owned >= 15)
            game.console.print('error', 'You already bought the maximum of speedhack servers (15).');
        else
            game.console.print('error', 'Not enough money to buy a quickhack server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');

        return;
    };

    
    
    
    if (from == 'server') {
        console.log('want a ' + option + ' server.');
        game.console.print('warn', 'TODO');
        
        return;
    };
    
    if (from == "server-help") {
        game.console.print('help', game.console.help.buyServer);
        
        return;
    };
    
    if (from == 'hacker') {
        console.log('want ' + option + ' hacker.');
        game.console.print('warn', 'TODO');
        
        return;
    };
    
    if (from == "hacker-help") {
        game.console.print('help', game.console.help.buyHacker);
        
        return;
    };
    
    if (from == "hacker-list") {
        for (var hacker in game.team.list)
            game.console.print('help', '<b>' + game.team.list[hacker].name + '</b>: cost $' + fix(game.team.list[hacker].price) + ', manage ' + game.team.list[hacker].effect + ', owned: ' + game.team.list[hacker].owned);
    
        return;
    };
    
    if (from == 'ability') {
        console.log('want ' + option + ' ability.');
        game.console.print('warn', 'TODO');
        
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