game.console.commands = [
{
    name: 'hack',
    desc: 'execute hacks to earn money, gain experience and even reputation.',
    pattern: '^hack$',
    optionsNeeded: true,
    commands: [
    {
        pattern: '^hack[\\s]basic$',
        readable: 'hack basic',
        desc: 'execute a basic hack to earn a small amount of $$$ and exp instantly.',
        execute: 'game.hack.basic()'
    }, {
        pattern: '^hack[\\s]place[\\s][\\w]$',
        readable: 'hack place (option)',
        desc: 'hack a specified place to earn money, experience and reputation.',
        execute: 'game.hack.place',
        options: [
            'grocery',
            'business',
            'market',
            'bank',
            'jewelry',
            'facebook',
            'apple',
            'google'
        ],
        optionsDesc: [
            game.hack.placeDesc('grocery'),
            game.hack.placeDesc('business'),
            game.hack.placeDesc('market'),
            game.hack.placeDesc('bank'),
            game.hack.placeDesc('jewelry'),
            game.hack.placeDesc('facebook'),
            game.hack.placeDesc('apple'),
            game.hack.placeDesc('google')
        ],
        optionIndex: 2
    }]
},{
    name: 'buy',
    desc: 'buy stuff to earn more money and experience.',
    pattern: '^buy$',
    optionsNeeded: true,
    commands: [{
        id: 0,
        pattern: '^buy[\\s]server[\\s][\\w]$',
        readable: 'buy server (option)',
        desc: 'buy different types of servers to buff your multipliers.',
        execute: 'game.servers.buy',
        options: ['vm', 'irc'],
        optionIndex: 2,
        optionsDesc: [
            'VM servers decrease time required to hack a place by <b>1%</b>.' + ' Cost $<b>' + fix(game.servers.getCost(game.servers.vm)) + '</b>.',
            'IRC servers increase your money multiplier by +<b>' + game.servers.getEffects(game.servers.irc).moneyEffect + '</b>, same for experience multiplier by +<b>' + game.servers.getEffects(game.servers.irc).expEffect + '</b>. Cost $<b>' + fix(game.servers.getCost(game.servers.irc)) + '</b>.',
            'LAMP servers increase your botnet power, cost $<b>' + fix(game.servers.getCost(game.servers.lamp)) + '</b>.'
        ]
    }, {
        id: 1,
        pattern: '^buy[\\s]hacker[\\s][\\w]$',
        readable: 'buy hacker (option)',
        desc: 'hire an hacker to auto-hack his specified place.',
        execute: 'game.hack.buyHacker',
        options: [
            'hacker1',
            'hacker2',
            'hacker3',
            'hacker4',
            'hacker5',
            'hacker6',
            'hacker7',
            'hacker8'
        ],
        optionIndex: 2,
        optionsDesc: [
            game.hack.hackerDesc('hacker1'),
            game.hack.hackerDesc('hacker2'),
            game.hack.hackerDesc('hacker3'),
            game.hack.hackerDesc('hacker4'),
            game.hack.hackerDesc('hacker5'),
            game.hack.hackerDesc('hacker6'),
            game.hack.hackerDesc('hacker7'),
            game.hack.hackerDesc('hacker8')
        ]
    }, {
        id: 2,
        pattern: '^buy[\\s]theme[\\s][\\w]$',
        readable: 'buy theme (option)',
        desc: 'buy terminal theme with kreds (Kongregate money).',
        execute: 'game.kongregate.buyMtx',
        options: ['black_theme'],
        optionIndex: 2,
        optionsDesc: ['buy the black and white theme with a blue accentuation color for the terminal, cost <b>50 Kreds</b>.']
    }]
}, {
    name: 'option',
    desc: 'change in-game options.',
    pattern: '^option$',
    optionsNeeded: true,
    commands: [{
        pattern: '^option[\\s]background[\\s][\\w]$',
        readable: 'option background (option)',
        desc: 'enable/disable matrix background effect (can reduce lag).',
        execute: 'game.options.toggleBackground',
        options: ['enable', 'disable'],
        optionIndex: 2,
        optionsDesc: [
            'enable matrix background effect.',
            'disable matrix background effect (can reduce lag).'
        ]
    }, {
        pattern: '^option[\\s]blackbars[\\s][\\w]$',
        readable: 'option blackbars (option)',
        desc: 'enable/disable blackbars effect on the terminal.',
        execute: 'game.options.toggleBlackbars',
        options: ['enable', 'disable'],
        optionIndex: 2,
        optionsDesc: [
            'enable blackbars visual effect on the terminal.',
            'disable blackbars visual effect on the terminal.'
        ]
    }, {
        pattern: '^option[\\s]typed[\\s][\\w]$',
        readable: 'option typed (option)',
        desc: 'enable/disable typing text effect (can reduce lag).',
        execute: 'game.options.toggleTyped',
        options: ['enable', 'disable'],
        optionIndex: 2,
        optionsDesc: [
            'enable typing text effect.',
            'disable typing text effect (can reduce lag).'
        ]
    }, {
        pattern: '^option[\\s]fps[\\s][\\w]$',
        readable: 'option fps (option)',
        desc: 'change fps of the game (default is 30).',
        execute: 'game.options.setFps',
        options: ['userinput'],
        userInputExpected: 'number',
        optionIndex: 2,
        optionsDesc: ['set your own amount of fps desired (low value can reduce lag).']
    }, {
        pattern: '^option[\\s]view[\\s][\\w]$',
        readable: 'option view (option)',
        desc: 'change displayed stats under the terminal.',
        execute: 'game.options.changeStats',
        options: ['default', 'servers'],
        optionIndex: 2,
        optionsDesc: [
            'default stats view display: money, level, exp, reputation, money/exp mult, total money, times prestigied.',
            'servers stats view display: money, level, exp, money/exp mult, servers cost/owned.'
        ]
    }, {
        pattern: '^option[\\s]theme[\\s][\\w]$',
        readable: 'option theme (option)',
        desc: 'change the theme of the console.',
        execute: 'game.options.changeTheme',
        options: ['default', 'black'],
        optionIndex: 2,
        optionsDesc: ['The default SkidInc console theme, green and black.', 'Black and white theme, like in the 90s.']
    }, {
        pattern: '^option[\\s]savegame[\\s][\\w]$',
        readable: 'option savegame (option)',
        desc: 'save, load or reset your current game progression.',
        execute: 'game.save.consoleHandler',
        options: ['save', 'load', 'hardreset', 'export', 'import'],
        optionIndex: 2,
        optionsDesc: [
            'Save your current game state in your browser.',
            'Load your save from your browser.',
            'Start from scratch, reset everything.',
            'Export your save code.',
            'Import your save code.'
        ]
    }]
}, {
    name: 'clear',
    desc: 'clear console logs.',
    pattern: '^clear$',
    optionsNeeded: false,
    execute: 'game.console.clear()'
}, {
    name: 'help',
    desc: 'show a list of available commands.',
    pattern: '^help$',
    optionsNeeded: false,
    execute: 'game.console.help()'
}, {
    name: 'watch',
    desc: 'watch an ad to increase your ads bonus multiplier for 6h (only on Kongregate).',
    pattern: '^watch$',
    optionsNeeded: false,
    execute: 'game.kongregate.watch()'
}];