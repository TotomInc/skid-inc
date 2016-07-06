game.hack = function(from, option) {
    if (from == 'cancel') {
        if (game.player.isHacking) {
            $('#hacking-progress').remove();
            
            game.console.print('warn', game.player.hackingWhat + ' hack cancelled.');
            
            game.player.isHacking = false;
            game.player.hackingWhat = undefined;
        }
        else
            game.console.print('error', 'You can\'t cancel a place hack because you are currently hacking nothing. Try <b>hack -place -list</b>!');
    
        return;
    };
    
    if (game.player.isHacking) {
        game.console.print('error', 'You are currently hacking a place, you can\'t do a hack. Wait for your hack to finish or cancel it with <b>hack -place -cancel</b>.');
        
        return;
    };
    
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
        }
        
        game.player.timesHacked++;
        
        game.earnMoney(moneyReward);
        game.earnExp(expReward);

        if (from == 'sp-click') {
            game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp. ' + '(reward divided by ' + fix(divider, 0) + ' when clicking button)');
            floating.addFloating('hack-button', '+ $' + fix(moneyReward));
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
        
        for (var place in game.console.cmds[0].places) {
            var thisPlace = game.console.cmds[0].places[place],
                maxExpReward = thisPlace.maxExpReward * globalExpMult,
                maxMoneyReward = thisPlace.maxMoneyReward * globalMoneyMult,
                time = thisPlace.time / vmEffect;
            
            game.console.print('help', '<b>' + thisPlace.name + '</b>: $' + fix(maxMoneyReward) + ' max, ' + fix(maxExpReward) + ' max exp, take ' + fix(time, 0) + ' sec, require level ' + fix(thisPlace.reqLevel, 0));
        };
        
        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.hack);
        
        return;
    };
    
    if (from == 'place') {
        var thisPlace = game.console.cmds[0].places[option];
        
        if (!game.player.isHacking) {
            if (game.team.list[option].owned)
                game.console.print('error', 'You already have a hacker to hack this place.');
            else if (game.player.level >= thisPlace.reqLevel) {
                game.player.isHacking = true;
                game.player.hackingWhat = option;
                game.console.print('log', 'Hack in progress, type <b>hack -place -cancel</b> to stop the current hack.');
                game.console.print('hack-bar');
            }
            else
                game.console.print('error', game.console.errors.levelLow);
        }
        else
            game.console.print('error', game.console.errors.hackInProgress);
        
        return;
    };
};