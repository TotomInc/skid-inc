game.save = {
    key: 'SK-Inc',
    
    save: function(from) {
        localStorage.setItem(game.save.key, JSON.stringify(game.save.toSave));
        
        if (from == "user")
            game.console.print('save', 'Game successfully saved to local-storage.');
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
                sga = s.ga,
                sgo = s.go,
                sga = s.ga,
                sgs = s.gs,
                g = game,
                gp = game.player,
                go = game.options,
                ga = game.achievements,
                gs = game.servers;

            gp.money = sgp.money;
            gp.totalMoney = sgp.totalMoney;
            gp.level = sgp.level;
            gp.exp = sgp.exp;
            gp.maxExp = sgp.maxExp;
            gp.moneyMult = sgp.moneyMult;
            gp.expMult = sgp.expMult;
            gp.achievementsPoints = sgp.achievementsPoints;

            gp.timesHacked = sgp.timesHacked;
            gp.timesPlacesHacked = sgp.timesPlacesHacked;
            
            gs.personal.owned = sgs.personal.owned;
            gs.professional.owned = sgs.professional.owned;
            gs.vm.owned = sgs.vm.owned;
            gs.quickhack.owned = sgs.quickhack.owned;
            
            ga.owned = sga.owned;

            go.before = sgo.before;
            
            game.achievements.checkLoaded();
            
            console.log('Game loaded.');
            game.console.print('save', 'Save-game successfully loaded.');
        }
    },
    
    varInit: function() {
        game.save.toSave = {
            'gp': game.player,
            'go': game.options,
            'ga': game.achievements,
            'gs': game.servers
        };
    }
};