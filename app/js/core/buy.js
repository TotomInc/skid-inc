game.buy = function(from) {
    if (from == "sp") {
        game.console.print('error', game.console.errors.buyNoArgs);
        
        return;
    };
    
    if (from == "serv") {
        game.console.print('error', game.console.errors.buyNoArgsServ);
        
        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.buy);
        return;
    };
    
    if (from == "info") {
        var persServMult = game.getPersServerMult(),
            proServMult = game.getProServerMult(),
            proServMultExp = game.getProServerMultExp(),
            speedhackMult = game.getSpeedhackMult(),
            persCost = game.getPersServerCost(),
            proCost = game.getProServerCost(),
            speedhackCost = game.getSpeedhackCost(),
            clickDivider = game.getClickDivider();
        
        game.console.print('log', 'Servers info:<br>' +
            '<b>Personal servers</b>: ' + fix(game.player.serverPers, 0) + ' , mutiplier:  x' + fix(persServMult, 2) + ', next cost: $' + fix(persCost) + '.<br>' +
            '<b>Professional servers</b>: ' + fix(game.player.serverPro, 0) + ', money mutiplier: x' + fix(proServMult, 2) + ', experience mutiplier: x' + proServMultExp + ', next cost: $' + fix(proCost) + '.<br>' + 
            '<b>VM servers</b>: ' + fix(game.player.serverSpeedHack, 0) + ', divider: /' + fix(speedhackMult, 2) + ', next cost: $' + fix(speedhackCost) + '.<br>' +
            '<b>Quickhack servers</b>: ' + fix(game.player.serverQuickHack, 0) + ', click divider: /' + fix(clickDivider, 0) + '.');
        
        return;
    };
    
    if (from == "serv-help") {
        game.console.print('help', game.console.help.buyServer);
        
        return;
    };
    
    if (from == "serv-pers") {
        var cost = game.getPersServerCost();
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.player.serverPers++;
            
            var newCost = game.getPersServerCost();
            game.console.print('gain', 'You successfully bought a personal server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else
            game.console.print('error', 'Not enough money to buy a personal server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');
        
        return;
    };
    
    if (from == "serv-pro") {
        var cost = game.getProServerCost();
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.player.serverPro++;
            
            var newCost = game.getProServerCost();
            game.console.print('gain', 'You successfully bought a professional server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else
            game.console.print('error', 'Not enough money to buy a professional server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');
        
        return;
    };
    
    if (from == "serv-speedhack") {
        var cost = game.getSpeedhackCost();
        
        if (game.player.money >= cost) {
            game.player.money -= cost;
            game.player.serverSpeedHack++;
            
            var newCost = game.getSpeedhackCost();
            game.console.print('gain', 'You successfully bought a speedhack server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else
            game.console.print('error', 'Not enough money to buy a speedhack server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');

        return;
    };
    
    if (from == "serv-quickhack") {
        var cost = game.getQuickhackCost();
        
        if (game.player.money >= cost && game.player.serverQuickHack < 15) {
            game.player.money -= cost;
            game.player.serverQuickHack++;

            var newCost = game.getQuickhackCost();
            game.console.print('gain', 'You successfully bought a quickhack server for $' + fix(cost) + ', next cost: $' + fix(newCost) + '. For more info type <b>buy -info</b>.');
        }
        else if (game.player.serverQuickHack >= 15)
            game.console.print('error', 'You already bought the maximum of speedhack servers (15).');
        else
            game.console.print('error', 'Not enough money to buy a quickhack server, cost $' + fix(cost) + '. For more info type <b>buy -info</b>.');

        return;
    };
    
    if (from == "button1") {
        game.console.print('log', 'TODO')
        
        return;
    }
}