game.console = {
    monokai: false,
    black: false,
    afterglow: false,
    fluoro: false,
    
    getFirstWord: function(str) {
        var gotWhitespace = str.indexOf(' '),
            firstWord = str.substring(0, (gotWhitespace > 0) ? gotWhitespace : str.length);

        return firstWord;
    },
    
    parser: function(str) {
        var str = typeof str !== 'string' ? str = $('#console-input').val() : null,
            firstWord = game.console.getFirstWord(str),
            emptyRegex = /^\s*$/,
            commandIndex = null,
            error = [false, false, false, false, false];
        
        if (emptyRegex.test(str)) {
            error[0] = 1;
            game.console.handler(str, error);
            return;
        };
        
        for (var i = 0; i < game.console.commands.length; i++) {
            var commandRegex = new RegExp(game.console.commands[i].pattern);
            
            if (commandRegex.test(firstWord)) {
                commandIndex = i;
                break;
            };
        };
        
        if (typeof commandIndex !== 'number') {
            error[1] = true;
            game.console.handler(str, error);
            return;
        }
        else {
            var splitted = str.split(' '),
                command = game.console.commands[commandIndex],
                argument = command.pattern.indexOf('[\\w]');
                
            if (splitted.length == 1 && !command.optionsNeeded) {
                error = [false, false, false, false, false];
                $('#console-input').val('');
                eval(command.execute);
            }
            else if (splitted.length == 1 && command.optionsNeeded) {
                error[2] = true;
                game.console.handler(str, error);
                return;
            }
            else if (splitted.length > 1 && !command.optionsNeeded) {
                error[3] = true;
                game.console.handler(str, error);
                return;
            }
            else if (splitted.length > 1 && command.optionsNeeded) {
                var found = false;
                
                command.commands.filter(function(cmd) {
                    if (typeof cmd.options == 'object') {
                        var rightOption;

                        if (cmd.options[0] == 'userinput') {
                            if (cmd.userInputExpected == 'number')
                                rightOption = parseInt(splitted[cmd.optionIndex]);
                        }
                        else {
                            for (var i = 0; i < cmd.options.length; i++)
                                if (splitted[cmd.optionIndex] == cmd.options[i])
                                    rightOption = cmd.options[i];
                        };
                        
                        if (typeof rightOption == 'string' || typeof rightOption == 'number') {
                            var pattern = cmd.pattern,
                                newPattern = pattern.substring(0, pattern.indexOf('[\\w]')) + rightOption + pattern.substring(pattern.indexOf('[\\w]') + 4, pattern.length),
                                newPatternRegex = new RegExp(newPattern);
                            
                            error = [false, false, false, false, false];
                            
                            if (newPatternRegex.test(str)) {
                                found = true;
                                $('#console-input').val('');
                                eval(cmd.execute)(rightOption);
                            };
                            
                            return;
                        };
                    }
                    else {
                        var cmdRegex = new RegExp(cmd.pattern);
                        
                        if (found)
                            return;
                        else if (cmdRegex.test(str)) {
                            error = [false, false, false, false, false];
                            found = true;
                            $('#console-input').val('');
                            eval(cmd.execute);
                        }
                        else if (!found)
                            error[4] = true;
                    };
                });
                
                game.console.handler(str, error);
            };
        };
    },
    
    handler: function(str, error, option) {
        var firstWord = game.console.getFirstWord(str);
        
        switch(error.join('-')) {
            case 'true-false-false-false-false':
                game.console.print('You can\'t send empty commands.', 'error');
                break;
            case 'false-true-false-false-false':
                game.console.print('<b>' + firstWord + '</b> is not reconized as a command.', 'error');
                break;
            case 'false-false-true-false-false':
                game.console.print('<b>' + firstWord + '</b> command need options.', 'error');
                break;
            case 'false-false-false-true-false':
                game.console.print('<b>' + firstWord + '</b> command don\'t need options and/or arguments.', 'error');
                break;
            case 'false-false-false-false-true':
                game.console.print('Unknown option/argument or option/argument missing/not expected here, try <b>' + firstWord + ' -help</b>.', 'error');
                break;
        };
        
        $('#console-input').val('');
    },
    
    print: function(str, type) {
        var rand = Math.floor(Math.random() * 1e6),
            totalHeight = 0;

        $('.text-side > div').each(function() {
            totalHeight += $(this).height();
        });
        
        if (totalHeight >= (460 * 2))
            $('.text-side > div')[0].remove();

        if (game.hack.isHacking)
            $('#hack-progress').before('<div id="text-' + rand + '" class="typed">');
        else
            $('.text-side').append('<div id="text-' + rand + '" class="typed">');
        
        typeof type == 'string' ? $('#text-' + rand).append('<p class="' + type + '">') : $('#text-' + rand).append('<p>');
        
        if (game.options.typedEffect) {
            $('#text-' + rand + ' p').typed({
                strings: [str],
                contentType: 'html',
                typeSpeed: -30,
                callback: function() {
                    $('.typed-cursor').remove();
                    $('.text-side').scrollTop(460 * 2);
                }
            });
        }
        else {
            $('#text-' + rand + ' p').html(str);
            $('.text-side').scrollTop(460 * 2);
        };
    },
    
    detailedHelp: function(Command, subCommand) {
        game.console.commands.filter(function(base) {
            if (base.name !== Command)
                return;
            
            base.commands.filter(function(command) {
                var split = command.readable.split(' ');
                
                if (split.indexOf('-help') > -1)
                    return;
                
                if (typeof command.options == 'object' && typeof subCommand == 'undefined')
                    game.console.print('<b>' + command.readable + '</b>: ' + command.desc);
                else if (typeof command.options == 'object' && typeof subCommand == 'string' && command.readable.indexOf(subCommand) > 0) {
                    for (var i = 0; i < command.options.length; i++) {
                        var cmdParts = command.readable.split(' ');
                        cmdParts[command.optionIndex] = command.options[i];
                        cmdParts = cmdParts.join(' ');
                        game.console.print('<b>' + cmdParts + '</b>: ' + command.optionsDesc[i]);
                    };
                }
                else if (typeof subCommand == 'undefined')
                    game.console.print('<b>' + command.readable + '</b>: ' + command.desc);
            });
        });
    },
    
    help: function() {
        for (var i = 0; i < game.console.commands.length; i++)
            game.console.print('<b>' + game.console.commands[i].name + '</b>: ' + game.console.commands[i].desc);
        
        game.console.print('For more in-depth help about a command, type <b>command -help</b>, it works for commands with options <b>command cmd -help</b> too.');
    },
    
    clear: function() {
        if (game.hack.isHacking || game.virus.doingVirus)
            game.console.print('You can\'t clear console while doing a hack/virus.', 'error');
        else
            $('.text-side').empty();
    },
    
    varInit: function() {
        game.console.commands.filter(function(base) {
            if (base.name == 'help' || !base.optionsNeeded)
                return;
            
            base.commands.push({
                pattern: '^' + base.name + '[\\s]-help$',
                readable: base.name + ' -help',
                desc: 'in-depth help for ' + base.name + ' command.',
                execute: 'game.console.detailedHelp("' + base.name + '")'
            });
            
            base.commands.filter(function(command) {
                if (typeof command.options == 'object') {
                    var firstEspace = command.pattern.indexOf('\\s]') + 3,
                        secondEspace = command.pattern.indexOf('[\\s', firstEspace),
                        subCommand = command.pattern.substring(firstEspace, secondEspace);
                    
                    base.commands.push({
                        pattern: '^' + base.name + '[\\s]' + subCommand + '[\\s]-help$',
                        readable: base.name + ' ' + subCommand + ' -help',
                        desc: 'in-depth help for ' + base.name + ' ' + subCommand + ' command.',
                        execute: 'game.console.detailedHelp("' + base.name + '", "' + subCommand + '")'
                    });
                };
            });
        });
    }
};