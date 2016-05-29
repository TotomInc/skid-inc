game.sounds = {
    ambient: new Audio('app/assets/sounds/server-room.mp3'),
    button: new Audio('app/assets/sounds/button.mp3'),
    
    enableSounds: function() {
        game.sounds.ambient.volume = 0.25;
        game.sounds.ambient.currentTime = 0;
        game.sounds.ambient.play();
    },
    
    disableSounds: function() {
        game.sounds.ambient.volume = 0;
        game.sounds.ambient.currentTime = 0;
        game.sounds.ambient.pause();
    },

    varInit: function() {},
};