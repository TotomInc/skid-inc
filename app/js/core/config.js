game.config = function(from, option) {
    if (from == "sp") {
        game.console.print('error', game.console.errors.configNoArgs);

        return;
    };

    if (from == "help") {
        game.console.print('help', game.console.help.config);

        return;
    };

    if (from == 'triggerSounds') {
        game.options.triggerSounds(option);

        return;
    };

    if (from == "triggerBackground") {
        game.options.triggerBackground(option);

        return;
    };
}