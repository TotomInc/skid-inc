game.console = {};

g.console.getFirstWord = (command) => {
    var gotWhitespace = command.indexOf(' '),
        firstWord = command.substring(0, (gotWhitespace > 0) ? gotWhitespace : command.length);

    return firstWord;
};

g.console.getWordsAfterFirstWord = (command) => {
    var parts = [];

    if (command.indexOf(' '))
        return command.split(' ');
    else
        return false;
};

g.console.clear = () => {
    $('.text-side').empty();
};

g.console.print = (text, typed) => {
    var rand = Math.floor(Math.random() * 1e9);

    if (g.options.mobile) {
        $('.text-side').prepend('<p id="text-' + rand + '">');
        $('#text-' + rand).html(text);
    }
    else {
        $('.text-side').prepend('<div id="text-' + rand + '" class="typed">');
        $('#text-' + rand).prepend('<p>');
        $('#text-' + rand + ' p').typed({
            strings: [text],
            contentType: 'html',
            typeSpeed: -30,
            callback: function() {
                $('.typed-cursor').remove();
            }
        });
    };
};

g.console.guide = () => {
    g.console.print('Start by typing the <b>hack</b> command to earn some $$$ and experience.<br>' +
        'You can take a look at commands available with the <b>help</b> command.<br>' +
        'But it\'s not the list of all the commands available, a command like <b>hack</b> have many commands hidden on it. Try <b>hack -help</b>.<br>' +
        'When you earned some $$$ (at least more than 50$), you can hire your first script. This script will automatically execute the <b>hack</b> command for you.<br>' +
        'Take a look at the <b>buy</b> command, at this point you should be able to buy your first script.');
};

g.console.credits = () => {
    g.console.print('SkidInc v' + g.options.version + '.<br>' +
        'An idle/incremental-game made by TotomInc.<br>' +
        'An original idea from Emiel.<br>' +
        'Logo made by Tim.<br>' +
        'Thanks to /r/incremental_games and /r/skidinc for their help!<br>' +
        'Subscribe to <a target="_blank" href="http://www.reddit.com/r/skidinc">/r/skidinc</a> for news about the game.');
};

g.console.help = () => {
    for (var i = 0; i < g.console.commands.length; i++)
        g.console.print('<b>' + g.console.commands[i].name + '</b>: ' + g.console.commands[i].desc);
    g.console.print('For more in-depth help about a command, type <b>command -help</b>, it works too for commands with options <b>command cmd -help</b>.');
};

g.console.strictMode = (cmd) => {
    var command = $('#console-input').val();

    if (command !== cmd)
        g.console.print('<b><u>Error</u></b>: you can\'t execute other commands than <b>' + cmd + '</b>.');
    else if (command == cmd)
        g.console.execute(command);

    $('#console-input').val('');
};

g.console.commandsHelp = (command, cmdCmd) => {
    g.console.commands.filter(function(baseCmd) {
        if (baseCmd.name !== command)
            return;

        baseCmd.commands.filter(function(cmd) {
            var split = cmd.cleanCmd.split(' ');

            if (split.indexOf('-help') > -1)
                return;

            if (typeof cmd.options == 'object' && typeof cmdCmd == 'undefined')
                g.console.print('<b>' + cmd.cleanCmd + '</b>: ' + cmd.desc);
            else if (typeof cmd.options == 'object' && typeof cmdCmd == 'string' && cmd.cleanCmd.indexOf(cmdCmd) > 0) {
                for (var i = 0; i < cmd.options.length; i++) {
                    var cmdParts = cmd.cleanCmd.split(' ');
                    cmdParts[cmd.optionsIndex] = cmd.options[i];
                    cmdParts = cmdParts.join(' ');
                    g.console.print('<b>' + cmdParts + '</b>: ' + cmd.customDesc[i])
                };
            }
            else if (typeof cmdCmd == 'undefined')
                g.console.print('<b>' + cmd.cleanCmd + '</b>: ' + cmd.desc);
        });
    });
};

g.console.enter = () => {
    var command = $('#console-input').val();

    if (g.options.sounds) {
        var button = new Audio('app/assets/sounds/keyup.mp3');
        button.volume = 1;
        button.play();
        debug('called')
    };
    g.console.execute(command);

    $('#console-input').val('');
};

g.console.execute = (command) => {
    var firstWord = g.console.getFirstWord(command),
        baseCmdFound = false,
        cmdFound = false,
        emptyCmd = false,
        result;

    if (command == '') {
        emptyCmd = true;
        g.console.errorHandler(command, emptyCmd);
        return;
    };

    g.console.commands.filter(function(baseCmd) {
        var baseCmdRegex = new RegExp(baseCmd.pattern);

        if (!baseCmdRegex.test(firstWord) && !baseCmdFound)
            return;
        else
            baseCmdFound = true;

        baseCmd.commands.filter(function(cmd) {
            if (typeof cmd.options == 'object') {
                var parts = command.split(' '),
                    goodOption = undefined;

                for (var i = 0; i < cmd.options.length; i++) {
                    if (parts[cmd.optionsIndex] == cmd.options[i])
                        goodOption = cmd.options[i];
                };

                if (typeof goodOption == 'string') {
                    var pattern = cmd.pattern,
                        firstPart = pattern.substring(0, pattern.indexOf('[\\w]')),
                        secondPart = pattern.substring(pattern.indexOf('[\\w]') + 4, pattern.length),
                        fullStr = firstPart + goodOption + secondPart,
                        regex = new RegExp(fullStr);

                    if (regex.test(command)) {
                        cmdFound = true;
                        result = cmd;
                        result.cmd = command;
                        return;
                    };
                };
            }
            else {
                var cmdRegex = new RegExp(cmd.pattern);

                if (cmdFound || (!cmdRegex.test(command) && !cmdFound))
                    return;
                else if (cmdRegex.test(command) && !cmdFound) {
                    cmdFound = true;
                    result = cmd;
                };
            };
        });
    });

    if (!cmdFound || !baseCmdFound)
        g.console.errorHandler(command, false, baseCmdFound, cmdFound);
    else {
        if (typeof result.options == 'object') {
            var parts = command.split(' ');

            typeof result.callback == 'function' && result.callback();
            eval(result.execute)(parts[result.optionsIndex]);
        }
        else {
            typeof result.callback == 'function' && result.callback();
            eval(result.execute);
        };
    };
};

