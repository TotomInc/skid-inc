_console.commands = {
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

    'args': {
        name: 'args',
        desc: 'print a list of arguments available.',
        exec: '_console.print("args");',
        args: false
    },

    'hack': {
        name: 'hack',
        desc: 'hack a place to earn money and experience.',
        exec: '',
        args: [['-p'], ['-pl']]
    }
};
