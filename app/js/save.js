skidinc.save = {};
skidinc.save.name = 'SKINC',

skidinc.save.b64uEncode = function(what) {
	return btoa(encodeURIComponent(what).replace(/%([0-9A-F]{2})/g, function(match, p1) {
	    return String.fromCharCode('0x' + p1);
	}));
};

skidinc.save.b64uDecode = function(what) {
	return decodeURIComponent(atob(what).split('').map(function(c) {
	    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
};

skidinc.save.saveNow = function(direct) {
    var str = skidinc.save.b64uEncode(JSON.stringify(skidinc));
    
    localStorage.setItem(skidinc.save.name, str);
    
    if (direct)
        return skidinc.console.print('<z>SAVE</z> game saved.');
};

skidinc.save.eraseNow = function() {
    var conf = confirm('If you do this you will reset from scratch (no prestige by doing this)!');
    
    if (!conf)
        return;
    
    window.onbeforeunload = function() {};
    clearInterval(skidinc.loops.save);
    
    localStorage.removeItem(skidinc.save.name);
    location.reload();
};

skidinc.save.loadNow = function() {
    if (localStorage.getItem(skidinc.save.name) == null)
        return console.info('No save found...');
    
    var str = localStorage.getItem(skidinc.save.name),
        save = JSON.parse(skidinc.save.b64uDecode(str));
    
    skidinc.before = save.before;
    
    skidinc.achievements.owned = save.achievements.owned;
    
    skidinc.autoscript.unlocked = save.autoscript.unlocked;
    
    skidinc.options.typed = save.options.typed;
    
    skidinc.script.unlocked = save.script.unlocked;
    skidinc.script.completed = save.script.completed;
    skidinc.script.totalCompleted = save.script.totalCompleted;
    skidinc.script.available = save.script.available;
    skidinc.script.current = save.script.current;
    skidinc.script.time = save.script.time;
    skidinc.script.maxTime = save.script.maxTime;
    
    skidinc.server.owned = save.server.owned;
    
    skidinc.tutorial.finish = save.tutorial.finish;
    
    skidinc.player.username = save.player.username;
    skidinc.player.money = save.player.money;
    skidinc.player.totalMoney = save.player.totalMoney;
    skidinc.player.exp = save.player.exp;
    skidinc.player.totalExp = save.player.totalExp;
    skidinc.player.expReq = save.player.expReq;
    skidinc.player.level = save.player.level;
    
    if (save.version >= 0.31) {
        skidinc.player.botnet = save.player.botnet;
        skidinc.player.prestigeCount = save.player.prestigeCount;
    };
    
    if (save.version >= 0.32) {
        skidinc.battery.level = save.battery.level;
        skidinc.battery.time = save.battery.time;
    };
    
    if (save.version >= 0.33)
        skidinc.console.grammarly = save.console.grammarly;
    
    return console.info('Save found and loaded.', save.version);
};

skidinc.save.soft = function() {
    if (skidinc.prestige.botnetOnReset == 0) {
        $('#prestige-button').html('You need to gain at least 1 botnet').removeClass('btn-outline-info').addClass('btn-outline-danger');
        
        setTimeout(function() {
            $('#prestige-button').html('Prestige now').removeClass('btn-outline-danger').addClass('btn-outline-info');
        }, 5000);
        
        return;
    };
    
    clearInterval(skidinc.loops.core);
    clearInterval(skidinc.loops.achievements);
    clearInterval(skidinc.loops.save);
    
    skidinc.player.botnet += skidinc.prestige.botnetOnReset;
    
    skidinc.autoscript.prestige();
    skidinc.script.prestige();
    skidinc.server.prestige();
    skidinc.player.prestige();
    skidinc.battery.prestige();
    
    skidinc.save.saveNow();
    location.reload();
};

skidinc.save.init = function() {
    skidinc.save.loadNow();
    
    skidinc.achievements.saveInit();
    
    skidinc.loops.save = setInterval(function() {
        skidinc.save.saveNow();
    }, 500);
    
    window.onbeforeunload = function() {
        skidinc.save.saveNow();
    };
};