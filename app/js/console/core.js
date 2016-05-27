game.console = {
    cmds: {
        'hack': {
            name: 'hack',
            desc: 'hack a place to earn money and experience',
            canArgs: true,
            needArgs: false,
            args: [
                ['hack'],
                // basic hack
                ['hack', '-xs'],
                ['hack', '-sm'],
                ['hack', '-md'],
                ['hack', '-lg'],
                // places
                ['hack', '-place', 'mini-market'],
                ['hack', '-place', 'market'],
                ['hack', '-place', '-list'],
            ],
            exec: [
                'game.console.hack("sp")',
                // basic hack
                'game.console.hack("xs")',
                'game.console.hack("sm")',
                'game.console.hack("md")',
                'game.console.hack("lg")',
                'game.console.hack("xl")',
                // places
                'game.console.hack("mini-market")',
                'game.console.hack("market")',
                'game.console.hack("list")'
            ]
        },
        
        'help': {
            name: 'help',
            desc: 'print a list of all the commands.',
            canArgs: false,
            needArgs: true
        },
        
        'clear': {
            name: 'clear',
            desc: 'clear console output',
            canArgs: false,
            needArgs: false
        }
    },
    
    executer: function() {
        var input = $('#console-input').val(),
            cmd = input.split(' '),
            thisCmd = game.console.cmds[cmd[0]],
            execIndex = undefined,
            argsExists = false;
        
        if (typeof game.console.cmds[cmd[0]] == 'object') {
            console.info('full command detected: ' + input + '\n', cmd);
            console.info('command detected: ' + cmd[0] + '\n', thisCmd);
            
            for (var i = 0; i < thisCmd.args.length; i++) {
                var argsCheck = [];
                
                for (var e = 0; e < thisCmd.args[i].length; e++) {
                    if (cmd.length == thisCmd.args[i].length && cmd[e] == thisCmd.args[i][e] && argsCheck.length < cmd.length) {
                        console.info('command successfully passed test: ' + e, cmd[e]);
                        
                        argsCheck.push(true);
                        execIndex = i;

                        if (argsCheck.length == cmd.length) {
                            var thisCmdArgs = thisCmd.exec[i].substring(thisCmd.exec[i].indexOf('"') + 1, thisCmd.exec[i].length - 2);
                            
                            console.info('exec index: ' + execIndex);
                            console.info('running function: ' + thisCmd.exec[execIndex]);
                            
                            argsExists = true;
                            eval(thisCmd.exec[execIndex], thisCmdArgs);
                            game.setInputTimeout();
                            
                            $('#console-input').val('');
                            
                            return;
                        };
                    };
                };
            };
            
            if (!argsExists)
                console.log(game.console.errors.unknownArgs);
        } else
            console.log(game.console.errors.unknownCmd);
    }
};