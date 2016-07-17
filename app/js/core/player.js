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
    
    isNew: true,
    name: 'Hacker',
    
    changeName: function() {
        var name = $('#modal-playername').val();
        
        // equivalent to nodejs module 'ent'
        // delete unsafe characters to avoid cheat via script injection
        if (name.length < 1)
            name = 'Hacker'
        else
            game.player.name = name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    },
    
    changeGamemode: function(option, fromModal) {
        game.player.gamemode = option;
        
        if (option == 'hardcore') {
            $('#servers-tab, #places-tab, #hack-button').fadeOut('fast');
            game.console.print('log', 'Gamemode changed, now playing on ' + option + '. While playing on hardcore mode, you gain money and exp faster (x' + fix(game.player.difficultyMult, 0) + ').');
        }
        else {
            $('#servers-tab, #places-tab, #hack-button').fadeIn('fast');
            game.console.print('log', 'Gamemode changed, now playing on ' + option + '. The hardcore money multiplier have been removed.');
        }
        
        if (fromModal) {
            $('#modal-newplayer').modal('hide');
            game.player.isNew = false;
        }
    },
    
    domInit: function() {
        var option = game.player.gamemode;
        
        if (option == 'hardcore')
            $('#servers-tab, #places-tab, #hack-button').fadeOut('fast')
        else
            $('#servers-tab, #places-tab, #hack-button').fadeIn('fast');
        
        if (game.player.isNew)
            $('#modal-newplayer').modal('show');
    }
};