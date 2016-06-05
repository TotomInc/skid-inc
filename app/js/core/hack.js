game.hack = function(from) {
    if (from == 'sp' || from == 'sp-click') {
        var moneyReward = game.randomInclusive(game.player.randMoneyMin, game.player.randMoneyMax),
            expReward = game.randomInclusive(game.player.randExpMin, game.player.randExpMax),
            globalMoneyMult = game.getGlobalMoneyMult(),
            globalExpMult = game.getGlobalExpMult(),
            divider = game.servers.getClickDivider();

        moneyReward *= globalMoneyMult;
        expReward *= globalExpMult;

        if (from == 'sp-click') {
            moneyReward /= divider;
            expReward /= divider;
            game.player.timesHacked++;
        }
        else
            game.player.timesHacked += 16;
        
        game.earnMoney(moneyReward);
        game.earnExp(expReward);

        if (from == 'sp-click') {
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp. ' + '(reward divided by ' + fix(divider, 0) + ' when clicking button)');
            floating.addFloating('hack-button', '+$' + fix(moneyReward));
        }
        else
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.');

        return;
    };
    
    if (from == "stats") {
        var thisPlayer = game.player,
            globalMoneyMult = game.getGlobalMoneyMult(),
            globalExpMult = game.getGlobalExpMult();
        
        game.console.print('log', '<b>Hack stats</b>:<br>' +
            'Basic reward <b>$' + fix(thisPlayer.randMoneyMin) + ' ~ $' + fix(thisPlayer.randMoneyMax) + ', ' +
            fix(thisPlayer.randExpMin) + ' exp ~ ' + fix(thisPlayer.randExpMax) + ' exp</b>, ' +
            'hack click reducer: <b>/' + thisPlayer.clickReducer + '</b>, ' +
            'global money multiplier: x<b>' + fix(globalMoneyMult, 2) + '</b>, global exp. multiplier: x<b>' + fix(globalExpMult, 2) + '</b>.');
        
        return;
    };

    if (from == "list") {
        var vmEffect = game.servers.getVMReward(),
            globalExpMult = game.getGlobalExpMult(),
            globalMoneyMult = game.getGlobalMoneyMult();
        
        for (var place in game.console.cmds.hack.places) {
            var thisPlace = game.console.cmds.hack.places[place],
                maxExpReward = thisPlace.maxExpReward * globalExpMult,
                maxMoneyReward = thisPlace.maxMoneyReward * globalMoneyMult,
                time = thisPlace.time / vmEffect;
            
            game.console.print('help', '<b>' + thisPlace.name + '</b>: $' + fix(maxMoneyReward) + ' max, ' + fix(maxExpReward) + ' max exp, take ' + fix(time, 0) + ' sec, require level ' + fix(thisPlace.reqLevel, 0));
        };
        
        return;
    };

    if (from == 'mini-market' || from == 'market' || from == 'jewelry' || from == 'bank' || from == 'trading-center' || from == 'anonymous-hideout' || from == 'deepweb') {
        var thisPlace = game.console.cmds.hack.places[from];

        if (!game.player.isHacking) {
            console.log('h')
            console.log(from)
            console.log(game.team.list[from])
            
            if (game.team.list[from].owned)
                game.console.print('error', 'You already have a hacker to hack this place.');
            else if (game.player.level >= thisPlace.reqLevel) {
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