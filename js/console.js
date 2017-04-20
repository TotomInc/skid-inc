skidinc.console = {};
skidinc.console.typeSpeed = -50;
skidinc.console.inputEnabled = true;
skidinc.console.notAccepted = ['<', '>', '[', ']', '(', ')', ',', ';', '/', '\\', '\'', '"'];
skidinc.console.commands = [{
    id: 'help',
    desc: 'show a list of available commands.',
    effect: 'skidinc.console.help()',
    requireArg: false,
    supportList: false,
    supportHelp: false
}, {
    id: 'clear',
    desc: 'remove all the logs from the terminal.',
    effect: 'skidinc.console.clear()',
    requireArg: false,
    supportList: false,
    supportHelp: false
}, {
    id: 'username',
    desc: 'set your username, can only be used in the tutorial.',
    effect: 'skidinc.player.setUsername',
    requireArg: true,
    argsType: ['base', 'string'],
    supportList: false,
    supportHelp: false
}, {
    id: 'script',
    desc: 'execute a script.',
    effect: 'skidinc.script.execute',
    requireArg: true,
    argsType: ['base', 'string'],
    supportList: true,
    listExec: 'skidinc.script.list',
    supportHelp: true,
    helpExec: 'skidinc.script.help'
}, {
    id: 'buy',
    desc: 'buy things such as new scripts, auto-scripts and servers.',
    effect: 'skidinc.buy.execute',
    requireArg: true,
    argsType: ['base', 'string', 'string'],
    supportList: true,
    listExec: 'skidinc.buy.list',
    supportHelp: true,
    helpExec: 'skidinc.buy.help'
}, {
    id: 'option',
    desc: 'change in-game options.',
    effect: 'skidinc.options.execute',
    requireArg: true,
    argsType: ['base', 'string', 'string'],
    supportList: true,
    listExec: 'skidinc.options.list',
    supportHelp: true,
    helpExec: 'skidinc.options.help'
}];

skidinc.console.checkStr = function(str) {
    for (var i = 0; i < this.notAccepted.length; i++) {
        if (str.indexOf(this.notAccepted[i]) > -1)
            return false;
    };
    
    return true;
};

skidinc.console.autoScroll = function() {
    // used in custom typed.min.js
    var el = (skidinc.tutorial.enabled) ? '#intro-logs' : '#logs';

    $(el).scrollTop(1e6);
};

skidinc.console.commandExist = function(base) {
    var exists,
        index,
        obj = {};
    
    for (var cmd in this.commands) {
        var i = cmd,
            cmd = this.commands[cmd];
        
        obj.exists = (cmd.id == base) ? true : false;
        obj.index = (cmd.id == base) ? i : null;
        
        if (obj.exists)
            return obj;
    };
    
    return obj;
};

skidinc.console.help = function() {
    var str = '<y>HELP</y> you can type <b>[command] -help</b> to get a specific help of a command:<br>';
    
    for (var cmd in this.commands) {
        cmd = this.commands[cmd];
        
        str += '<b>-</b> <z>' + cmd.id + '</z>: ' + cmd.desc + '<br>';
    };
    
    if (skidinc.tutorial.enabled && skidinc.tutorial.step == 1)
        this.print(str, skidinc.tutorial.switchStep(2));
    else
        this.print(str);
};

skidinc.console.parse = function() {
    var str = document.querySelector('[contenteditable]').textContent,
        isStrClean = this.checkStr(str),
        parts = str.split(' '),
        base = parts[0],
        exists = this.commandExist(base).exists,
        index = this.commandExist(base).index,
        command = (typeof this.commands[index] == 'object') ? this.commands[index]: null;
    
    document.querySelector('[contenteditable]').textContent = "";
    
    if (!this.inputEnabled)
        return;
    
    if (!isStrClean)
        return this.print('<w>WARN</w> you can\'t send commands with special characters.');
    
    if (base == '')
        return this.print('<x>ERR</x> you can\'t send empty commands.');
    if (!exists)
        return this.print('<x>ERR</x> <b>' + base + '</b> is an unknown command.');
    
    // first we check if the player put args or not, and if needed or not.
    if (!command.requireArg && parts.length > 1)
        return this.print('<x>ERR</x> <b>' + base + '</b> doesn\'t take any argument.');
    if (command.requireArg && parts.length == 1)
        return this.print('<x>ERR</x> <b>' + base + '</b> require argument(s).');
    
    // if no args: simple command
    if (!command.requireArg && parts.length == 1)
        return eval(command.effect);
    
    // if support help
    if ((parts.indexOf('-h') > -1 || parts.indexOf('-help') > -1) && !command.supportHelp)
        return this.print('<x>ERR</x> <b>' + base + '</b> command doesn\'t support the <b>-h/-help</b> argument.');
    if ((parts.indexOf('-h') > 1 || parts.indexOf('-help') > 1) && command.supportHelp)
        return this.print('<w>WARN</w> <b>-h/-help</b> argument must be the unique argument in the command.');
    if ((parts.indexOf('-h') == 1 || parts.indexOf('-help') == 1) && command.supportHelp)
        return eval(command.helpExec)();
    
    // if support list
    if ((parts.indexOf('-l') > -1 || parts.indexOf('-list') > -1) && !command.supportList)
        return this.print('<x>ERR</x> <b>' + base + '</b> command doesn\'t support the <b>-l/-list</b> argument.');
    if ((parts.indexOf('-l') > 1 || parts.indexOf('-list') > 1) && command.supportList)
        return this.print('<w>WARN</w> <b>-l/-list</b> argument must be the unique argument in the command.');
    if ((parts.indexOf('-l') == 1 || parts.indexOf('-list') == 1) && command.supportList)
        return eval(command.listExec)();
    
    // check args count
    if (command.argsType.length !== parts.length)
        return this.print('<x>ERR</x> an argument is missing.');
    
    // args handling
    if (typeof command.argsType == 'object' && command.argsType.length) {
        var toPass = [];
        
        for (var i = 0; i < command.argsType.length; i++) {
            var arg = parts[i],
                isNan = isNaN(arg);
            
            if (command.argsType[i] == 'base')
                continue;
            
            if (command.argsType[i] == 'number' && isNan)
                return this.print('<x>ERR</x> expected an argument of type <b>number</b> in command <b>' + base + '</b>, instead got argument <b>' + arg + '</b>.');
            
            if (command.argsType[i] == 'string' && !isNan)
                return this.print('<x>ERR</x> expected an argument of type <b>string</b> in command <b>' + base + '</b>, instead got argument <b>' + arg + '</b>.');

            if (i == command.argsType.length - 1)
                return eval(command.effect)(parts.splice(1, parts.length));
        };
    };
};

skidinc.console.print = function(str, callback, force) {
    var time = moment().format('HH:mm:ss'),
        str = '<t>[' + time + ']</t> ' + str,
        el = (skidinc.tutorial.enabled) ? '#intro-logs' : '#logs';
    
    if (skidinc.options.typed && !force) {
        var id = Math.floor(Math.random() * 1e6);
        
        $(el).append('<div id="' + id + '"><span></span></div>');
        
        $('#' + id + ' span').typed({
            strings: [str],
            typeSpeed: skidinc.console.typeSpeed,
            cursorChar: '_',
            callback: function() {
                $('.typed-cursor').remove();
                
                if (typeof callback == 'function')
                    callback();
            }
        });
    }
    else
        $(el).append('<div><span>' + str + '</span></div>');
};

skidinc.console.clear = function() {
    $('#logs').empty();
};