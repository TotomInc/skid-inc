_console.commands = {
    help: {
        name: 'help',
        desc: 'show all commands and their respective help info',
        effect: '_console.printHelp()',
        args: false,
        argsRequired: false,
    },
    arguments: {
        name: 'arguments',
        desc: 'show all arguments available',
        effect: '_console.printArgs()',
        args: false,
        argsRequired: false
    },
    clear: {
        name: 'clear',
        desc: 'clear all text from the console',
        effect: '_console.clear()',
        args: false,
        argsRequired: false,
    },
    hack: {
        name: 'hack',
        desc: 'execute this command to earn money and experience',
        effect: '_console.earn()',
        args: false,
        argsRequired: false,
    },
    'getting-started': {
        name: 'getting-started',
        desc: 'a guide to learn the basics of the game',
        effect: '_console.guide()',
        args: false,
        argsRequired: false,
    }
};
