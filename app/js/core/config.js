game.config = function(from) {
    if (from == "sp") {
        game.console.print('error', game.console.errors.configNoArgs);
        
        return;
    };
    
    if (from == "sound-off") {
        game.console.print('log', 'Sounds have been turned off.');
        game.options.sounds = false;
        game.sounds.disableSounds();
        
        return;
    };
    
    if (from == "sound-on") {
        game.console.print('log', 'Sounds have been turned on.');
        game.options.sounds = true;
        game.sounds.enableSounds();
        
        return;
    };
    
    if (from == "background-off") {
        game.console.print('log', 'Background have been turned off.');
        game.options.background = false;
        
        return;
    };
    
    if (from == "background-on") {
        game.console.print('log', 'Background have been turned on');
        game.options.background = true;
        
        return;
    };
    
    if (from == "help") {
        game.console.print('help', game.console.help.config);
        
        return;
    };
}