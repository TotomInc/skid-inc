var skidinc = {};
skidinc.fps = 20;
skidinc.interval = 1000 / skidinc.fps;
skidinc.version = 0.33;

skidinc.before = new Date().getTime();
skidinc.now = new Date().getTime();

skidinc.loops = {};

skidinc.update = function(times) {
    skidinc.console.loop(times);
    skidinc.script.loop(times);
    skidinc.autoscript.loop(times);
    skidinc.battery.loop(times);
    skidinc.prestige.loop(times);
    
    skidinc.stats();
};

skidinc.stats = function() {
    $('#stats-overview #player #money').html('$' + fix(this.player.money, 0));
    $('#stats-overview #player #total-money').html('$' + fix(this.player.totalMoney, 0));
    $('#stats-overview #player #exp').html(fix(this.player.exp, 0) + '/' + fix(this.player.expReq, 0));
    $('#stats-overview #player #total-exp').html(fix(this.player.totalExp, 0));
    $('#stats-overview #player #level').html(fix(this.player.level, 0));
    
    $('#stats-overview #script #executed').html(this.script.isExecuted());
    $('#stats-overview #script #name').html(this.script.getName());
    $('#stats-overview #script #time').html(fix(this.script.time, 2) + 's');
    
    $('#stats-overview #telnet #level').html('Lvl. ' + fix(this.server.owned[this.server.telnet.index], 0));
    $('#stats-overview #telnet #price').html('$' + fix(this.server.getPrice('telnet'), 0));
    
    $('#stats-overview #web #level').html('Lvl. ' + fix(this.server.owned[this.server.web.index], 0));
    $('#stats-overview #web #price').html('$' + fix(this.server.getPrice('web'), 0));
    
    $('#stats-overview #mults #money').html('x' + fix(this.player.getMoneyMult(true), 2));
    $('#stats-overview #mults #exp').html('x' + fix(this.player.getExpMult(true), 2));
    $('#stats-overview #mults #time').html('/' + fix(this.player.getTimeMult(), 2));
    
    $('#stats-overview #prestige #botnet').html(fix(skidinc.player.botnet, 0));
    $('#stats-overview #prestige #botnet-reset').html(fix(skidinc.prestige.botnetOnReset, 0));
    $('#stats-overview #prestige #mult').html('x' + fix(skidinc.prestige.getPrestigeMult(), 2));
    
    $('#stats-battery #battery #level').html(fix(skidinc.battery.level, 0));
    $('#stats-battery #battery #upgrade').html('$' + fix(skidinc.battery.getCost(), 0));
    $('#stats-battery #battery #charge').html(fix(skidinc.battery.time, 2) + '/' + fix(skidinc.battery.getMaxCharge(), 2) + 's');
    $('#stats-battery #battery #charge-power').html('+' + fix(skidinc.battery.getChargePower(), 2) + '/s');
    $('#stats-battery #battery #money').html('x' + fix(skidinc.battery.getMoneyEffect(), 2));
    $('#stats-battery #battery #exp').html('x' + fix(skidinc.battery.getExpEffect(), 2));
    $('#stats-battery #battery #time').html('x' + fix(skidinc.battery.getTimeEffect(), 2));
};

skidinc.core = function() {
    skidinc.now = new Date().getTime();
    
    var elapsed = skidinc.now - skidinc.before,
        times = Math.floor(elapsed / skidinc.interval);
    
    elapsed > skidinc.interval ? skidinc.update(times) : skidinc.update(1);
    
    skidinc.before = new Date().getTime();
};

skidinc.loadingScreen = function() {
    $('#loading-text').typed({
        strings: ['SkidInc is loading, please wait a bit'],
        typedSpeed: -35,
        cursorChar: "_",
        callback: function() {
            $('.typed-cursor').remove();
            $('#loading-dots').typed({
                strings: ['.^750.^750.^750'],
                cursorChar: "_",
                typedSpeed: 0,
                loop: true
            });
        }
    });
};

skidinc.init = function() {
    skidinc.loops.core = setInterval(function() {
        skidinc.core();
    }, skidinc.interval);

    skidinc.loadingScreen();

    setTimeout(function() {
        $('#loader').fadeOut('slow', function() {
            $('#loader').remove();
        });

        skidinc.script.init();
        skidinc.autoscript.init();
        skidinc.buy.init();
        skidinc.achievements.init();
        skidinc.options.init();
        skidinc.kongregate.init();
        skidinc.save.init();
        
        skidinc.domInit();
        
        skidinc.tutorial.begin();
    }, 3500);
};

skidinc.domInit = function() {
    $(document).keydown(function(e){
        if (e.keyCode == 37 && e.shiftKey)
            skidinc.options.changeTab('left');
        
        if (e.keyCode == 39 && e.shiftKey)
            skidinc.options.changeTab('right');
        
        if (e.keyCode == 76 && e.ctrlKey) {
            e.preventDefault();
            skidinc.console.clear();
        };
        
        if (e.keyCode == 81 && e.ctrlKey) {
            e.preventDefault();
            document.querySelector('[contenteditable]').textContent = "";
        };
    });
    
    $('#command-input, #intro-input').on('keypress', function(e) {
        if (e.which == 13) {
            e.preventDefault();
            skidinc.console.parse();
        };
        
        if (e.which == 9) {
            e.preventDefault();
            skidinc.console.autocomplete();
        };
    });
    
    $('.input').keydown(function(objEvent) {
        if (objEvent.keyCode == 9) {
            objEvent.preventDefault();
            skidinc.console.autocomplete();
        };
        
        if (objEvent.keyCode == 38) {
            objEvent.preventDefault();
            skidinc.console.navigateHistory('up');
        };
        
        if (objEvent.keyCode == 40) {
            objEvent.preventDefault();
            skidinc.console.navigateHistory('down');
        };
    });
    
    $('.logs').on('click', function(e) {
        e.preventDefault();
        $('#command-input').focus();
    });
    
    $('.intro').on('click', function(e) {
        e.preventDefault();
        $('#intro-input').focus();
    });
    
    skidinc.console.domInit();
    skidinc.options.domInit();
    skidinc.autoscript.domInit();
    skidinc.achievements.domInit();
    skidinc.battery.domInit();
    skidinc.prestige.domInit();
    skidinc.kongregate.domInit();
    
    skidinc.player.setUsernamePrefix();
    
    $('[data-toggle="tooltip"]').tooltip();
};

$(document).ready(function() {
    skidinc.init();
});