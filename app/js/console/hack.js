game.console.hack = function(from) {
    if (from == 'sp') {
        var moneyReward = game.randomInclusive(game.player.randMoneyMin, game.player.randMoneyMax),
            expReward = game.randomInclusive(game.player.randExpMin, game.player.randExpMax);
        
        game.earnMoney(moneyReward);
        game.earnExp(expReward);
        game.console.print('gain', 'You successfully gained $' + fix(moneyReward) + ' and ' + fix(expReward) + ' exp.');
        
        return;
    };
    
    if (from == 'xs' || from == 'sm' || from == 'md' || from == 'lg' || from == 'xl') {
        console.log('typed a basic hacking');
        return;
    };
};