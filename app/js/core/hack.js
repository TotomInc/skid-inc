game.hack = function(from) {
    if (from == 'sp' || from == 'sp-click') {
        var moneyReward = game.randomInclusive(game.player.randMoneyMin, game.player.randMoneyMax),
            expReward = game.randomInclusive(game.player.randExpMin, game.player.randExpMax);

        if (from == 'sp-click') {
            moneyReward /= game.player.clickReducer;
            expReward /= game.player.clickReducer;
        };
        
        game.earnMoney(moneyReward);
        game.earnExp(expReward);

        if (from == 'sp-click')
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp. (reward divided by ' + game.player.clickReducer + ' when clicking button)');
        else
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.');

        return;
    };
    
    if (from == "stats") {
        var thisPlayer = game.player;
        game.console.print('log', '<b>Hack stats</b>: $' + fix(thisPlayer.randMoneyMin) + ' ~ $' + fix(thisPlayer.randMoneyMax) + ', ' +
            fix(thisPlayer.randExpMin) + ' exp ~ ' + fix(thisPlayer.randExpMax) + ' exp, ' +
            'hack click reducer: /' + thisPlayer.clickReducer);
        
        return;
    };

    if (from == "list") {
        for (var place in game.console.cmds.hack.places) {
            var thisPlace = game.console.cmds.hack.places[place];
            game.console.print('help', '<b>' + thisPlace.name + '</b>: $' + fix(thisPlace.maxMoneyReward) + ' max, ' + fix(thisPlace.maxExpReward) + ' max exp, take ' + fix(thisPlace.time, 0) + ' sec, require level ' + fix(thisPlace.reqLevel, 0));
        };
        
        return;
    };

    if (from == 'mini-market' || from == 'market' || from == 'bank' || from == 'jewelry' || from == 'trading-center') {
        var thisPlace = game.console.cmds.hack.places[from];

        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.hack);
        
        return;
    };
};