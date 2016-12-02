game.console.commands = [
{
    name: 'hack',
    desc: 'execute hacks to earn money, gain experience and even reputation.',
    pattern: '^hack$',
    optionsNeeded: true,
    commands: [
    {
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
    }, {
        pattern: '^hack[\\s]place[\\s]cancel$',
        readable: 'hack place cancel',
        desc: 'cancel your current hack.',
        execute: 'game.hack.cancel()'
    }, {
        pattern: '^hack[\\s]basic$',
        readable: 'hack basic',
        desc: 'execute a simple hack, a quick way to gain a small amount of money and exp.',
        execute: 'game.hack.basic()'
    }]
}, {
    name: 'virus',
    desc: 'create virus, if they works well they will infect computers and transform them into zombie computers, for your needs.',
    pattern: '^virus$',
    optionsNeeded: true,
    commands: [
    {
        pattern: '^virus[\\s]create[\\s][\\w]$',
        readable: 'virus create (option)',
        desc: 'create a virus, it has a percent to fail and take some time to make.',
        execute: 'game.virus.create',
        options: [
            'boza',
            'happy99',
            'memz',
            'faggot',
            'magistr'
        ],
        optionsDesc: [
            game.virus.virusDesc('boza'),
            game.virus.virusDesc('happy99'),
            game.virus.virusDesc('memz'),
            game.virus.virusDesc('faggot'),
            game.virus.virusDesc('magistr')
        ],
        optionIndex: 2
    }, {
        pattern: '^virus[\\s]create[\\s]cancel$',
        readable: 'virus create cancel',
        desc: 'cancel your current virus.',
        execute: 'game.virus.cancel()'
    }]
}, {
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
        options: ['vm', 'irc', 'zombie'],
        optionIndex: 2,
        optionsDesc: [
            'VM servers decrease time required to hack a place by <b>1%</b>.' + ' Cost $<b>' + fix(game.servers.getCost(game.servers.vm)) + '</b>.',
            'IRC servers increase your money multiplier by +<b>' + game.servers.getEffects(game.servers.irc).moneyEffect + '</b>, same for experience multiplier by +<b>' + game.servers.getEffects(game.servers.irc).expEffect + '</b>. Cost $<b>' + fix(game.servers.getCost(game.servers.irc)) + '</b>.',
            'Zombie servers increase your botnet power by +<b>0.1</b>, you get them when creating virus and infecting computers.'
        ]
    }, {
        id: 1,
        pattern: '^buy[\\s]hacker[\\s][\\w]$',
        readable: 'buy hacker (option)',
        desc: 'hire an hacker to auto-hack his specified place.',
        execute: 'game.hack.buyHacker',
        options: [
            'grocer',
            'business_man',
            'cashier',
            'banker',
            'jeweler',
            'mark',
            'steve',
            'larry'
        ],
        optionIndex: 2,
        optionsDesc: [
            game.hack.hackerDesc('grocer'),
            game.hack.hackerDesc('business_man'),
            game.hack.hackerDesc('cashier'),
            game.hack.hackerDesc('banker'),
            game.hack.hackerDesc('jeweler'),
            game.hack.hackerDesc('mark'),
            game.hack.hackerDesc('steve'),
            game.hack.hackerDesc('larry')
        ]
    }, {
        id: 2,
        pattern: '^buy[\\s]theme[\\s][\\w]$',
        readable: 'buy theme (option)',
        desc: 'buy terminal theme with kreds (Kongregate money).',
        execute: 'game.kongregate.buyMtx',
        options: ['black_theme', 'monokai_theme', 'afterglow_theme', 'fluoro_theme'],
        optionIndex: 2,
        optionsDesc: [
            'buy the black and white theme with a blue accentuation color for the terminal, cost <b>50 Kreds</b>.',
            'buy the monokai theme (light blue background and text, pink and green accentuation color), cost <b>50 Kreds</b>.',
            'buy the afterglow theme (light pink background, light orange text, pink and red accentuation colors), cost <b>50 Kreds</b>.',
            'buy the fluoro theme (dark purple background, heavy pink text with green and orange accentuation colors), cost <b>50 Kreds</b>.'
        ]
    }, {
        id: 3,
        pattern: '^buy[\\s]ad_mult$',
        readable: 'buy ad_mult',
        desc: 'add +1 to the ads multiplier (available on the Kongregate version), cost 10 Kreds.',
        execute: 'game.kongregate.buyMtx("ad_mult")'
    }, {
        id: 4,
        pattern: '^buy[\\s]ad_mult[\\s]x5$',
        readable: 'buy ad_mult x5',
        desc: 'add +5 to the ads multiplier (available on the Kongregate version), cost 35 Kreds.',
        execute: 'game.kongregate.buyMtx("ad_mult_x5")'
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
        options: ['default', 'servers', 'botnet'],
        optionIndex: 2,
        optionsDesc: [
            'default stats view.',
            'servers stats view.',
            'botnet stats view.'
        ]
    }, {
        pattern: '^option[\\s]theme[\\s][\\w]$',
        readable: 'option theme (option)',
        desc: 'change the theme of the console.',
        execute: 'game.options.changeTheme',
        options: ['default', 'black', 'monokai', 'afterglow', 'fluoro'],
        optionIndex: 2,
        optionsDesc: [
            'The default SkidInc console theme, green and black.',
            'Black and white theme, like in the 90s.',
            'Monokai theme, based on the original and famous Monokai color scheme.',
            'Afterglow theme, based on the original afterglow color scheme.',
            'Fluoro theme, high in pink.'
        ]
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
    }, {
        pattern: '^option[\\s]code[\\s][\\w]$',
        readable: 'option code (option)',
        desc: 'redeem a code to earn some bonuses.',
        execute: 'game.options.redeemCode',
        options: ['userinput'],
        userInputExpected: 'number',
        optionIndex: 2,
        optionsDesc: ['check skidinc twitter account for codes.']
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