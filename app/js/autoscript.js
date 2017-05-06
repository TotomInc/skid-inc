skidinc.autoscript = {};
skidinc.autoscript.unlocked = [false, false, false, false, false, false, false, false];
skidinc.autoscript.time = [0, 0, 0, 0, 0, 0, 0, 0];
skidinc.autoscript.cost = [420, 22500, 315000, 4410000, 61740000, 864360000, 12101040000, 169414560000];

skidinc.autoscript.list = function() {
    return '<b>*</b> autoscripts got the same names as scripts. You can also check the autoscript tab for names.';
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
            skidinc.autoscript.time[script.i] += times / skidinc.fps;
            
            var maxTime = script.time / skidinc.player.getTimeMult(),
                percent = skidinc.autoscript.time[script.i] / maxTime * 100;
            
            $('#autoscript-' + script.i + ' #time').html(fix(skidinc.autoscript.time[script.i], 2) + 's <small>(' + fix(percent, 0) + '%)</small>');

            if (skidinc.autoscript.time[script.i] >= (script.time / skidinc.player.getTimeMult()))
                skidinc.autoscript.finish(script);
        };
    };
    
    skidinc.autoscript.update();
};

skidinc.autoscript.finish = function(script) {
    var money = script.money * skidinc.player.getMoneyMult(),
        exp = script.exp * skidinc.player.getExpMult();
    
    skidinc.player.earn('money', money);
    skidinc.player.earn('exp', exp);
    
    skidinc.script.completed[script.i]++;
    skidinc.script.totalCompleted = skidinc.script.completed.reduce((a, b) => a + b, 0);
    skidinc.autoscript.time[script.i] = 0;
};

skidinc.autoscript.update = function() {
    for (var i = 0; i < skidinc.script.scripts.length; i++) {
        var script = skidinc.script.scripts[i],
            scriptUnlocked = skidinc.script.unlocked[script.i],
            unlocked = skidinc.autoscript.unlocked[i],
            time = script.time / skidinc.player.getTimeMult(),
            income = script.money * skidinc.player.getMoneyMult(),
            incomePerSec = income / time,
            exp = script.exp * skidinc.player.getExpMult(),
            expPerSec = exp / time;
        
        if (unlocked) {
            $('#autoscript-' + script.i + ' #money').html('Money');
            $('#autoscript-' + script.i + ' #experience').html('Experience');
            $('#autoscript-' + script.i + ' #income').html('$' + fix(income, 0) + ' <small>($' + fix(incomePerSec, 0) + '/s)</small>');
            $('#autoscript-' + script.i + ' #exp').html(fix(exp, 0) + ' exp. <small>(' + fix(expPerSec, 0) + ' exp/s)</small>');
        }
        else {
            if (scriptUnlocked)
                $('#autoscript-' + script.i + ' #income').html('bought');
            else
                $('#autoscript-' + script.i + ' #income').html('cost <b>$' + fix(script.cost, 0) + '</b>');
            
            $('#autoscript-' + script.i + ' #money').html('Script');
            $('#autoscript-' + script.i + ' #experience').html('Autoscript');
            $('#autoscript-' + script.i + ' #exp').html('cost $' + fix(skidinc.autoscript.cost[i], 0) + '</b>');
        };
    };
};

skidinc.autoscript.domInit = function() {
    for (var i = 0; i < skidinc.script.scripts.length; i++) {
        var script = skidinc.script.scripts[i],
            unlocked = skidinc.autoscript.unlocked[i];
        
        $('#stats-autoscripts').append('<div id="autoscript-' + script.i + '" class="stat-container big-content">' +
            '<div id="autoscript-' + script.i + '-name" class="names">' +
                '<p><b>' + script.id + '</b></p>' +
                '<p id="money">Money</p>' +
                '<p id="experience">Experience</p>' +
            '</div>' +
            '<div class="content">' +
                '<p id="time">0.00s</p>' +
                '<p id="income">$0.00</p>' +
                '<p id="exp">$0.00</p>' +
            '</div>' +
        '</div>');
    };
};

skidinc.autoscript.init = function() {
    if (skidinc.script.scripts.length !== skidinc.autoscript.unlocked.length) {
        skidinc.autoscript.unlocked = [];
        
        skidinc.script.scripts.forEach(function(i) {
            skidinc.autoscript.unlocked.push(false);
        });
    };

    if (skidinc.script.scripts.length !== skidinc.autoscript.time.length) {
        skidinc.autoscript.time = [];
        
        skidinc.script.scripts.forEach(function(i) {
            skidinc.autoscript.time.push(0);
        });
    };
};

skidinc.autoscript.prestige = function() {
    skidinc.autoscript.unlocked = [];
    skidinc.autoscript.time = [];

    skidinc.script.scripts.forEach(function(i) {
        skidinc.autoscript.unlocked.push(false);
        skidinc.autoscript.time.push(0);
    });
};