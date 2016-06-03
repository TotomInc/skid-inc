game.options = {
    intervals: {},
    interval: undefined,
    fps: 10,
    bindTime: 500,
    sounds: false,
    version: 0.04,
    
    now: new Date().getTime(),
    before: new Date().getTime(),
    
    gotFocus: true,
    effectEnabled: true,
    
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
            
            $('#options-effect').html(
                '<i class="fa fa-eye" aria-hidden="true"></i> Enable effects'
            );
        }
        else {
            $('#matrix-effect').fadeIn('slow', function() {
                game.options.effectEnabled = true;
            });
            
            $('#options-effect').html(
                '<i class="fa fa-eye-slash" aria-hidden="true"></i> Disable effects'
            );
        };
    }
}