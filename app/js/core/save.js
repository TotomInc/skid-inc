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
        if (localStorage.getItem(game.save.key) == null) {
            game.console.printGuide();
            console.warn('No save found!');
        }
        else {
            var s = JSON.parse(localStorage.getItem(game.save.key)),
                sgp = s.gp,
                sga = s.ga,
                sgo = s.go,
                sga = s.ga,
                sgs = s.gs,
                sgt = s.gt,
                g = game,
                gp = game.player,
                go = game.options,
                ga = game.achievements,
                gs = game.servers,
                gt = game.team;

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
            go.sounds = sgo.sounds;
            go.effectEnabled = sgo.effectEnabled;
            
            gt.list['mini-market'].owned = sgt.list['mini-market'].owned;
            gt.list['market'].owned = sgt.list['market'].owned;
            gt.list['jewelry'].owned = sgt.list['jewelry'].owned;
            gt.list['bank'].owned = sgt.list['bank'].owned;
            gt.list['trading-center'].owned = sgt.list['trading-center'].owned;
            gt.list['anonymous-hideout'].owned = sgt.list['anonymous-hideout'].owned;
            gt.list['deepweb'].owned = sgt.list['deepweb'].owned;
            
            gt.list['mini-market'].progress = sgt.list['mini-market'].progress;
            gt.list['market'].progress = sgt.list['market'].progress;
            gt.list['jewelry'].progress = sgt.list['jewelry'].progress;
            gt.list['bank'].progress = sgt.list['bank'].progress;
            gt.list['trading-center'].progress = sgt.list['trading-center'].progress;
            gt.list['anonymous-hideout'].progress = sgt.list['anonymous-hideout'].progress;
            gt.list['deepweb'].progress = sgt.list['deepweb'].progress;
            
            game.achievements.checkLoaded();
            
            console.info('Game loaded.');
            game.console.print('save', 'Save-game successfully loaded.');
        }
    },
    
    varInit: function() {
        game.save.toSave = {
            'gp': game.player,
            'go': game.options,
            'ga': game.achievements,
            'gs': game.servers,
            'gt': game.team
        };
    }
};