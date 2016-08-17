var game = g = {};

g.earnMoney = (amount) => {
    g.player.money += amount;
    g.player.totalMoney += amount;
};

g.earnExp = (amount) => {
    g.player.exp += amount;

    while (g.player.exp >= g.player.expReq) {
        g.player.exp -= g.player.expReq;
        g.player.level++;
        g.player.calculateExpReq();
        g.console.print('Level-up, you are now level ' + g.player.level + '.');
    };
};

g.quickTutorial = () => {
    if (g.player.isNew) {
        $('.text-side').prepend('<div id="quick-tutorial" class="typed">');
        $('#quick-tutorial').prepend('<p>');
        $("#quick-tutorial p").typed({
            strings: ['Welcome to <b>SkidInc</b>, an idle-game where you are a poor script kid trying to make money with your little knowledge in hacking.<br>^750' +
                    'To begin your hacking adventure, you need to choose the difficulty:<br>' +
                    '<b>normal difficulty</b> (you have access to console and a user interface but no money/experience modifiers).<br>' +
                    '<b>hardcore difficulty</b> (you have only access to console, no user interface but you have a global money/experience multiplier of x2.<br>^750' +
                    'To choose your difficulty, type the command <b>options difficulty yourDifficulty</b>.'],
            contentType: 'html',
            typeSpeed: -20,
            callback: function() {
                $('.typed-cursor').remove();
            }
        });
    };
};

g.loop = () => {
    g.options.now = new Date().getTime();

    var elapsed = g.options.now - g.options.before,
        times = Math.floor(elapsed / g.options.interval);

    elapsed > g.options.interval ? g.updateGame(times) : g.updateGame(1);

    g.options.before = new Date().getTime();
};

g.updateGame = (times) => {
    g.console.update();
    g.jobs.loop(times);
    g.scripts.action(times);
    g.hack.loop(times);

    document.title = '$' + fix(g.player.money) + ' - SkidInc';
};