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
        
        'game.console.monokai',
        'game.console.black',
        'game.console.afterglow',
        'game.console.fluoro',
        
        'game.options.typedEffect',
        'game.options.background',
        
        'game.servers.vm.owned',
        'game.servers.irc.owned',
        'game.servers.zombie.owned',
        
        'game.virus.list.boza.send',
        'game.virus.list.happy99.send',
        'game.virus.list.memz.send',
        'game.virus.list.faggot.send',
        'game.virus.list.magistr.send',
        
        'game.hack.hackers.grocer.owned',
        'game.hack.hackers.business_man.owned',
        'game.hack.hackers.cashier.owned',
        'game.hack.hackers.banker.owned',
        'game.hack.hackers.jeweler.owned',
        'game.hack.hackers.mark.owned',
        'game.hack.hackers.steve.owned',
        'game.hack.hackers.larry.owned',
        
        'game.hack.hackers.grocer.progress',
        'game.hack.hackers.business_man.progress',
        'game.hack.hackers.cashier.progress',
        'game.hack.hackers.banker.progress',
        'game.hack.hackers.jeweler.progress',
        'game.hack.hackers.mark.progress',
        'game.hack.hackers.steve.progress',
        'game.hack.hackers.larry.progress',
        
        'game.botnet.power',
        
        'game.kongregate.boughtMults'
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
                lastItemPath = path[path.length - 1],
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