/* global LZString */

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
        window.onbeforeunload = null;
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
          var sgp = s.gp,
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

            if (go.version !== sgo.version) {
                console.warn('Loading savegame from an older version.');
                game.console.print('warn', 'A new version have been published: v' + game.options.version + '. Check on the patch-notes what it adds!<br>' +
                    'I also recommend you to restart your game (delete your save on the options tab) to test again the game with the new balancing changes. Thanks!');
            }

            gp.money = sgp.money;
            gp.totalMoney = sgp.totalMoney;
            gp.level = sgp.level;
            gp.exp = sgp.exp;
            gp.maxExp = sgp.maxExp;
            gp.moneyMult = sgp.moneyMult;
            gp.expMult = sgp.expMult;
            gp.achievementsPoints = sgp.achievementsPoints;
            gp.gamemode = sgp.gamemode;
            gp.isNew = sgp.isNew;
            gp.name = sgp.name;
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

            gt.list['noob'].owned = sgt.list['noob'].owned;
            gt.list['script_kiddie'].owned = sgt.list['script_kiddie'].owned;
            gt.list['coder'].owned = sgt.list['coder'].owned;
            gt.list['hax0r'].owned = sgt.list['hax0r'].owned;
            gt.list['prodigy'].owned = sgt.list['prodigy'].owned;
            gt.list['elite_hacker'].owned = sgt.list['elite_hacker'].owned;
            gt.list['elite_skid'].owned = sgt.list['elite_skid'].owned;

            gt.list['noob'].progress = sgt.list['noob'].progress;
            gt.list['script_kiddie'].progress = sgt.list['script_kiddie'].progress;
            gt.list['coder'].progress = sgt.list['coder'].progress;
            gt.list['hax0r'].progress = sgt.list['hax0r'].progress;
            gt.list['prodigy'].progress = sgt.list['prodigy'].progress;
            gt.list['elite_hacker'].progress = sgt.list['elite_hacker'].progress;
            gt.list['elite_skid'].progress = sgt.list['elite_skid'].progress;

            gab.list['up_key'].owned = sgab.list['up_key'].owned;

            game.achievements.checkLoaded();

            console.info('Game loaded.');
            game.console.print('save', 'Welcome back, ' + game.player.name + '!');
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
