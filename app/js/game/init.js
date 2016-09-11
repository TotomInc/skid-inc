g.varInit = () => {
    g.options.varInit();
    g.console.varInit();

    g.options.debug == true && debug('g.varInit finished');
};

g.domInit = () => {
    g.console.domInit();

    // if on mobile, adress bar is hidden
    window.scrollTo(0, 1);

    g.options.debug == true && debug('g.domInit finished');
};

$(document).ready(function() {
    g.varInit();
    g.save.load();
    g.domInit();
    g.quickTutorial();

    g.player.options == true && debug('game ready to play', g);
});
