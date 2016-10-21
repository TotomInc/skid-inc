game.console.commands = [
{
    name: 'hack',
    desc: 'execute hacks to earn money, gain experience and even reputation.',
    pattern: '^hack$',
    optionsNeeded: true,
    commands: [{
        pattern: '^hack[\\s]place[\\s][\\w]$',
        readable: 'hack place (option)',
        desc: 'hack a specified place to earn money, experience and reputation.',
        execute: 'game.hack.place',
        options: [
            'place1',
            'place2',
            'place3',
            'place4',
            'place5',
            'place6',
            'place7',
            'place8',
            'place9',
            'place10',
            'place11',
            'place12',
            'place13',
            'place14',
            'place15',
            'place16',
            'place17',
            'place18',
            'place19',
            'place20'
        ],
        optionsDesc: [
            game.hack.placeDesc('place1'),
            game.hack.placeDesc('place2'),
            game.hack.placeDesc('place3'),
            game.hack.placeDesc('place4'),
            game.hack.placeDesc('place5'),
            game.hack.placeDesc('place6'),
            game.hack.placeDesc('place7'),
            game.hack.placeDesc('place8'),
            game.hack.placeDesc('place9'),
            game.hack.placeDesc('place10'),
            game.hack.placeDesc('place11'),
            game.hack.placeDesc('place12'),
            game.hack.placeDesc('place13'),
            game.hack.placeDesc('place14'),
            game.hack.placeDesc('place15'),
            game.hack.placeDesc('place16'),
            game.hack.placeDesc('place17'),
            game.hack.placeDesc('place18'),
            game.hack.placeDesc('place19'),
            game.hack.placeDesc('place20'),
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
            'IRC servers increase your money multiplier by +<b>' + game.servers.getEffects(game.servers.irc).moneyEffect +
                '</b>, same for experience multiplier by +<b>' + game.servers.getEffects(game.servers.irc).expEffect + '</b>. Cost $<b>' + fix(game.servers.getCost(game.servers.irc)) + '</b>.'
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
            'hacker8',
            'hacker9',
            'hacker10',
            'hacker11',
            'hacker12',
            'hacker13',
            'hacker14',
            'hacker15',
            'hacker16',
            'hacker17',
            'hacker18',
            'hacker19',
            'hacker20'
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
            game.hack.hackerDesc('hacker8'),
            game.hack.hackerDesc('hacker9'),
            game.hack.hackerDesc('hacker10'),
            game.hack.hackerDesc('hacker11'),
            game.hack.hackerDesc('hacker12'),
            game.hack.hackerDesc('hacker13'),
            game.hack.hackerDesc('hacker14'),
            game.hack.hackerDesc('hacker15'),
            game.hack.hackerDesc('hacker16'),
            game.hack.hackerDesc('hacker17'),
            game.hack.hackerDesc('hacker18'),
            game.hack.hackerDesc('hacker19'),
            game.hack.hackerDesc('hacker20')
        ]
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
        pattern: '^option[\\s]statsView[\\s][\\w]$',
        readable: 'option statsView (option)',
        desc: 'change displayed stats under the terminal.',
        execute: 'game.options.changeStats',
        options: ['default', 'servers'],
        optionIndex: 2,
        optionsDesc: [
            'default stats view display: money, level, exp, reputation, money/exp mult, total money, times prestigied.',
            'servers stats view display: money, level, exp, money/exp mult, servers cost/owned.'
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
}];