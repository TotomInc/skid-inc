game.sounds = {
    ambient: new Audio('app/assets/sounds/server-room.mp3'),
    bip1: new Audio('app/assets/sounds/computer-bip-1.mp3'),
    bip2: new Audio('app/assets/sounds/computer-bip-2.mp3'),
    bip3: new Audio('app/assets/sounds/computer-bip-3.mp3'),
    bip4: new Audio('app/assets/sounds/computer-bip-4.mp3'),
    bip5: new Audio('app/assets/sounds/computer-bip-5.mp3'),
    bip6: new Audio('app/assets/sounds/computer-bip-6.mp3'),
    errorsBep: new Audio('app/assets/sounds/error-beep.mp3'),
    HDD1: new Audio('app/assets/sounds/hard-disk-writing-1.mp3'),
    HDD2: new Audio('app/assets/sounds/hard-disk-writing-2.mp3'),
    HDD3: new Audio('app/assets/sounds/hard-disk-writing-3.mp3'),
    HDD4: new Audio('app/assets/sounds/hard-disk-writing-4.mp3'),
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