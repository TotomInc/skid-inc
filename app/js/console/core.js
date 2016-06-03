game.console = {
    executer: function() {
        var input = $('#console-input').val(),
            cmd = input.split(' '),
            thisCmd = game.console.cmds[cmd[0]],
            execIndex = undefined,
            argsExists = false;
        
        if (typeof game.console.cmds[cmd[0]] == 'object') {
            
            for (var i = 0; i < thisCmd.args.length; i++) {
                var argsCheck = [];
                
                for (var e = 0; e < thisCmd.args[i].length; e++) {
                    if (cmd.length == thisCmd.args[i].length && cmd[e] == thisCmd.args[i][e] && argsCheck.length < cmd.length) {
                        argsCheck.push(true);
                        execIndex = i;

                        if (argsCheck.length == cmd.length) {
                            var thisCmdArgs = thisCmd.exec[i].substring(thisCmd.exec[i].indexOf('"') + 1, thisCmd.exec[i].length - 2);
                            
                            argsExists = true;
                            eval(thisCmd.exec[execIndex]);
                            game.setInputTimeout();
                            
                            if (game.options.sounds)
                                game.sounds.button.play();
                            
                            return;
                        };
                    };
                };
            };
            
            if (!argsExists)
                game.console.print('error', game.console.errors.unknownArgs);
        } else
            game.console.print('error', game.console.errors.unknownCmd);
        
        $('#console-input').val('');
    }
};