skidinc.prestige = {};
skidinc.prestige.botnetOnReset = 0;
skidinc.prestige.baseMult = 0.02;

skidinc.prestige.getBotnet = function() {
    return Math.floor(5 * Math.sqrt(skidinc.player.totalMoney / 1e9));
};

skidinc.prestige.getPrestigeMult = function() {
    return 1 + (skidinc.player.botnet * skidinc.prestige.baseMult);
};

skidinc.prestige.loop = function(times) {
    skidinc.prestige.botnetOnReset = skidinc.prestige.getBotnet() - skidinc.player.botnet;
};

skidinc.prestige.domInit = function() {
    $('#prestige-button').on('click', function() {
        skidinc.save.soft();
    });
};