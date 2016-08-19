/*****
 *  Commands constructor:
 *
 *  object
 *      name:string
 *      desc:string
 *      pattern:regexString
 *      commands:array
 *          object:
 *              pattern:regexString : options must be tagged as [\\w] flag
 *                                  : must have [\\s] after the [\\w] flag
 *
 *              execute:string : if got an option, don't add parenthesis at the end
 *              cleanCmd:string : command without regex pattern, if options add (option) at right place
 *
 *              desc:string     : if cmd got options, desc is a global desc of the command with options
 *                              : else it explain the command
 *
 *              callback:function : a function called when the command have been executed
 *
 *              options:array : commands only have 1 option max. but can have multiple option on the array (at the same index)
 *
 *              optionsIndex:number : number 0-indexed, required if got options
 *
 *              customDesc:array : required if got options, each string in array match option index
 *
 *  Each command have cmd -help added on g.console.varInit
 *  Each command with an option have its specific help section added on g.console.varInit
 *****/

g.console.commands = [
    {
        name: 'hack',
        desc: 'hack things to earn money, experience and reputation.',
        pattern: '^hack$',
        commands: [
            {
                pattern: '^hack$',
                cleanCmd: 'hack',
                desc: 'quickhack, instant cash and experience, no cooldown.',
                execute: 'g.hack.quickhack()'
            },
            {
                pattern: '^hack[\\s]-p[\\s][\\w]$',
                cleanCmd: '^hack -p (option)',
                execute: 'g.hack.place',
                desc: 'hack a place to earn more $$$ and experience, can take some time depending the place.',
                customDesc: [
                    '~$' + fix(g.places.getAverageCash('mini_market')) + ', ~exp ' + fix(g.places.getAverageExp('mini_market')) + ', ' + fix(g.places.getTime('mini_market'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('market')) + ', ~exp ' + fix(g.places.getAverageExp('market')) + ', ' + fix(g.places.getTime('market'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('jewelry')) + ', ~exp ' + fix(g.places.getAverageExp('jewelry')) + ', ' + fix(g.places.getTime('jewelry'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('bank')) + ', ~exp ' + fix(g.places.getAverageExp('bank')) + ', ' + fix(g.places.getTime('bank'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('trading_center')) + ', ~exp ' + fix(g.places.getAverageExp('trading_center')) + ', ' + fix(g.places.getTime('trading_center'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('anonymous_hideout')) + ', ~exp ' + fix(g.places.getAverageExp('anonymous_hideout')) + ', ' + fix(g.places.getTime('anonymous_hideout'), 0) + ' sec.',
                    '~$' + fix(g.places.getAverageCash('deepweb')) + ', ~exp ' + fix(g.places.getAverageExp('deepweb')) + ', ' + fix(g.places.getTime('deepweb'), 0) + ' sec.'
                ],
                options: [
                    'mini_market',
                    'market',
                    'jewelry',
                    'bank',
                    'trading_center',
                    'anonymous_hideout',
                    'deepweb'
                ],
                optionsIndex: 2
            }
        ]
    },

    {
        name: 'buy',
        desc: 'buy things such as bots and servers to automatize tasks.',
        pattern: '^buy$',
        commands: [
            {
                pattern: '^buy[\\s]script[\\s][\\w]',
                cleanCmd: 'buy script (option)',
                execute: 'g.scripts.buy',
                desc: 'buy some scripts to automatize tasks.',
                customDesc: [
                    'a script execute the <b>hack</b> command ' + g.scripts.script.effect + ' time/sec, cost $' + fix(g.scripts.getPrice('script')) + '.',
                    'a bot execute the <b>hack</b> command ' + g.scripts.bot.effect + ' times/sec, cost $' + fix(g.scripts.getPrice('bot')) + '.',
                    'a vm execute the <b>hack</b> command ' + g.scripts.vm.effect + 'times/sec, cost $' + fix(g.scripts.getPrice('vm')) + '.',
                    'a raspberry execute the <b>hack</b> command ' + g.scripts.raspberry.effect + ' times/sec, cost $' + fix(g.scripts.getPrice('raspberry')) + '.',
                    'a computer execute the <b>hack</b> command ' + g.scripts.computer.effect + ' times/sec, cost $' + fix(g.scripts.getPrice('computer')) + '.'
                ],
                options: ['script', 'bot', 'vm', 'raspberry', 'computer'],
                optionsIndex: 2
            },
            {
                pattern: '^buy[\\s]hacker[\\s][\\w]',
                cleanCmd: 'buy hacker (option)',
                execute: 'g.hackers.buy',
                desc: 'hire an hacker to automatize places hacks.',
                customDesc: [
                    'a noob auto-hack the mini-market, cost $' + fix(g.hackers.getPrice('noob')) + '.',
                    'a script-kiddie auto-hack the market, cost $' + fix(g.hackers.getPrice('script_kiddie')) + '.',
                    'a coder auto-hack the jewelry, cost $' + fix(g.hackers.getPrice('coder')) + '.',
                    'a hax0r auto-hack the bank, cost $' + fix(g.hackers.getPrice('hax0r')) + '.',
                    'a prodigy auto-hack the trading-center, cost $' + fix(g.hackers.getPrice('prodigy')) + '.',
                    'an elite-hacker auto-hack the anonymous-hideout, cost $' + fix(g.hackers.getPrice('elite_hacker')) + '.',
                    'an elite-skid auto-hack the deepweb, cost $' + fix(g.hackers.getPrice('elite_skid')) + '.'
                ],
                options: [
                    'noob',
                    'script_kiddie',
                    'coder',
                    'hax0r',
                    'prodigy',
                    'elite_hacker',
                    'elite_skid'
                ],
                optionsIndex: 2
            },
            {
                pattern: '^buy[\\s]server[\\s][\\w]',
                cleanCmd: 'buy server (option)',
                execute: 'g.servers.buy',
                desc: 'buy a server to earn more cash and exp.',
                customDesc: [
                    'increase global money multiplier by x' + fix(g.servers.personal.moneyMult, 2) +
                        ' and exp multiplier by x' + fix(g.servers.personal.expMult, 2) +
                        ', cost $' + fix(g.servers.getCost('personal')) + '.'
                ],
                options: [
                    'personal'
                ],
                optionsIndex: 2
            }
        ]
    },

    {
        name: 'jobs',
        desc: 'accept jobs when they are available to earn extra $$$ and exp.',
        pattern: '^jobs$',
        commands: [
            {
                pattern: '^jobs[\\s]respond[\\s][\\w]',
                cleanCmd: 'jobs respond (option)',
                execute: 'g.jobs.respond',
                desc: 'accept or reject a job offer.',
                customDesc: [
                    'accept the current job offer.',
                    'reject the current job offer.'
                ],
                options: ['accept', 'reject'],
                optionsIndex: 2
            }
        ]
    },

    {
        name: 'options',
        desc: 'change in-game options.',
        pattern: '^options$',
        commands: [
            {
                pattern: '^options[\\s]notes$',
                desc: 'print the latest patch-notes.',
                cleanCmd: 'options notes',
                execute: 'g.options.notes.write()'
            },
            {
                pattern: '^options[\\s]difficulty[\\s][\\w]$',
                cleanCmd: 'options difficulty (option)',
                desc: 'switch game difficulty, can only be done one time.',
                execute: 'g.options.switchDifficulty',
                customDesc: [
                    'change game difficulty to normal (no exp/money multiplier but access to user interface).',
                    'change game difficulty to hardcore (exp/money multiplier of x2 but no access to user interface).'
                ],
                options: ['normal', 'hardcore'],
                optionsIndex: 2
            },
            {
                pattern: '^options[\\s]console[\\s][\\w]$',
                cleanCmd: 'options console (option)',
                desc: 'change console theme.',
                execute: 'g.options.switchTheme',
                customDesc: [
                    'change console theme to green (default theme, better hacking experience).',
                    'change console theme to dark (classical theme, easier to read).'
                ],
                options: ['green', 'dark'],
                optionsIndex: 2
            },
            {
                pattern: '^options[\\s]matrix[\\s][\\w]$',
                cleanCmd: 'options matrix (option)',
                desc: 'enable/disable matrix background effect.',
                execute: 'g.options.toggleBackground',
                customDesc: [
                    'enable matrix background effect.',
                    'disable matrix background effect (disable it if game lags).'
                ],
                options: ['enable', 'disable'],
                optionsIndex: 2
            },
            {
                pattern: '^options[\\s]display[\\s][\\w]$',
                cleanCmd: 'options display (option)',
                desc: 'change console display.',
                execute: 'g.options.changeVue',
                customDesc: [
                    'set vue to default.',
                    'set vue to hackers_progress (show hackers progress, can\'t execute other commands).'
                ],
                options: [
                    'default',
                    'hackers_progress'
                ],
                optionsIndex: 2
            },
            {
                pattern: '^options[\\s]savegame[\\s][\\w]',
                cleanCmd: 'options savegame (option)',
                desc: 'save, load or erase your save data.',
                execute: 'g.options.saveManager',
                customDesc: [
                    'save now.',
                    'load savegame.',
                    'hard-reset, erase all data and start from scratch. <b>CAREFUL, NO WARNING! YOU CAN\'T GO BACK IF YOU DO THIS!</b>'
                ],
                options: [
                    'save',
                    'load',
                    'erase'
                ],
                optionsIndex: 2
            }
        ]
    },

    {
        name: 'help',
        desc: 'print a list of commands available.',
        pattern: '^help$',
        commands: [
            {
                pattern: '^help$',
                cleanCmd: 'help',
                execute: 'g.console.help()'
            }
        ]
    },

    {
        name: 'clear',
        desc: 'clear console output.',
        pattern: '^clear$',
        commands: [
            {
                pattern: '^clear$',
                cleanCmd: 'clear',
                desc: 'clear console output.',
                execute: 'g.console.clear()'
            }
        ]
    },

    {
        name: 'guide',
        desc: 'a guide to help you.',
        pattern: '^guide$',
        commands: [
            {
                pattern: '^guide$',
                cleanCmd: 'guide',
                desc: 'print the guide.',
                execute: 'g.console.guide()'
            }
        ]
    },

    {
        name: 'credit',
        desc: 'print credits.',
        pattern: '^credit$',
        commands: [
            {
                pattern: '^credit$',
                cleanCmd: 'credit',
                desc: 'print credits.',
                execute: 'g.console.credits()'
            }
        ]
    }
];