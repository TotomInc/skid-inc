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
            ['hack', '-place', 'jewelry'],
            ['hack', '-place', 'bank'],
            ['hack', '-place', 'trading-center'],
            ['hack', '-place', 'anonymous-hideout'],
            ['hack', '-place', 'deepweb'],
            ['hack', '-place', '-list']
        ],
        exec: [
            'game.hack("sp")',
            'game.hack("stats")',
            'game.hack("help")',
            // places
            'game.hack("mini-market")',
            'game.hack("market")',
            'game.hack("jewelry")',
            'game.hack("bank")',
            'game.hack("trading-center")',
            'game.hack("anonymous-hideout")',
            'game.hack("deepweb")',
            'game.hack("list")'
        ]
    },
    
    'upgrade': {
        name: 'upgrade',
        desc: 'upgrade a type of server.',
        args: [
            ['upgrade'],
            ['upgrade', '-help'],
            ['upgrade', '-info'],
            ['upgrade', 'personal'],
            ['upgrade', 'professional']
        ],
        exec: [
            'game.upgrade("sp")',
            'game.upgrade("help")',
            'game.upgrade("info")',
            'game.upgrade("personal")',
            'game.upgrade("professional")'
        ]
    },

    'buy': {
        name: 'buy',
        desc: 'buy a server to increase hack income.',
        args: [
            ['buy'],
            ['buy', '-server'],
            ['buy', '-help'],
            ['buy', '-info'],
            ['buy', '-hacker'],
            ['buy', '-ability'],
            ['buy', '-server', '-help'],
            ['buy', '-server', 'personal'],
            ['buy', '-server', 'professional'],
            ['buy', '-server', 'vm'],
            ['buy', '-server', 'quickhack'],
            ['buy', '-hacker', '-help'],
            ['buy', '-hacker', '-list'],
            ['buy', '-hacker', 'mini-market-hacker'],
            ['buy', '-hacker', 'market-hacker'],
            ['buy', '-hacker', 'jewelry-hacker'],
            ['buy', '-hacker', 'bank-hacker'],
            ['buy', '-hacker', 'trading-center-hacker'],
            ['buy', '-hacker', 'anonymous-hideout-hacker'],
            ['buy', '-hacker', 'deepweb-hacker'],
            ['buy', '-ability', '-list'],
            ['buy', '-ability', '-help'],
            ['buy', '-ability', 'up-key']
        ],
        exec: [
            'game.buy("sp")',
            'game.buy("serv")',
            'game.buy("help")',
            'game.buy("info")',
            'game.buy("hacker")',
            'game.buy("ability")',
            'game.buy("serv-help")',
            'game.buy("serv-pers")',
            'game.buy("serv-pro")',
            'game.buy("serv-speedhack")',
            'game.buy("serv-quickhack")',
            'game.buy("hacker-help")',
            'game.buy("hacker-list")',
            'game.team.buy("mini-market")',
            'game.team.buy("market")',
            'game.team.buy("jewelry")',
            'game.team.buy("bank")',
            'game.team.buy("trading-center")',
            'game.team.buy("anonymous-hideout")',
            'game.team.buy("deepweb")',
            'game.buy("ability-list")',
            'game.buy("ability-help")',
            'game.abilities.buy("up-key")'
        ]
    },
    
    'hackers': {
        name: 'hackers',
        desc: 'used to perform actions for your hackers.',
        args: [
            ['hackers'],
            ['hackers', '-help'],
            ['hackers', '-status']
        ],
        exec: [
            'game.team.exec("sp")',
            'game.team.exec("help")',
            'game.team.exec("status")'
        ]
    },
    
    'ability': {
        name: 'ability',
        desc: 'abilities are special skills to buy to enhance your hacker power.',
        args: [
            ['ability'],
            ['ability', '-help'],
            ['ability', '-list']
        ],
        exec: [
            'game.abilities.exec("sp")',
            'game.abilities.exec("help")',
            'game.abilities.exec("list")'
        ]
    },
    
    'guide': {
        name: "guide",
        desc: "learn the basics of the game",
        args: [
            ['guide']
        ],
        exec: [
            'game.console.printGuide()'
        ]
    },
    
    'achievements': {
        name: 'achievements',
        desc: 'see all game achievements here.',
        args: [
            ['achievements'],
            ['achievements', '-help'],
            ['achievements', '-list']
        ],
        exec: [
            'game.achievements.exec("sp")',
            'game.achievements.exec("help")',
            'game.achievements.exec("list")'
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
    
    'help': {
        name: 'help',
        desc: 'print a list of all the commands.',
        args: [
            ['help']
        ],
        exec: [
            'game.console.printHelp()'
        ]
    }
};