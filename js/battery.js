skidinc.battery = {};
skidinc.battery.level = 1;
skidinc.battery.levelCharge = 30;
skidinc.battery.time = 0;
skidinc.battery.price = 50000;
skidinc.battery.inflation = 1.5;
skidinc.battery.maxCharge = 120;

skidinc.battery.chargePower = 7;
skidinc.battery.chargePowerMult = 1;
skidinc.battery.chargeTimeMult = 1;

skidinc.battery.moneyPerLevel = 0.06;
skidinc.battery.expPerLevel = 0.04;
skidinc.battery.timePerLevel = 0.02;

skidinc.battery.moneyEffect = 1.25;
skidinc.battery.expEffect = 1.15;
skidinc.battery.timeMult = 1.10;

skidinc.battery.cursorEnter = false;
skidinc.battery.cursorLeave = true;
skidinc.battery.oldState = 'null';

skidinc.battery.getExpEffect = function() {
    if (skidinc.battery.time > 0.01)
        return skidinc.battery.expEffect + (skidinc.battery.level * skidinc.battery.expPerLevel);
    else
        return 1;
};

skidinc.battery.getMoneyEffect = function() {
    if (skidinc.battery.time > 0.01)
        return skidinc.battery.moneyEffect + (skidinc.battery.level * skidinc.battery.moneyPerLevel);
    else
        return 1;
};

skidinc.battery.getTimeEffect = function() {
    if (skidinc.battery.time > 0.01)
        return skidinc.battery.timeMult + (skidinc.battery.level * skidinc.battery.timePerLevel);
    else
        return 1;
};

skidinc.battery.getCost = function() {
    return Math.floor(skidinc.battery.price * Math.pow(skidinc.battery.inflation, skidinc.battery.level));
};

skidinc.battery.getMaxCharge = function() {
    return (skidinc.battery.maxCharge * skidinc.battery.chargeTimeMult) + (skidinc.battery.level * skidinc.battery.levelCharge);
};

skidinc.battery.getChargePower = function() {
    return (skidinc.battery.chargePower * skidinc.battery.chargePowerMult) + skidinc.battery.level - 1;
};

skidinc.battery.list = function() {
    var str = '* increase max charge capacity.<br>' +
        '* increase your charge power.<br>' +
        '* reduce your scripts time.';
    
    return str;
};

skidinc.battery.display = function() {
    var maxCharge = skidinc.battery.getMaxCharge();
    
    $('#battery-level').css('width', skidinc.battery.time / maxCharge * 100 + '%');
    
    if (skidinc.battery.time <= (maxCharge * 0.33) && skidinc.battery.oldState !== 'low') {
        skidinc.battery.oldState = 'low';
        
        $('#battery, #battery-level').removeClass('low medium high').addClass('low');
        $('#stats-battery-title i').removeClass().addClass('fa fa-battery-empty');
    };
    
    if (skidinc.battery.time > (maxCharge * 0.33) && skidinc.battery.oldState !== 'medium') {
        skidinc.battery.oldState = 'medium';
        
        $('#battery, #battery-level').removeClass('low medium high').addClass('medium');
        $('#stats-battery-title i').removeClass().addClass('fa fa-battery-half');
    };
    
    if (skidinc.battery.time > (maxCharge * 0.66) && skidinc.battery.oldState !== 'high') {
        skidinc.battery.oldState = 'high';
        
        $('#battery, #battery-level').removeClass('low medium high').addClass('high');
        $('#stats-battery-title i').removeClass().addClass('fa fa-battery-full');
    };
};

skidinc.battery.buy = function() {
    var cost = skidinc.battery.getCost();
    
    if (skidinc.player.money < cost)
        return skidinc.console.print('<x>ERR</x> not enough money to upgrade your <b>battery</b> (cost <b>$' + fix(cost, 0) + '</b>).');
    if (skidinc.player.money >= cost) {
        skidinc.player.money -= cost;
        skidinc.battery.level++;
        return skidinc.console.print('<z>BATTERY</z> you successfully upgraded your battery to <b>level ' + skidinc.battery.level + '</b>.');
    };
};

skidinc.battery.loop = function(times) {
    if (skidinc.battery.cursorEnter && !skidinc.battery.cursorLeave) {
        var maxCharge = skidinc.battery.getMaxCharge(),
            chargePower = skidinc.battery.getChargePower();
        
        if (skidinc.battery.time < maxCharge)
            skidinc.battery.time += (times / skidinc.fps) * chargePower;
    };
    
    if (skidinc.battery.time > 0)
        skidinc.battery.time -= (times / skidinc.fps);
    else if (skidinc.battery.time <= 0)
        skidinc.battery.time = 0;
    
    skidinc.battery.display();
};

skidinc.battery.domInit = function() {
    $('#battery').mouseenter(function() {
        skidinc.battery.cursorEnter = true;
        skidinc.battery.cursorLeave = false;
    }).mouseleave(function() {
        skidinc.battery.cursorEnter = false;
        skidinc.battery.cursorLeave = true;
    });
};

skidinc.battery.prestige = function() {
    skidinc.battery.level = 1;
    skidinc.battery.time = 0;
};