_console.commands = {
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
    
    'config': {
        name: 'config',
        desc: 'print a list of configs commands.',
        exec: '_console.config',
        args: {
            '-sound': {
                name: '-sound',
                desc: 'enable/disable sound.',
                example: 'config -sound 0'
            },
            '-whaow': {
                name: '-whaow',
                desc: 'secret config.',
                example: 'config -whaow 1'
            }
        }
    },

    'hack': {
        name: 'hack',
        desc: 'hack a place to earn money and experience.',
        exec: '_console.hack',
        args: {
            '-place': {
                name: '-place',
                desc: 'hack the selected place.',
                example: 'hack -place market'
            },
            '-list': {
                name: '-list',
                desc: 'show a list of hackable places.',
                example: 'hack -place -list'
            }
        },
        
        places: {
            'mini-market': {
                name: 'mini-market',
                minMoney: 400,
                maxMoney: 1600,
                minExp: 75,
                maxExp: 175,
                reqLevel: 3,
                time: 20
            },
            'market': {
                name: 'market',
                minMoney: 10000,
                maxMoney: 35000,
                minExp: 250,
                maxExp: 750,
                reqLevel: 13,
                time: 30
            }
        }
    }
};
