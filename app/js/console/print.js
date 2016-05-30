game.console.print = function(type, text) {
    switch (type) {
        case 'gain':
            $('#console-content').append('<p><span class="console-gain">[GAIN]</span> ' + text + '</p>');
            break;

        case 'log':
            $('#console-content').append('<p><span class="console-log">[LOG]</span> ' + text + '</p>');
            break;

        case 'error':
            $('#console-content').append('<p><span class="console-error">[ERROR]</span> ' + text + '</p>');
            break;

        case 'warn':
            $('#console-content').append('<p><span class="console-warn">[WARN]</span> ' + text + '</p>');
            break;

        case 'help':
            $('#console-content').append('<p><span class="console-help">[HELP]</span> ' + text + '</p>');
            break;
            
        case '':
            $('#console-content').append('<p>' + text + '</p>');
            break;
        
        case 'hack-bar':
            $('#console-content').append('<p id="hacking-progress"></p>');
            break;
    };
    
    // if console stop auto-scrolling, the player really need to clear the console
    $("#console-content").scrollTop(1e6);
};

game.console.printHelp = function() {
    for (var cmd in game.console.cmds) {
        var thisCmd = game.console.cmds[cmd];
        game.console.print('help', '<b>' + thisCmd.name + '</b>: ' + thisCmd.desc);
    };
    
    return;
};

game.console.clear = function(from) {
    if (typeof from == 'undefined') {
        $('#console-content').empty();
        return;
    };
    
    if (from == 'help') {
        game.console.print('help', game.console.help.clear);
        return;
    };
};