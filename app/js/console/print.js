game.console.print = function(type, text) {
    switch (type) {
        case 'nothing':
            $('#console-content').append('<p>' + text + '</p>');
            break;
        
        case 'gain':
            $('#console-content').append('<p><span class="console-gain">[GAIN]</span> ' + text + '</p>');
            break;
        
        case 'hack':
            $('#console-content').append('<p><span class="console-gain">[HACK]</span> ' + text + '</p>');
            break;

        case 'log':
            $('#console-content').append('<p><span class="console-log">[LOG]</span> ' + text + '</p>');
            break;
            
        case 'save':
            $('#console-content').append('<p><span class="console-log">[SAVE]</span> ' + text + '</p>');
            break;

        case 'error':
            $('#console-content').append('<p><span class="console-error">[ERROR]</span> ' + text + '</p>');
            break;

        case 'warn':
            $('#console-content').append('<p><span class="console-warn">[WARN]</span> ' + text + '</p>');
            break;
        
        case 'success':
            $('#console-content').append('<p><span class="console-warn">[ACHIEVEMENT]</span> ' + text + '</p>');
            break;
        
        case 'levelup':
            $('#console-content').append('<p><span class="console-warn">[LEVEL-UP]</span> ' + text + '</p>');
            break;

        case 'help':
            $('#console-content').append('<p><span class="console-help">[HELP]</span> ' + text + '</p>');
            break;
            
        case 'guide':
            $('#console-content').append('<p><span class="console-help">[GUIDE]</span> ' + text + '</p>');
            break;
        
        case 'ascii':
            $('#console-content').append('<div class="console ascii"><pre>' + text + '</pre></div>');
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

game.console.printGuide = function() {
    game.console.print('guide',
        'Welcome to <b>Skid-Inc</b>, an incremental-game where you are a poor script-kid, trying to make money with your little knowledge in hacking.<br><br>' +
        'Start making some $$$ by clicking the <b>hack</b> button or by typing the <b>hack</b> command in the console.<br>' +
        'Buy different servers to increase your money and experience income (buy <b>-server -help</b> to get started).<br>' +
        'Hack different places to earn even more money and experience (<b>hack -help</b> or <b>hack -place -list</b>).<br><br>' +
        'Type <b>help</b> for a list of commands, use <b>arguments</b> (like <b>-help</b> for example) to use all the potential of the command (like <b>hack -place placeToHack</b>).<br>' +
        'Try some commands: <b>buy -server -help</b>, <b>hack</b> or even <b>config -help</b> to change in-game settings.<br><br>' +
        'If you want to see this guide again, just type the <b>guide</b> command.<br><br>' +
        'Good luck in your hacking adventure!');
};