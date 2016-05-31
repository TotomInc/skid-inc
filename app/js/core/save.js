game.save = {
    key: 'SK-Inc',
    toSave: {
        'gp': game.player,
        'go': game.options
    },
    
    save: function(from) {
        localStorage.setItem(game.save.key, JSON.stringify(game.save.toSave));
        
        if (from == "user")
            game.console.print('log', 'Game successfully saved to local-storage.');
        else
            console.log('Game saved.');
    },
    
    reset: function() {
        clearInterval(game.options.intervals.save);
        localStorage.removeItem(game.save.key);
        location.reload();
    },
    
    load: function() {
        if (localStorage.getItem(game.save.key) == null)
            game.console.printGuide();
        else {
            var s = JSON.parse(localStorage.getItem(game.save.key)),
                sgp = s.gp,
                sgo = s.go,
                g = game,
                gp = game.player,
                go = game.options;

            gp.money = sgp.money;
            gp.totalMoney = sgp.totalMoney;
            gp.level = sgp.level;
            gp.exp = sgp.exp;
            gp.maxExp = sgp.maxExp;
            gp.moneyMult = sgp.moneyMult;
            gp.expMult = sgp.expMult;
            gp.achievementsPoints = sgp.achievementsPoints;

            gp.serverPers = sgp.serverPers;
            gp.serverPro = sgp.serverPro;
            gp.serverSpeedHack = sgp.serverSpeedHack;

            gp.timesHacked = sgp.timesHacked;
            gp.timesPlacesHacked = sgp.timesPlacesHacked;

            go.before = sgo.before;
            
            console.log('Game loaded.');
            game.console.print('log', 'Save-game successfully loaded.');
        }
    }
};