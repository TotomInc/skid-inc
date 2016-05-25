var proto = {
    cmds: {
        'hack': {
            name: 'hack',
            desc: 'hack a place to earn money and experience',
            canArgs: true,
            needArgs: false,
            args: [
                ['hack', '-place'],
                ['hack', '-place', '-list'],
            ],
            exec: [
                'proto.hack.place',
                'proto.hack.list'
            ]
        },
        
        'help': {
            name: 'help',
            desc: 'print a list of all the commands.',
            canArgs: false,
            needArgs: true
        },
        
        'config': {
            name: 'config',
            desc: 'Set the config of the game.',
            canArgs: true,
            needArgs: true
        },
        
        'guide': {
            name: 'guide',
            desc: 'Read the guide to learn the basics.',
            canArgs: false,
            needArgs: false
        },
        
        'clear': {
            name: 'clear',
            desc: 'clear console output',
            canArgs: false,
            needArgs: false
        }
    },
    
    hack: {
        place: function(args) {
            console.log('hack.place function have been called. args: ' + args);
        },
        
        list: function(args) {
            console.log('hack.list function have been called. args: ' + args);
        }
    },
    
    executer: function() {
        var input = 'hack -place -list',
            cmd = input.split(' '),
            thisCmd = proto.cmds[cmd[0]],
            argsCheck = [],
            execIndex = undefined;
        
        if (typeof proto.cmds[cmd[0]] == 'object') {
            console.log('command detected: ' + cmd[0]);
            console.log('full command detected: ' + input);
            
            for (var i = 0; i < thisCmd.args.length; i++) {
                for (var e = 0; e < thisCmd.args[i].length; e++) {
                    if (cmd.length == thisCmd.args[i].length && cmd[e] == thisCmd.args[i][e] && argsCheck.length < cmd.length) {
                        console.log('command passed successfully test: ' + e);
                        
                        argsCheck.push(true);
                        execIndex = i;
                    };
                };
            };
            
            if (argsCheck.length == cmd.length) {
                console.log('exec index: ' + execIndex);
                console.log('running function: ' + thisCmd.exec[execIndex]);
                
                eval(thisCmd.exec[execIndex])(cmd);
            };
        } else {
            console.log('unknown command');
        };
    }
};