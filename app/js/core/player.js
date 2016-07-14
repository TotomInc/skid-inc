game.player = {
    money: 0,
    totalMoney: 0,

    level: 1,

    exp: 0,
    maxExp: 100,
    expInflation: 1.15,

    randMoneyMax: 30,
    randMoneyMin: 15,

    randExpMax: 25,
    randExpMin: 10,
    
    clickReducer: 5,
    
    achievementsPoints: 0,
    
    timesHacked: 0,
    timesPlacesHacked: 0,
    
    isHacking: false,
    hackingWhat: undefined,
    hackingProgress: 0,
    
    gamemode: 'normal',
    difficultyMult: 1.5,
    
    changeGamemode: function(option) {
        game.player.gamemode = option;
        
        if (option == 'hardcore') {
            $('#servers-tab').fadeOut('slow');
            game.console.print('log', 'Gamemode changed, now playing on ' + option + '. While playing on hardcore mode, you gain money faster (x' + game.player.difficultyMult + ' to money multiplier).');
        }
        else {
            $('#servers-tab').fadeIn('slow');
            game.console.print('log', 'Gamemode changed, now playing on ' + option + '. The hardcore money multiplier have been removed.');
        }
    }
};