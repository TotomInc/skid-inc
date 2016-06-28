game.save = {
    key: 'SK-Inc',

    save: function(from) {
      localStorage.setItem(game.save.key, LZString.compressToBase64(JSON.stringify(game.save.toSave)));

        if (from == "user")
            game.console.print('save', 'Game successfully saved.');
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
          var s = JSON.parse(LZString.decompressFromBase64(localStorage.getItem(game.save.key)));
                sgp = s.gp,
                sga = s.ga,
                sgo = s.go,
                sga = s.ga,
                sgs = s.gs,
                sgt = s.gt,
                sgab = s.gab,
                g = game,
                gp = game.player,
                go = game.options,
                ga = game.achievements,
                gs = game.servers,
                gt = game.team,
                gab = game.abilities;

            if (go.version !== sgo.version)
                console.warn('Loading savegame from an older version.');

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
            gs.personal.mult = sgs.personal.mult;
            gs.personal.level = sgs.personal.level;
            gs.professional.owned = sgs.professional.owned;
            gs.professional.mult = sgs.professional.mult;
            gs.professional.level = sgs.professional.level;
            gs.vm.owned = sgs.vm.owned;
            gs.quickhack.owned = sgs.quickhack.owned;

            ga.owned = sga.owned;
            ga.printed = sga.printed;

            go.before = sgo.before;
            go.sounds = sgo.sounds;
            go.effectEnabled = sgo.effectEnabled;

            gt.list['mini_market'].owned = sgt.list['mini_market'].owned;
            gt.list['market'].owned = sgt.list['market'].owned;
            gt.list['jewelry'].owned = sgt.list['jewelry'].owned;
            gt.list['bank'].owned = sgt.list['bank'].owned;
            gt.list['trading_center'].owned = sgt.list['trading_center'].owned;
            gt.list['anonymous_hideout'].owned = sgt.list['anonymous_hideout'].owned;
            gt.list['deepweb'].owned = sgt.list['deepweb'].owned;

            gt.list['mini_market'].progress = sgt.list['mini_market'].progress;
            gt.list['market'].progress = sgt.list['market'].progress;
            gt.list['jewelry'].progress = sgt.list['jewelry'].progress;
            gt.list['bank'].progress = sgt.list['bank'].progress;
            gt.list['trading_center'].progress = sgt.list['trading_center'].progress;
            gt.list['anonymous_hideout'].progress = sgt.list['anonymous_hideout'].progress;
            gt.list['deepweb'].progress = sgt.list['deepweb'].progress;

            gab.list['up_key'].owned = sgab.list['up_key'].owned;

            game.achievements.checkLoaded();

            console.info('Game loaded.');
            game.console.print('save', 'Welcome back!');
        }
    },

    varInit: function() {
        game.save.toSave = {
            'gp': game.player,
            'go': game.options,
            'ga': game.achievements,
            'gs': game.servers,
            'gt': game.team,
            'gab': game.abilities
        };
    }
};
