game.console = {
    latest: undefined,
    
    typeLast: function() {
        var last = String(game.console.latest);
        console.log('last: ' + last);
        console.log('typeLast called');
        
        if (game.abilities.list['up-key'].owned) {
            console.log('condition passed');
            $('#console-input').val(last);
        };
    },
    
    executer: function() {
        var input = $('#console-input').val();
        var results = filterArrayOnRegexPattern(input, game.console.cmds);
        
        if (results.length == 1) {
            var result = results[0],
                instances = filterArrayOnRegexPattern(input, result.commandRegex);
            
            if (instances.length == 1) {
                var instance = instances[0],
                    option = '';
                
                if (instance.options) {
                    var optionRegex = new RegExp(instance.options, 'g'),
                        matches = input.match(optionRegex);
                    
                    if (matches.length == 1) {
                        var option = matches[0];
                        eval(instance.exec);
                    }
                    else
                        game.console.print('error', 'Unknown argument value.');
                }
                else
                    eval(instance.exec);
            }
            else
                game.console.print('error', 'Unknown arguments.');
        }
        else
            game.console.print('error', 'Unknown command.');
        
        $('#console-input').val('');
    }
    
    // executer: function() {
    //     var input = $('#console-input').val(),
    //         cmd = input.split(' '),
    //         thisCmd = game.console.cmds[cmd[0]],
    //         execIndex = undefined,
    //         argsExists = false;
        
    //     if (typeof game.console.cmds[cmd[0]] == 'object') {
    //         for (var i = 0; i < thisCmd.args.length; i++) {
    //             var argsCheck = [];
                
    //             for (var e = 0; e < thisCmd.args[i].length; e++) {
    //                 if (cmd.length == thisCmd.args[i].length && cmd[e] == thisCmd.args[i][e] && argsCheck.length < cmd.length) {
    //                     argsCheck.push(true);
    //                     execIndex = i;

    //                     if (argsCheck.length == cmd.length) {
    //                         var thisCmdArgs = thisCmd.exec[i].substring(thisCmd.exec[i].indexOf('"') + 1, thisCmd.exec[i].length - 2);
                            
    //                         argsExists = true;
    //                         eval(thisCmd.exec[execIndex]);
    //                         game.console.latest = input;
    //                         game.setInputTimeout();
                            
    //                         if (game.options.sounds)
    //                             game.sounds.button.play();
                            
    //                         return;
    //                     };
    //                 };
    //             };
    //         };
            
    //         if (!argsExists)
    //             game.console.print('error', game.console.errors.unknownArgs);
    //     } else
    //         game.console.print('error', game.console.errors.unknownCmd);
        
    //     $('#console-input').val('');
    // }
};