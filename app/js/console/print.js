_console.print = function(type, text) {
    switch (type) {
        case 'guide':
                $('#console-content').append('<p>GUIDE: TODO</p>');
            break;

        case 'help':
            for (var cmd in this.commands)
                $('#console-content').append('<p><b>' + this.commands[cmd].name + '</b>: ' + this.commands[cmd].desc + '</p>');
            break;

        case 'log':
            $('#console-content').append('<p>' + text + '</p>');
            break;

        case 'error':
            $('#console-content').append('<p><span class="console-error">[ERROR]</span> ' + text + '</p>');
            break;

        case 'warn':
            $('#console-content').append('<p><span class="console-warn">[WARN]</span> ' + text + '</p>');
            break;
        
        case 'gain':
            $('#console-content').append('<p><span class="console-gain">[GAIN]</span> ' + text + '</p>');
            break;
    }
    
    $('#console-content').scrollTop(1e6);
};

// when on Opera || IE, this.print() call the printer page
if (isOpera || isIE || isChrome || isFirefox)
    window['print'] = _console.print;