_console.commands = {
    // if arguments: no parenthesis
    
    'clear': {
        name: 'clear',
        desc: 'clear console output',
        exec: '_console.clear',
        args: []
    },
    
    'help': {
        name: 'help',
        desc: 'print a list of all the commands.',
        exec: '_console.print("help");',
        args: false
    },

    'guide': {
        name: 'guide',
        desc: 'read the guide to learn the basics.',
        exec: '_console.print("guide");',
        args: false
    },

    'hack': {
        name: 'hack',
        desc: 'hack a place to earn money and experience.',
        exec: '_console.hack',
        args: [['hack', '-p'], ['hack', '-pl']]
    },
    
    'config': {
        name: 'config',
        desc: 'print a list of configs commands.',
        exec: '_console.config',
        args: [['config', '-sound'], ['config', '-volume']]
    },
};
