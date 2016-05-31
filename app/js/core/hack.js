game.hack = function(from) {
    if (from == 'sp' || from == 'sp-click') {
        var moneyReward = game.randomInclusive(game.player.randMoneyMin, game.player.randMoneyMax),
            expReward = game.randomInclusive(game.player.randExpMin, game.player.randExpMax);

        // first apply all money/exp rewards effects
        if (game.player.serverPers > 0)
            moneyReward *= (game.player.serverPersReward * game.player.serverPers);
        
        if (game.player.serverPro > 0)
            moneyReward *= (game.player.serverProReward * game.player.serverPro);

        // then divide money/exp rewards if clicking on the button
        if (from == 'sp-click') {
            moneyReward /= game.player.clickReducer;
            expReward /= game.player.clickReducer;
        };
        
        game.earnMoney(moneyReward);
        game.earnExp(expReward);
        game.player.timesHacked++;

        if (from == 'sp-click') {
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp. (reward divided by ' + game.player.clickReducer + ' when clicking button)');
            floating.addFloating('hack-button', '+$' + fix(moneyReward));
        }
        else
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.');

        return;
    };
    
    if (from == "stats") {
        var thisPlayer = game.player;
        game.console.print('log', '<b>Hack stats</b>: basic reward $' + fix(thisPlayer.randMoneyMin) + ' ~ $' + fix(thisPlayer.randMoneyMax) + ', ' +
            fix(thisPlayer.randExpMin) + ' exp ~ ' + fix(thisPlayer.randExpMax) + ' exp, ' +
            'hack click reducer: /' + thisPlayer.clickReducer + ', ' +
            'hack reward multiplier: ' + fix(thisPlayer.serverPers, 0) + ' personal servers, ' + fix(thisPlayer.serverPro, 0) + ' professional servers.');
        
        return;
    };

    if (from == "list") {
        for (var place in game.console.cmds.hack.places) {
            var thisPlace = game.console.cmds.hack.places[place];
            game.console.print('help', '<b>' + thisPlace.name + '</b>: $' + fix(thisPlace.maxMoneyReward) + ' max, ' + fix(thisPlace.maxExpReward) + ' max exp, take ' + fix(thisPlace.time, 0) + ' sec, require level ' + fix(thisPlace.reqLevel, 0));
        };
        
        return;
    };

    if (from == 'mini-market' || from == 'market' || from == 'jewelry' || from == 'bank' || from == 'trading-center') {
        var thisPlace = game.console.cmds.hack.places[from];

        if (!game.player.isHacking) {
            if (game.player.level >= thisPlace.reqLevel) {
                game.player.isHacking = true;
                game.player.hackingWhat = from;
                game.console.print('log', 'Hack in progress...');
                game.console.print('hack-bar');
            }
            else
                game.console.print('error', game.console.errors.levelLow);
        }
        else
            game.console.print('error', game.console.errors.hackInProgress);


        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.hack);
        
        return;
    };
};