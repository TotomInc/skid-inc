skidinc.autoscript = {};
skidinc.autoscript.unlocked = [false, false, false, false, false, false, false, false];
skidinc.autoscript.time = [0, 0, 0, 0, 0, 0, 0, 0];
skidinc.autoscript.cost = [420, 7500, 90000, 550000, 12500000, 100000000, 1750000000, 15000000000];

skidinc.autoscript.list = function() {
    var str = '',
        e = 0;
    
    for (var script in skidinc.script.scripts) {
        var i = script,
            script = skidinc.script.scripts[i],
            cost = skidinc.autoscript.cost[script.i],
            unlocked = skidinc.autoscript.unlocked[script.i];
        
        str += '<b>*</b> <b>';
        
        if (!unlocked)
            str += '<red>' + script.id + '</red>';
        else
            str += '<green>' + script.id + '</green>';
        
        str += '</b>: cost <b>$' + fix(cost, 0) + '</b>.<br>';
    };
    
    return str;
};

skidinc.autoscript.buy = function(what) {
    var exists = false,
        s;
    
    for (var script in skidinc.script.scripts) {
        var i = script,
            script = skidinc.script.scripts[i];
        
        if (what == script.id) {
            exists = true;
            s = script;
        };
    };
    
    if (!exists)
        return skidinc.console.print('<x>ERR</x> <b>' + what + '</b> is not a known autoscript name.');
    
    if (exists) {
        if (skidinc.autoscript.unlocked[s.i])
            return skidinc.console.print('<x>ERR</x> you already unlocked <b>' + s.id + '</b> autoscript.');
        if (!skidinc.script.unlocked[s.i])
            return skidinc.console.print('<x>ERR</x> you can\'t buy an autoscript for a script you don\'t own (<b>' + s.id + '</b> script).');
        if (skidinc.player.money < skidinc.autoscript.cost[s.i])
            return skidinc.console.print('<x>ERR</x> not enough money to buy <b>' + s.id + '</b> autoscript (cost <b>$' + fix(skidinc.autoscript.cost[s.i]) + '</b>).');
        else {
            skidinc.player.money -= skidinc.autoscript.cost[s.i];
            skidinc.autoscript.unlocked[s.i] = true;
            return skidinc.console.print('You bought <b>' + s.id + '</b> autoscript.');
        };
    };
};

skidinc.autoscript.loop = function(times) {
    for (var i = 0; i < skidinc.script.scripts.length; i++) {
        var script = skidinc.script.scripts[i];

        if (skidinc.autoscript.unlocked[script.i]) {
            skidinc.autoscript.time[script.i] += times / skidinc.interval;

            if (skidinc.autoscript.time[script.i] >= (script.time / skidinc.player.getTimeMult()))
                skidinc.autoscript.finish(script);
        };
    };
};

skidinc.autoscript.finish = function(script) {
    var money = script.money * skidinc.player.getMoneyMult(),
        exp = script.exp * skidinc.player.getExpMult();
    
    skidinc.player.earn('money', money);
    skidinc.player.earn('exp', exp);
    
    skidinc.script.completed[script.i]++;
    skidinc.autoscript.time[script.i] = 0;
};