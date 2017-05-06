skidinc.options = {};
skidinc.options.options = [{
    id: 'theme',
    desc: 'change the terminal theme (text colors, background).',
    accept: ['default', 'stardust', 'matrix'],
    exec: 'skidinc.options.switchTheme'
}, {
    id: 'invert',
    desc: 'toggle color/background inversion on the terminal.',
    accept: ['enable', 'disable'],
    exec: 'skidinc.options.switchInversion'
}, {
    id: 'typed',
    desc: 'toggle the typed text effect.',
    accept: ['enable', 'disable'],
    exec: 'skidinc.options.switchTyped'
}];
skidinc.options.themesUnlocked = [true, false, false];
skidinc.options.typed = true;
skidinc.options.matrixEnabled = false;

skidinc.options.tab = 'overview';
skidinc.options.tabs = ['overview', 'autoscripts', 'battery', 'prestige'];

skidinc.options.secondArgs = [];
skidinc.options.thirdArgs = [];

skidinc.options.list = function() {
    var str = '<y>OPTIONS LIST</y>:<br>';
    
    for (var option in skidinc.options.options) {
        var i = option,
            option = skidinc.options.options[i];
        
        str += '<b>-</b> <z>' + option.id + '</z>: ' + option.desc + ' (<b>' + option.accept.join(', ') + '</b>)<br>';
    };
    
    return skidinc.console.print(str);
};

skidinc.options.help = function() {
    var str = '<y>OPTION HELP</y> change in-game options using this command:<br>' +
        '<b>-</b> Options commands require <b>2 arguments</b>.<br>' +
        '<b>-</b> First argument is the option name.<br>' +
        '<b>-</b> Second argument is one of the supported arguments, displayed with <b>option -l/-list</b> command, between parentheses.';
    
    return skidinc.console.print(str);
};

skidinc.options.execute = function(args) {
    var exists = false,
        o;
    
    for (var option in skidinc.options.options) {
        var i = option,
            option = skidinc.options.options[i];
        
        if (args[0] == option.id) {
            exists = true;
            o = option;
        };
    };
    
    if (!exists)
        return skidinc.console.print('<x>ERR</x> <b>' + args[0] + '</b> is not a valid option name.');
    
    if (exists && args.length == 2)
        return eval(o.exec)(o, args[1]);
};

skidinc.options.switchTheme = function(opt, theme) {
    if (opt.accept.indexOf(theme) == -1)
        return skidinc.console.print('<x>ERR</x> <b>' + theme + '</b> theme doesn\'t exist.');
    
    if (!skidinc.options.themesUnlocked[opt.accept.indexOf(theme)])
        return skidinc.console.print('<x>ERR</x> you need to unlock <b>' + theme + '</b> theme. Themes are only available on the Kongregate version.');
    
    if ($('body').hasClass('inverted'))
        $('body').removeClass().addClass('noselect inverted ' + theme);
    else
        $('body').removeClass().addClass('noselect ' + theme);
    
    $('.game').removeClass().addClass('game ' + theme);
    $('.intro').removeClass().addClass('intro ' + theme);
    
    if (theme == 'matrix' && !skidinc.options.matrixEnabled) {
        skidinc.options.matrixEnabled = true;
        M.initBackground();
    };
    
    if (theme !== 'matrix' && skidinc.options.matrixEnabled) {
        skidinc.options.matrixEnabled = false;
        M.removeBackground();
    };
    
    return skidinc.console.print('<b>' + theme + '</b> theme enabled.');
};

skidinc.options.switchInversion = function(opt, invert, direct) {
    // called from an UI element
    if (direct) {
        if (!$('body').hasClass('inverted')) {
            $('body').addClass('inverted');
            $('.terminal').removeClass().addClass('terminal inverted');
        }
        else {
            $('body').removeClass('inverted');
            $('.terminal').removeClass().addClass('terminal');
        };
        
        return;
    };
    
    if (opt.accept.indexOf(invert) == -1)
        return skidinc.console.print('<x>ERR</x> <b>' + invert + '</b> is not a valid argument for <b>inversion</b> option.');
    
    if (invert == 'disable') {
        if (!$('body').hasClass('inverted'))
            $('body').addClass('inverted');
        $('.terminal').removeClass().addClass('terminal inverted');
    }
    else {
        $('body').removeClass('inverted');
        $('.terminal').removeClass().addClass('terminal');
    }
    
    return skidinc.console.print('Terminal inversion <b>' + invert + 'd</b>.');
};

skidinc.options.switchTyped = function(opt, typed, direct) {
    // called from an UI element
    if (direct) {
        skidinc.options.typed = !skidinc.options.typed;
        return;
    };
    
    if (opt.accept.indexOf(typed) == -1)
        return skidinc.console.print('<x>ERR</x> <b>' + typed + '</b> is not a valid argument for <b>typed</b> option.');
    
    typed == 'enable' ? skidinc.options.typed = true : skidinc.options.typed = false;
    
    return skidinc.console.print('Typed text effect <b>' + typed + 'd</b>.');
};

skidinc.options.changeTab = function(how) {
    if (how == 'right') {
        var i = skidinc.options.tabs.indexOf(skidinc.options.tab),
            tab = (typeof skidinc.options.tabs[i + 1] == 'string') ? skidinc.options.tabs[i + 1] : skidinc.options.tabs[i];
    };

    if (how == 'left') {
        var i = skidinc.options.tabs.indexOf(skidinc.options.tab),
            tab = (typeof skidinc.options.tabs[i - 1] == 'string') ? skidinc.options.tabs[i - 1] : skidinc.options.tabs[i];
    };

    skidinc.options.tab = tab;

    $('.nav-tabs a[href="#stats-' + tab + '"]').tab('show');
};

skidinc.options.domInit = function() {
    $('#option-inversion').on('click', function() {
        skidinc.options.switchInversion(null, null, true)
    });
    
    $('#option-typed').on('click', function() {
        skidinc.options.switchTyped(null, null, true)
    });
    
    $('#option-save').on('click', function() {
        skidinc.save.saveNow(true);
    });
    
    $('#option-erase').on('click', function() {
        skidinc.save.eraseNow();
    });
    
    $('#option-version').html('v' + skidinc.version.toFixed(2));
};

skidinc.options.init = function() {
    skidinc.options.options.forEach(function(i) {
        skidinc.options.secondArgs.push(i.id);
    });
    
    skidinc.options.thirdArgs.push('enable', 'disable');
};