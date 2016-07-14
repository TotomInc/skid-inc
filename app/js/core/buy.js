game.buy = function(from, option) {
    if (from == "sp") {
        game.console.print('error', game.console.errors.buyNoArgs);
        
        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.buy);
        
        return;
    };
    
    if (from == 'server') {
        var cost = game.servers.getCostOption(option);
        
        if (option == 'quickhack' && game.servers.quickhack.owned >= game.servers.quickhack.maxOwned) {
            game.console.print('error', 'You have bought all quickhack servers.');
            
            return;
        }
        else if (game.player.money >= cost) {
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
    
    if (from == "server-info") {
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
    
    if (from == "server-list") {
        var servers = ['personal', 'professional', 'vm', 'quickhack'];
        
        for (var i = 0; i < servers.length; i++) {
            var logType = (i == 0 ? 'log' : 'nothing'),
                thisServer = game.servers[servers[i]],
                cost = game.servers.getCostArray(i);
            
            game.console.print(logType, '<b>' + thisServer.name + '</b>: ' + thisServer.desc + ', currently ' + fix(thisServer.owned, 0) + ' owned, next cost $' + fix(cost));
        }
        
        return;
    };
    
    if (from == 'hacker') {
        var thisHacker = game.team.list[option],
            cost = game.team.list[option].price;
        
        if (game.player.money >= cost && game.player.level >= thisHacker.levelReq && !thisHacker.owned && game.player.hackingWhat !== thisHacker.effect) {
            game.player.money -= cost
            thisHacker.owned = true;
            
            game.console.print('gain', 'You successfully hired <b>' + thisHacker.name + '</b> for ' + thisHacker.effect + ' at <b>$' + fix(cost) + '</b>.');
        }
        else if (game.player.hackingWhat == thisHacker.effect)
            game.console.print('error', 'Wait for your hack to finish to hire this hacker (this hacker hack the place you are currently hacking).');
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
        var i = 0;
        
        for (var hacker in game.team.list) {
            var logType = (i == 0 ? 'log' : 'nothing'),
                thisHacker = game.team.list[hacker];
            
            i++;
            
            game.console.print(logType, '<b>' + thisHacker.name + '</b>: cost $' + fix(thisHacker.price) + ', manage ' + thisHacker.effect + ', required level: ' + thisHacker.levelReq + ', owned: ' + thisHacker.owned);
        }
    
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

    if (from == "upgrade") {
        var cost = undefined;
        
        if (option == 'personal')
            cost = Math.floor(10000 * Math.pow(game.servers.personal.upInflation, game.servers.personal.level));
        else if (option == 'professional')
            cost = Math.floor(1e6 * Math.pow(game.servers.professional.upInflation, game.servers.professional.level));
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.servers[option].level++;
            game.servers[option].mult += game.servers[option].multAdd;
            
            game.console.print('gain', 'You successfully upgraded your ' + option + ' server for $' + fix(cost) + '.');
        }
        else
            game.console.print('error', 'Not enough money, cost $' + fix(cost) + '.');
        
        return;
    };
    
    if (from == "upgrade-help") {
        game.console.print('help', game.console.help.buyUpgrade);
        
        return;
    };
    
    if (from == "upgrade-info") {
        var types = ['personal', 'professional'],
            costs = [
                Math.floor(10000 * Math.pow(game.servers.personal.upInflation, game.servers.personal.level)),
                Math.floor(1e6 * Math.pow(game.servers.professional.upInflation, game.servers.professional.level))
            ],
            addMults = [
                1 + game.servers.personal.multAdd * game.servers.personal.level,
                1 + game.servers.professional.multAdd * game.servers.professional.level
            ];
        
        game.console.print('log', 'Upgrade servers infos:');
        
        for (var i = 0; i < types.length; i++) {
            var logType = (i == 0 ? 'log' : 'nothing'),
                thisType = game.servers[types[i]];
            
            game.console.print(logType, '<b>' + types[i] + '</b>: current upgrade level ' + thisType.level + ', additionnal mult: x' + fix(addMults[i], 2) + ', cost $' + fix(costs[i]) + '.');
        }
            
        
        return;
    };
}