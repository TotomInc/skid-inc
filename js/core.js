var skidinc = {};
skidinc.fps = 30;
skidinc.interval = 1000 / skidinc.fps;
skidinc.version = 0.3;

skidinc.before = new Date().getTime();
skidinc.now = new Date().getTime();

skidinc.loops = {};

skidinc.update = function(times) {
    this.script.loop(times);
    this.autoscript.loop(times);
    this.stats();
};

skidinc.stats = function() {
    $('#player #money').html('$' + fix(this.player.money, 2));
    $('#player #total-money').html('$' + fix(this.player.totalMoney, 2));
    $('#player #exp').html(fix(this.player.exp, 0) + '/' + fix(this.player.expReq, 0));
    $('#player #total-exp').html(fix(this.player.totalExp, 0));
    $('#player #level').html(fix(this.player.level, 0));
    
    $('#script #executed').html(this.script.isExecuted());
    $('#script #name').html(this.script.getName());
    $('#script #time').html(fix(this.script.time, 2) + 's');
    
    $('#telnet #level').html('Lvl. ' + fix(this.server.owned[this.server.telnet.index], 0));
    $('#telnet #price').html('$' + fix(this.server.getPrice('telnet')));
    
    $('#web #level').html('Lvl. ' + fix(this.server.owned[this.server.web.index], 0));
    $('#web #price').html('$' + fix(this.server.getPrice('web')));
    
    $('#mults #money').html('x' + fix(this.player.getMoneyMult(), 2));
    $('#mults #exp').html('x' + fix(this.player.getExpMult(), 2));
    $('#mults #time').html('/' + fix(this.player.getTimeMult(), 2));
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
        skidinc.achievements.init();
        skidinc.kongregate.init();
        skidinc.save.init();
        
        skidinc.domInit();
        
        skidinc.tutorial.begin();
    }, 3000);
};

skidinc.domInit = function() {
    if (skidinc.tutorial.enabled)
        $('#intro-input').focus();
    else
        $('#command-input').focus();

    $('#command-input, #intro-input').on('keypress', function(e) {
        if (e.which == 13) {
            e.preventDefault();
            skidinc.console.parse();
        };
    }).bind("cut copy paste", function(e) {
        e.preventDefault();
    });

    $('.terminal').on('click', function(e) {
        e.preventDefault();
        $('#command-input').focus();
    });
    
    $('.intro').on('click', function(e) {
        e.preventDefault();
        $('#intro-input').focus();
    });

    $('body').on('keypress', function(e) {
        if (e.which == 9) {
            e.preventDefault();
            $('#command-input').focus();
        };
    });
    
    $('#cog-watchad').on('click', skidinc.kongregate.watchAd);
    
    skidinc.autoscript.domInit();
    skidinc.achievements.domInit();
    skidinc.player.setUsernamePrefix();
    
    $('[data-toggle="tooltip"]').tooltip();
};

$(document).ready(function() {
    skidinc.init();
});