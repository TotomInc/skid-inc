game.console.cmds = [
    {
        // DON'T CHANGE HACK COMMAND PLACE IN THIS ARRAY!
        // IT MUST BE IN INDEX 0!
        name: 'hack',
        desc: 'hack a place to earn money and experience.',
        pattern: '^hack',
        commandRegex: [
            {
                'pattern': '^hack[\\s]*$',
                'exec': 'game.hack("sp")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-help*$',
                'exec': 'game.hack("help")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-stats*$',
                'exec': 'game.hack("stats")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-list*$',
                'exec': 'game.hack("list")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-place[\\s]+[\\w]*$',
                'exec': 'game.hack("place", option)',
                'options': '(mini_market|market|jewelry|bank|trading_center|anonymous_hideout|deepweb)'
            }
        ]
    },
    
    {
        name: 'upgrade',
        desc: 'upgrade your servers for an higher income.',
        pattern: '^upgrade',
        commandRegex: [
            {
                'pattern': '^upgrade[\\s]*$',
                'exec': 'game.upgrade("sp")',
                'options': false
            }, {
                'pattern': '^upgrade[\\s]+-help*$',
                'exec': 'game.upgrade("help")',
                'options': false
            }, {
                'pattern': '^upgrade[\\s]+-info*$',
                'exec': 'game.upgrade("info")',
                'options': false
            }, {
                'pattern': '^upgrade[\\s]+[\\w]*$',
                'exec': 'game.upgrade("server", option)',
                'options': '(personal|professional)'
            }
        ]
    },
    
    {
        name: 'buy',
        desc: 'buy servers, abilities or hire hackers to increase your hack income.',
        pattern: '^buy',
        commandRegex: [
            {
                'pattern': '^buy[\\s]*$',
                'exec': 'game.buy("sp")',
                'options': false
            }, {
                'pattern': '^buy[\\s]-help*$',
                'exec': 'game.buy("help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-info*$',
                'exec': 'game.buy("info")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-server[\\s]+-help*$',
                'exec': 'game.buy("server-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-server[\\s]+[\\w]*$',
                'exec': 'game.buy("server", option)',
                'options': '(personal|professional|vm|quickhack)'
            }, {
                'pattern': '^buy[\\s]+-hacker[\\s]+[\\w]*$',
                'exec': 'game.buy("hacker", option)',
                'options': '(mini_market|market|jewelry|bank|trading_center|anonymous_hideout|deepweb)'
            }, {
                'pattern': '^buy[\\s]+-hacker[\\s]+-help*$',
                'exec': 'game.buy("hacker-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-hacker[\\s]+-list*$',
                'exec': 'game.buy("hacker-list")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-ability[\\s]+-help*$',
                'exec': 'game.buy("ability-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-ability[\\s]+[\\w]*$',
                'exec': 'game.buy("ability", option)',
                'options': '(key_up)'
            }, {
                'pattern': '^buy[\\s]+-ability[\\s]+-list*$',
                'exec': 'game.buy("ability-list")',
                'options': false
            }
        ]
    },
    
    {
        name: 'hackers',
        desc: 'used to perform actions on your hackers.',
        pattern: '^hackers',
        commandRegex: [
            {
                'pattern': '^hackers[\\s]*$',
                'exec': 'game.team.exec("sp")',
                'options': false
            }, {
                'pattern': '^hackers[\\s]+-help*$',
                'exec': 'game.team.exec("help")',
                'options': false
            }, {
                'pattern': '^hackers[\\s]+-status*$',
                'exec': 'game.team.exec("status")',
                'options': false
            }
        ]
    },
    
    {
        name: 'ability',
        desc: 'abilities are special skills to buy to enhance your hacker power.',
        pattern: '^ability',
        commandRegex: [
            {
                'pattern': '^ability[\\s]*$',
                'exec': 'game.abilities.exec("sp")',
                'options': false
            }, {
                'pattern': '^ability[\\s]+-help*$',
                'exec': 'game.abilities.exec("help")',
                'options': false
            }, {
                'pattern': '^ability[\\s]+-list*$',
                'exec': 'game.abilities.exec("list")',
                'options': false
            }
        ]
    },
    
    {
        name: 'achievements',
        desc: 'track your progress through the game.',
        pattern: '^achievements',
        commandRegex: [
            {
                'pattern': '^achievements[\\s]*$',
                'exec': 'game.achievements.exec("sp")',
                'options': false
            }, {
                'pattern': '^achievements[\\s]+-help[\\s]*$',
                'exec': 'game.achievements.exec("help")',
                'options': false
            }, {
                'pattern': '^achievements[\\s]+-list[\\s]*$',
                'exec': 'game.achievements.exec("list")',
                'options': false
            }
        ]
    },
    
    {
        name: 'config',
        desc: 'configure game settings.',
        pattern: '^config',
        commandRegex: [
            {
                'pattern': '^config[\\s]*$',
                'exec': 'game.config("sp")',
                'options': false
            }, {
                'pattern': '^config[\\s]+-help[\\s]*$',
                'exec': 'game.config("help")',
                'options': false
            }, {
                'pattern': '^config[\\s]+-sounds[\\s]+[\\w]+[\\s]*$',
                'exec': 'game.config("triggerSounds")',
                'options': '(true|false)'
            }, {
                'pattern': '^config[\\s]+-background[\\s]+[\\w]+[\\s]*$',
                'exec': 'game.config("triggerBackground", option)',
                'options': '(true|false)'
            }
        ]
    },
    
    {
        name: 'clear',
        desc: 'clear console output.',
        pattern: '^clear',
        commandRegex: [
            {
                "pattern": "^clear[\\s]*$",
                "exec": "game.console.clear()",
                "options": false
            }, {
                "pattern": "^clear[\\s]+-help[\\s]*$",
                "exec": "game.console.clear('help')",
                "options": false
            }
        ]
    },
    
    {
        name: 'help',
        desc: 'print a list of all the commands.',
        pattern: '^help',
        commandRegex: [
            {
                "pattern": "^help[\\s]*$",
                "exec": 'game.console.printHelp()',
                "options": false
            }
        ]
    },
    
    {
        name: 'guide',
        desc: 'learn to play this game if you are not familiar with the command line interface.',
        pattern: '^guide',
        commandRegex: [
            {
                'pattern': '^guide[\\s]*$',
                'exec': 'game.console.printGuide()',
                'options': false
            }
        ]
    }
];