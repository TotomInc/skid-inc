_console.enterCmd = function() {
    var fullCmd = $('#console-input').val(),
        parts = fullCmd.split(' '),
        exist = false,
        current = undefined,
        rand = Math.floor(Math.random() * 100),
        randSound = Math.floor(Math.random() * (1 - 0 + 1)) + 0,
        effect = new Audio(_sounds.devices[randSound]);

    for (var cmd in this.commands) {
        if (this.commands[cmd].name == parts[0])
            exist = true,
            current = this.commands[cmd];
    }

    if (exist && !current.args)
        eval(current.exec);
    else if (exist && current.args) {
        eval(current.exec)(parts);
    } else if (!exist)
        this.print('log', this.errors.cmd);

    if (_core.options.sounds) {
        effect.volume = 1;
        effect.play();
    }

    $('#console-input').val('');
};