g.console.errorHandler = (command, emptyCmd, baseCmdFound, cmdFound) => {
    var firstWord = g.console.getFirstWord(command),
        wordsAfterFirstWord = g.console.getWordsAfterFirstWord(command);

    if (emptyCmd)
        return g.console.print('<b><u>CommandError</u></b>: you can\'t send an empty command.');
    else if (!baseCmdFound)
        return g.console.print('<b><u>CommandError</u></b>: <b>' + firstWord + '</b> is not a recognized command.');
    else if (!cmdFound && wordsAfterFirstWord.length > 1)
        return g.console.print('<b><u>CommandError</u></b>: unrecognized parameters.');
    else if (!cmdFound && wordsAfterFirstWord.length == 1)
        return g.console.print('<b><u>CommandError</u></b>: this command need parameters.');
};

g.console.setDefaultBinds = () => {
    $('.enter, #console-input').unbind();

    $('.enter').on('click', function() {
        g.console.enter();
    });

    $('#console-input').bind('keydown', function(e) {
        if (e.which == 13)
            g.console.enter();
    }).bind(('cut copy paste'), function(e) {
        e.preventDefault();
    });
};

g.console.update = () => {
    $('#console-name').html(g.player.rank);
    $('#console-money').html('$' + fix(g.player.money));
    $('#console-level').html('Level ' + fix(g.player.level, 0));
    $('#console-exp').html('Exp. ' + fix(g.player.exp) + '/' + fix(g.player.expReq));
    $('#script-income').html('Scripts ~$' + fix(g.scripts.getAverageCashPerSec()) + '/sec<br>' +
        '~exp ' + fix(g.scripts.getAverageExpPerSec()) + '/sec');
    $('#player-mults').html('Money mult x' + fix(g.player.getCashMult(), 2) + '<br>' +
        'Exp mult x' + fix(g.player.getExpMult()));
};

g.console.varInit = () => {
    g.console.commands.filter(function(baseCmd) {
        if (baseCmd.name == 'help')
            return;

        baseCmd.commands.push({
            pattern: '^' + baseCmd.name + '[\\s]-help$',
            cleanCmd: baseCmd.name + ' -help',
            desc: 'more in-depth help for command ' + baseCmd.name,
            execute: 'g.console.commandsHelp("' + baseCmd.name + '")'
        });

        baseCmd.commands.filter(function(cmd) {
            if (typeof cmd.options == 'object') {
                var indexFirstS = cmd.pattern.indexOf('\\s]') + 3,
                    indexSecondS = cmd.pattern.indexOf('[\\s', indexFirstS),
                    cmdCmd = cmd.pattern.substring(indexFirstS, indexSecondS);

                baseCmd.commands.push({
                    pattern: '^' + baseCmd.name + '[\\s]' + cmdCmd + '[\\s]-help$',
                    cleanCmd: baseCmd.name + ' ' + cmdCmd + ' -help',
                    desc: 'more in-depth help for command ' + baseCmd.name + ' ' + cmdCmd + '.',
                    execute: 'g.console.commandsHelp("' + baseCmd.name + '", "' + cmdCmd + '")'
                });
            };
        });
    });

    g.options.debug == true && debug('g.console.varInit finished');
};

g.console.domInit = () => {
    $('.infos-side')
        .append('<div id="player-stats">')
        .append('<div id="player-multipliers" class="console-mults">')
        .append('<div id="game-stuff" class="console-bottom">');
    $('#player-stats')
        .append('<p id="console-name">')
        .append('<p id="console-money">')
        .append('<p id="console-level">')
        .append('<p id="console-exp">')
        .append('<p id="script-income">');
    $('#player-multipliers')
        .append('<p id="player-mults">');
    $('#game-stuff')
        .append('<p id="game-version">');
    $('#game-version')
        .html('v' + g.options.version);

    $('.input').hover(function() {
        if ($('.console').hasClass('dark'))
            $('.input-container').css('box-shadow', '0 0 4px #fff');
        else
            $('.input-container').css('box-shadow', '0 0 4px #18FF62');
    }, function() {
        $('.input-container').css('box-shadow', '');
    });

    $('.blinking-arrow').on('click', function() {
        $('#console-input').focus();
    });

    g.console.setDefaultBinds();

    g.options.debug == true && debug('g.console.domInit finished');
};
