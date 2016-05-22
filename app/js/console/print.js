_console.print = function(type, text) {
    switch (type) {
        case 'guide':
            $('#console-content').append('<p>GUIDE: TODO</p>');

        case 'help':
            for (var cmd in this.commands)
                $('#console-content').append('<p><b>' + this.commands[cmd].name + '</b>: ' + this.commands[cmd].desc + '</p>');
            break;

        case 'args':
            for (var arg in this.args)
                $('#console-content').append('<p><b>' + this.args[arg].name + '</b>: ' + this.args[arg].desc + '</p>');
            break;

        case 'log':
            $('#console-content').append('<p>' + text + '</p>');
            break;

        case 'error':
            $('#console-content').append('<p>[ERROR] : ' + text + '</p>');
            break;

        case 'warn':
            $('#console-content').append('<p>[WARN] : ' + text + '</p>');
            break;
    }
};
