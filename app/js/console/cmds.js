game.console.cmds = {
    'hack': {
        name: 'hack',
        desc: 'hack a place to earn money and experience.',
        args: [
            ['hack'],
            ['hack', '-stats'],
            ['hack', '-help'],
            // places
            ['hack', '-place', 'mini-market'],
            ['hack', '-place', 'market'],
            ['hack', '-place', '-list']
        ],
        exec: [
            'game.hack("sp")',
            'game.hack("stats")',
            'game.hack("help")',
            // places
            'game.hack("mini-market")',
            'game.hack("market")',
            'game.hack("list")'
        ],
        places: {
            'mini-market': {
                name: 'mini-market',
                minMoneyReward: 150,
                maxMoneyReward: 500,
                minExpReward: 50,
                maxExpReward: 150,
                time: 20,
                reqLevel: 3
            },
            'market': {
                name: 'market',
                minMoneyReward: 6000,
                maxMoneyReward: 20000,
                minExpReward: 200,
                maxExpReward: 450,
                time: 40,
                reqLevel: 15
            },
            'bank': {
                name: 'bank',
                minMoneyReward: 240000,
                maxMoneyReward: 800000,
                minExpReward: 500,
                maxExpReward: 850,
                time: 80,
                reqLevel: 20
            },
            'jewelry': {
                name: 'jewelry',
                minMoneyReward: 9600000,
                maxMoneyReward: 31968000,
                minExpReward: 1000,
                maxExpReward: 1750,
                time: 160,
                reqLevel: 25
            },
            'trading-center': {
                name: 'trading-center',
                minMoneyReward: 115200000,
                maxMoneyReward: 383616000,
                minExpReward: 2500,
                maxExpReward: 5000,
                time: 280,
                reqLevel: 30
            }
        }
    },

    'help': {
        name: 'help',
        desc: 'print a list of all the commands.',
        args: [
            ['help']
        ],
        exec: [
            'game.console.printHelp()'
        ]
    },

    'clear': {
        name: 'clear',
        desc: 'clear console output',
        args: [
            ['clear'],
            ['clear', '-help']
        ],
        exec: [
            'game.console.clear()',
            'game.console.clear("help")'
        ]
    },

    'config': {
        name: 'config',
        desc: 'configure game settings.',
        args: [
            ['config'],
            ['config', '-help'],
            ['config', '-sounds', '0'],
            ['config', '-sounds', '1'],
            ['config', '-background', '0'],
            ['config', '-background', '1']
        ],
        exec: [
            'game.config("sp")',
            'game.config("help")',
            'game.config("sound-off")',
            'game.config("sound-on")',
            'game.config("background-off")',
            'game.config("background-on")'
        ]
    }
};