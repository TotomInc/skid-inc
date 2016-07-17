game.options = {
    intervals: {},
    interval: undefined,
    fps: 20,
    bindTime: 350,
    upkeyBindTime: 500,
    sounds: false,
    version: 0.10,
    
    now: new Date().getTime(),
    before: new Date().getTime(),
    
    gotFocus: true,
    effectEnabled: false,
    
    isOpera: false,
    isFirefox: false,
    isSafari: false,
    isIE: false,
    isEdge: false,
    isChrome: false,
    isBlink: false,
    
    whatOS: undefined,
    
    isInit: false,
    
    triggerSounds: function(option) {
        if (option !== undefined) {
            if (option == 'true')
                game.options.sounds = true;
            else if (option == 'false')
                game.options.sounds = false;

            game.console.print('warn', 'Sounds have been turned to ' + game.options.sounds + '.');
        }
        else {
            game.options.sounds = !game.options.sounds;

            game.console.print('warn', 'Sounds have been turned to ' + game.options.sounds + '.');
        };
    },
    
    triggerBackground: function(option) {
        if (option !== undefined) {
            if (option == 'true') {
                $('#matrix-effect').fadeIn('slow', function() {
                    game.options.effectEnabled = true;
                });
            }
            else if (option == 'false') {
                $('#matrix-effect').fadeOut('slow', function() {
                    game.options.effectEnabled = false;
                });
            }
        }
        else {
            if (game.options.effectEnabled) {
                $('#matrix-effect').fadeOut('slow', function() {
                    game.options.effectEnabled = false;
                });
            }
            else {
                $('#matrix-effect').fadeIn('slow', function() {
                    game.options.effectEnabled = true;
                });
            };
        }
    }
}