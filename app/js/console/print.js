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
            $('#console-content').append('<p><span class="console-error">[ERROR]</span> : ' + text + '</p>');
            break;

        case 'warn':
            $('#console-content').append('<p><span class="console-warn">[WARN]</span> : ' + text + '</p>');
            break;
        
        case 'gain':
            $('#console-content').append('<p><span class="console-gain">[GAIN]</span> : ' + text + '</p>');
            break;
    }
};

// when on Opera || IE, this.print() call the printer page
if (isOpera || isIE)
    window['print'] = _console.print;