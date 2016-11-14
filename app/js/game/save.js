game.save = {
    salt: 'U2tpZEluYw==',
    interval: 60e3,
    toSave: [
        'game.before',
        'game.fps',
        'game.version',
        
        'game.player.money',
        'game.player.totalMoney',
        'game.player.reputation',
        'game.player.level',
        'game.player.exp',
        'game.player.expReq',
        
        'game.console.themesUnlocked',
        
        /* hack variables save experimental */
        'game.hack.isHacking',
        'game.hack.currentHack',
        'game.hack.hackProgress',
        
        'game.options.typedEffect',
        'game.options.background',
        
        'game.servers.vm.owned',
        'game.servers.irc.owned'
    ],
    
    consoleHandler: function(what) {
        if (what == 'save')
            return game.save.save('user');
        else if (what == 'load')
            return game.save.load();
        else if (what == 'hardreset')
            return game.save.reset();
        else if (what == 'export')
            return game.save.export();
        else if (what == 'import')
            return game.save.import();
    },
    
    export: function() {
        if (localStorage.getItem('SkidInc' + game.save.salt) === null) {
            game.console.print('There is no save.', 'error');
            return;
        };
        
        game.save.save();
        
        var saveEncrypted = localStorage.getItem(('SkidInc' + game.save.salt));
        
        prompt('Here is your save code, keep it in a safe place! Use ctrl+a and ctrl+c to copy it.', saveEncrypted);
    },
    
    import: function() {
        var save = prompt('Put your save code, it will be loaded.');
        
        if (typeof save == 'string') {
            var saveDecrypted = JSON.parse(atob(save));
            
            for (var i = 0; i < game.save.toSave.length; i++) {
                if (typeof saveDecrypted[i] == 'undefined' || saveDecrypted[i].name !== game.save.toSave[i])
                    return;
                
                var path = game.save.toSave[i].split('.'),
                    str = 'game';
                
                path.shift();
                
                for (var e = 0; e < path.length; e++)
                    str += '["' + path[e] + '"]';
                
                eval(str + "=" + saveDecrypted[i].value);
            };
            
            game.console.print('Save successfully loaded.', 'success');
        };
    },
    
    save: function(calledFrom) {
        var save = '',
            values = [];
        
        for (var i = 0; i < game.save.toSave.length; i++) {
            var item = {
                name: game.save.toSave[i],
                value: eval(game.save.toSave[i])
            };
            
            values.push(item);
        };
        
        save = btoa(JSON.stringify(values));
        localStorage.setItem(('SkidInc' + game.save.salt), save);
        
        if (calledFrom == 'user')
            game.console.print('Save-game successfully saved.', 'success');
    },
    
    load: function(from) {
        if (localStorage.getItem('SkidInc' + game.save.salt) === null)
            return;
        
        var saveLoaded = localStorage.getItem(('SkidInc' + game.save.salt)),
            saveDecrypted = JSON.parse(atob(saveLoaded));
        
        for (var i = 0; i < game.save.toSave.length; i++) {
            if (typeof saveDecrypted[i] == 'undefined' || saveDecrypted[i].name !== game.save.toSave[i])
                return;
            
            var path = game.save.toSave[i].split('.'),
                str = 'game';
            
            path.shift();
            
            for (var e = 0; e < path.length; e++)
                str += '["' + path[e] + '"]';
            
            eval(str + "=" + saveDecrypted[i].value);
        };
    },
    
    reset: function() {
        var conf = confirm('Do you really want to do a hard-reset? You\'ll start from the beginning with nothing.');
        
        if (conf) {
            var intervalID = game.intervals.save;
            
            window.onbeforeunload = null;
            clearInterval(intervalID);
            localStorage.removeItem('SkidInc' + game.save.salt);
            location.reload();
        };
    }
};