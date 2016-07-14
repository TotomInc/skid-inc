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
                'pattern': '^hack[\\s]+-help[\\s]*$',
                'exec': 'game.hack("help")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-stats[\\s]*$',
                'exec': 'game.hack("stats")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-place[\\s]+-list[\\s]*$',
                'exec': 'game.hack("list")',
                'options': false
            }, {
                'pattern': '^hack[\\s]+-place[\\s]+[\\w]*$',
                'exec': 'game.hack("place", option)',
                'options': '(mini_market|market|jewelry|bank|trading_center|anonymous_hideout|deepweb)'
            }, {
                'pattern': '^hack[\\s]+-place[\\s]+-cancel*$',
                'exec': 'game.hack("cancel")',
                'options': false
            }
        ]
    },
    
    {
        name: 'buy',
        desc: 'buy servers, abilities, hire hackers and even more!',
        pattern: '^buy',
        commandRegex: [
            {
                'pattern': '^buy[\\s]*$',
                'exec': 'game.buy("sp")',
                'options': false
            }, {
                'pattern': '^buy[\\s]-help[\\s]*$',
                'exec': 'game.buy("help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-server[\\s]+-help[\\s]*$',
                'exec': 'game.buy("server-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-server[\\s]+-list[\\s]*$',
                'exec': 'game.buy("server-list")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-server[\\s]+[\\w]*$',
                'exec': 'game.buy("server", option)',
                'options': '(personal|professional|vm|quickhack)'
            }, {
                'pattern': '^buy[\\s]+-server[\\s]+-info[\\s]*$',
                'exec': 'game.buy("server-info")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-hacker[\\s]+[\\w]*$',
                'exec': 'game.buy("hacker", option)',
                'options': '(noob|script_kiddie|coder|hax0r|prodigy|elite_hacker|elite_skid)'
            }, {
                'pattern': '^buy[\\s]+-hacker[\\s]+-help[\\s]*$',
                'exec': 'game.buy("hacker-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-hacker[\\s]+-list[\\s]*$',
                'exec': 'game.buy("hacker-list")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-ability[\\s]+-help[\\s]*$',
                'exec': 'game.buy("ability-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-ability[\\s]+[\\w]*$',
                'exec': 'game.buy("ability", option)',
                'options': '(up_key)'
            }, {
                'pattern': '^buy[\\s]+-ability[\\s]+-list[\\s]*$',
                'exec': 'game.buy("ability-list")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-upgrade[\\s]+-help[\\s]*$',
                'exec': 'game.buy("upgrade-help")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-upgrade[\\s]+-info[\\s]*$',
                'exec': 'game.buy("upgrade-info")',
                'options': false
            }, {
                'pattern': '^buy[\\s]+-upgrade[\\s]+[\\w]+[\\s]*$',
                'exec': 'game.buy("upgrade", option)',
                'options': '(personal|professional)'
            }
        ]
    },
    
    {
        name: 'team',
        desc: 'used to perform actions on your hackers.',
        pattern: '^team',
        commandRegex: [
            {
                'pattern': '^team[\\s]*$',
                'exec': 'game.team.exec("sp")',
                'options': false
            }, {
                'pattern': '^team[\\s]+-help[\\s]*$',
                'exec': 'game.team.exec("help")',
                'options': false
            }, {
                'pattern': '^team[\\s]+-status[\\s]*$',
                'exec': 'game.team.exec("status")',
                'options': false
            }, {
                'pattern': '^team[\\s]+-pause[\\s]+[\\w]+[\\s]*$',
                'exec': 'game.team.exec("pause", option)',
                'options': '(noob|script_kiddie|coder|hacker|prodigy|elite_hacker|elite_skid)'
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
                'pattern': '^config[\\s]+-sounds[\\s]+[\\w]*$',
                'exec': 'game.config("triggerSounds", option)',
                'options': '(true|false)'
            }, {
                'pattern': '^config[\\s]+-background[\\s]+[\\w]*$',
                'exec': 'game.config("triggerBackground", option)',
                'options': '(true|false)'
            }, {
                'pattern': '^config[\\s]+-gamemode[\\s]+[\\w]*$',
                'exec': 'game.player.changeGamemode(option)',
                'options': '(normal|hardcore)'
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