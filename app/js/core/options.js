game.options = {
    intervals: {},
    interval: undefined,
    fps: 10,
    bindTime: 350,
    sounds: false,
    version: 0.05,
    
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
    
    isInit: false,
    
    triggerBackground: function() {
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