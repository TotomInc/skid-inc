game.options = {
    fps: 30,
    interval: undefined,
    intervals: new Object(),
    now: new Date().getTime(),
    before: new Date().getTime(),

    debug: true,
    version: 0.2,
    vue: 'default',

    whatOS: undefined,
    isOpera: false,
    isFirefox: false,
    isSafari: false,
    isIE: false,
    isEdge: false,
    isChrome: false,
    isBlink: false
};

g.options.toggleBackground = (toggle) => {
    if (toggle == 'enable') {
        $('#matrix').fadeIn('slow');
        g.console.print('Matrix effect enabled.');
    }
    else {
        $('#matrix').fadeOut('slow');
        g.console.print('Matrix effect disabled.')
    };
};

g.options.switchTheme = (theme) => {
    if (theme == 'dark') {
        $('.layer').fadeOut('slow', function() {
            $('.console').removeClass('green').addClass('dark');
        });
        g.console.print('Console theme changed to dark.');
    }
    else if (theme == 'green') {
        $('.console').removeClass('dark').addClass('green');
        $('.layer').fadeIn('slow');
        g.console.print('Console theme changed to green.');
    };
};

g.options.switchDifficulty = (difficulty) => {
    if (g.player.isNew) {
        g.player.isNew = false;
        g.player.difficulty = difficulty;
        g.console.print('Difficulty changed to ' + difficulty + '.');
        g.console.print('Now that you picked your difficulty, you can now learn the game if you are not familiar with command line interfaces.<br>' +
                'I have written a small guide to introduce you into the game, type <b>guide</b> command.');
    }
    else
        g.console.print('Sorry, you can\'t change difficulty anymore. It can only be done for new players when starting the game.');
};

g.options.changeVue = (vue) => {
    if (vue == 'default') {
        $('.text-side').empty();

        g.console.print('Back to default vue, you can now send commands.');
        g.console.setDefaultBinds();
        g.options.vue = 'default';
    }
    else if (vue == 'hackers_progress') {
        if (g.hack.isHacking)
            return g.console.print('Wait for your hack to finish before changing vue.');

        $('.text-side').empty();
        $('#console-input').unbind()
        .bind('keydown', function(e) {
            if (e.which == 13)
                g.console.strictMode('options display default');
        });

        for (var hacker in g.hackers) {
            if (typeof g.hackers[hacker] == 'object' && g.hackers[hacker].owned)
                $('.text-side').append('<p id="' + hacker + '-progress">');
        };

        g.options.vue = 'hackers_progress';
        g.console.print('Type <b>options display default</b> to write commands and leave this screen.');
    };
};

g.options.saveManager = (what) => {
    if (what == 'save')
        return g.save.save(true);
    else if (what == 'load')
        return g.save.load(true);
    else if (what == 'erase')
        return g.save.erase();
    else
        g.console.print('<b><u>Error</u></b>: unknown save action.');
};

g.options.varInit = () => {
    // os detection
    if (navigator.appVersion.indexOf("Win")!=-1)
        g.options.whatOS = "Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1)
        g.options.whatOS = "MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1)
        g.options.whatOS = "UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1)
        g.options.whatOS = "Linux";

    if (g.options.matrix)
        $('#matrix').css('display', 'none');
    else
        $('#matrix').fadeIn('slow');

    // browser detection
    g.options.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    g.options.isFirefox = typeof InstallTrigger !== 'undefined';
    g.options.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    g.options.isIE = /*@cc_on!@*/false || !!document.documentMode;
    g.options.isEdge = !g.options.isIE && !!window.StyleMedia;
    g.options.isChrome = !!window.chrome && !!window.chrome.webstore;
    g.options.isBlink = (g.options.isChrome || g.options.isOpera) && !!window.CSS;

    g.options.interval = Math.ceil(1000 / g.options.fps);
    g.options.intervals.core = setInterval(function() {
        g.loop();
    }, g.options.interval);
    g.options.intervals.jobs = setInterval(function() {
        g.jobs.spawn();
    }, g.jobs.interval);
    g.options.intervals.save = setInterval(function() {
        g.save.save(false, true);
    }, g.save.interval);

    window.onbeforeunload = function() {
        g.save.save();
    };

    g.options.debug == true && debug('g.options.varInit finished');
};