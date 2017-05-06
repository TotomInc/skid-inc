skidinc.achievements = {};
skidinc.achievements.categories = [];
skidinc.achievements.owned = [];
skidinc.achievements.ach = [];

skidinc.achievements.getOwnedAmount = function() {
    var owned = 0;
    
    for (var i = 0; i < skidinc.achievements.owned.length; i++) {
        if (skidinc.achievements.owned[i])
            owned++;
    };
    
    return owned;
};

skidinc.achievements.getLast = function() {
    var list = [];
    
    for (var e = 0; e < skidinc.achievements.categories.length; e++) {
        var category = skidinc.achievements.categories[e];
        
        for (var i = 0; i < skidinc.achievements.ach.length; i++) {
            var achievement = skidinc.achievements.ach[i],
                owned = skidinc.achievements.owned[i];
            
            if (!owned && achievement.category == category) {
                list.push(achievement);
                i = skidinc.achievements.ach.length;
            };
        };
    };
    
    return list;
};

skidinc.achievements.create = function(name, desc, category, icon, varCheck, typeCheck, amount) {
    this.name = name;
    this.desc = desc;
    this.category = category;
    this.icon = icon;
    this.varCheck = varCheck;
    this.typeCheck = typeCheck;
    this.amount = amount;
};

skidinc.achievements.init = function() {
    skidinc.achievements.ach = [
        new skidinc.achievements.create('Kiddie I', 'Execute 10 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 10),
        new skidinc.achievements.create('Kiddie II', 'Execute 50 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 50),
        new skidinc.achievements.create('Kiddie III', 'Execute 250 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 250),
        new skidinc.achievements.create('Kiddie IV', 'Execute 1,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 1000),
        new skidinc.achievements.create('Kiddie V', 'Execute 2,500 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 2500),
        new skidinc.achievements.create('Hacker I', 'Execute 10,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 10000),
        new skidinc.achievements.create('Hacker II', 'Execute 75,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 75000),
        new skidinc.achievements.create('Hacker III', 'Execute 500,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 500000),
        new skidinc.achievements.create('Hacker IV', 'Execute 2,500,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 2500000),
        new skidinc.achievements.create('Hacker V', 'Execute 10,000,000 scripts.', 'scriptsExecuted', 'fa-list-alt', 'skidinc.script.totalCompleted', '>=', 10000000),
        
        new skidinc.achievements.create('Experienced I', 'Reach level 5.', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 5),
        new skidinc.achievements.create('Experienced II', 'Reach level 10.', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 10),
        new skidinc.achievements.create('Experienced III', 'Reach level 25.', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 25),
        new skidinc.achievements.create('The Answer', 'Reach level 42.', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 42),
        new skidinc.achievements.create('Mentor I', 'Reach level 50.', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 50),
        new skidinc.achievements.create('Mentor II', 'Reach level 60.', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 60),
        new skidinc.achievements.create('Mentor III', 'Reach level 70.', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 70),
        new skidinc.achievements.create('Mentor IV', 'Reach level 80.', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 80),
        new skidinc.achievements.create('Mentor V', 'Reach level 90.', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 90),
        new skidinc.achievements.create('Maximam Solis', 'Reach level 100 (max level).', 'levelReached', 'fa-star', 'skidinc.player.level', '>=', 100),
        
        new skidinc.achievements.create('Earner I', 'Earn a total of $15,000.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 15000),
        new skidinc.achievements.create('Earner II', 'Earn a total of $500,000.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 500000),
        new skidinc.achievements.create('Earner III', 'Earn a total of $1,000,000.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 1000000),
        new skidinc.achievements.create('Earner VI', 'Earn a total of $50,000,000.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 50000000),
        new skidinc.achievements.create('Earner V', 'Earn a total of $750,000,000.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 750000000),
        new skidinc.achievements.create('Banker I', 'Earn a total of $10.000b.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 10000000000),
        new skidinc.achievements.create('Banker II', 'Earn a total of $100.000b.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 100000000000),
        new skidinc.achievements.create('Banker III', 'Earn a total of $1.000t.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 1000000000000),
        new skidinc.achievements.create('Banker IV', 'Earn a total of $100.000t.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 100000000000000),
        new skidinc.achievements.create('Banker V', 'Earn a total of $10.000q.', 'totalMoney', 'fa-money', 'skidinc.player.totalMoney', '>=', 10000000000000000),
        
        new skidinc.achievements.create('Webmaster I', 'Upgrade your web server to level 1.', 'webLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("web")]', '>=', 1),
        new skidinc.achievements.create('Webmaster II', 'Upgrade your web server to level 25.', 'webLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("web")]', '>=', 25),
        new skidinc.achievements.create('Webmaster III', 'Upgrade your web server to level 50.', 'webLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("web")]', '>=', 50),
        new skidinc.achievements.create('Webmaster IV', 'Upgrade your web server to level 100.', 'webLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("web")]', '>=', 100),
        new skidinc.achievements.create('Webmaster V', 'Upgrade your web server to level 200.', 'webLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("web")]', '>=', 200),
        
        new skidinc.achievements.create('Virtualization I', 'Upgrade your telnet server to level 1.', 'telnetLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("telnet")]', '>=', 1),
        new skidinc.achievements.create('Virtualization II', 'Upgrade your telnet server to level 25.', 'telnetLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("telnet")]', '>=', 25),
        new skidinc.achievements.create('Virtualization III', 'Upgrade your telnet server to level 50.', 'telnetLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("telnet")]', '>=', 50),
        new skidinc.achievements.create('Virtualization IV', 'Upgrade your telnet server to level 75.', 'telnetLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("telnet")]', '>=', 75),
        new skidinc.achievements.create('Virtualization V', 'Upgrade your telnet server to level 100 (max level).', 'telnetLevel', 'fa-server', 'skidinc.server.owned[skidinc.server.servers.indexOf("telnet")]', '>=', 100),
        
        new skidinc.achievements.create('Charge I', 'Upgrade your battery to level 5.', 'batteryLevel', 'fa-battery-full', 'skidinc.battery.level', '>=', 5),
        new skidinc.achievements.create('Charge II', 'Upgrade your battery to level 10.', 'batteryLevel', 'fa-battery-full', 'skidinc.battery.level', '>=', 10),
        new skidinc.achievements.create('Charge III', 'Upgrade your battery to level 25.', 'batteryLevel', 'fa-battery-full', 'skidinc.battery.level', '>=', 25),
        new skidinc.achievements.create('Charge IV', 'Upgrade your battery to level 50.', 'batteryLevel', 'fa-battery-full', 'skidinc.battery.level', '>=', 50),
        new skidinc.achievements.create('Charge V', 'Upgrade your battery to level 75.', 'batteryLevel', 'fa-battery-full', 'skidinc.battery.level', '>=', 75)
    ];
    
    for (var i = 0; i < skidinc.achievements.ach.length; i++) {
        var achievement = skidinc.achievements.ach[i];
        
        skidinc.achievements.owned.push(false);
        
        if (skidinc.achievements.categories.indexOf(achievement.category) == -1)
            skidinc.achievements.categories.push(achievement.category);
    };
    
    skidinc.loops.achievements = setInterval(function() {
        skidinc.achievements.loop();
    }, 1000);
};

skidinc.achievements.list = function() {
    var str = '',
        achievements = skidinc.achievements.getLast(),
        owned = skidinc.achievements.getOwnedAmount(),
        max = skidinc.achievements.ach.length;
    
    str += '<y>ACHIEVEMENTS</y> ' + owned + '/' + max + ' completed:<br>';
    
    for (var i = 0; i < achievements.length; i++) {
        var ach = achievements[i];
        
        str += '<b>*</b> <z>' + ach.name + '</z>: ' + ach.desc + '<br>';
    };
    
    return skidinc.console.print(str);
};

skidinc.achievements.saveInit = function() {
    if (skidinc.achievements.ach.length !== skidinc.achievements.owned.length) {
        var diff = skidinc.achievements.ach.length - skidinc.achievements.owned.length;
        
        for (var i = 0; i < diff; i++)
            skidinc.achievements.owned.push(false);
    };
};

skidinc.achievements.update = function() {
    var achievements = skidinc.achievements.getLast(),
        owned = skidinc.achievements.getOwnedAmount(),
        max = skidinc.achievements.ach.length;
    
    $('#achievements-owned').html('Achievements owned (' + owned + '/' + max + '):');
    
    for (var i = 0; i < achievements.length; i++) {
        var ach = achievements[i];
        
        // tether.io change title attr to data-original-title when loaded...
        $('#achievement-' + ach.category + '-tooltip').attr('data-original-title', ach.desc);
        $('#achievement-' + ach.category + '-name').html(ach.name);
    };
};

skidinc.achievements.domInit = function() {
    var achievements = skidinc.achievements.getLast(),
        owned = skidinc.achievements.getOwnedAmount(),
        max = skidinc.achievements.ach.length;
    
    $('#achievements-owned').html('Achievements owned (' + owned + '/' + max + '):');
    $('#achievements-content').append('<div id="achievements-row" class="row"></div>');
    
    for (var i = 0; i < achievements.length; i++) {
        $('#achievements-row').append('<div id="achievement-' + achievements[i].category + '" class="col-md-2 achievement-col">' +
            '<div id="achievement-' + achievements[i].category + '-tooltip" class="achievement-block" data-animation="false" data-toggle="tooltip" data-placement="top" title="' + achievements[i].desc + '">' +
                '<i class="fa ' + achievements[i].icon + '" aria-hidden="true"></i>' +
            '</div>' +
            '<p id="achievement-' + achievements[i].category + '-name">' + achievements[i].name + '</p>' +
        '</div>');
    };
};

skidinc.achievements.loop = function() {
    for (var i = 0; i < skidinc.achievements.ach.length; i++) {
        var achievement = skidinc.achievements.ach[i],
            owned = skidinc.achievements.owned[i];
        
        if (!owned) {
            var test = eval(achievement.varCheck + achievement.typeCheck + achievement.amount);
            
            if (test) {
                skidinc.achievements.owned[i] = true;
                skidinc.console.print('<y>ACHIEVEMENT</y> you earned a new achievement: <b>' + achievement.name + ', ' + achievement.desc.toLowerCase() + '</b>');
                
                skidinc.achievements.update();
            };
        };
    };
};