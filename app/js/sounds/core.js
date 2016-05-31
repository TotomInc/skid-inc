game.sounds = {
    button: new Audio('app/assets/sounds/button.mp3'),
    ambient: new Audio('app/assets/sounds/server-room.mp3'),
    
    enableSounds: function() {
        game.sounds.ambient.volume = 0.25;
        game.sounds.ambient.currentTime = 0;
        game.sounds.ambient.loop = true;
        game.sounds.ambient.play();
    },
    
    disableSounds: function() {
        game.sounds.ambient.volume = 0;
        game.sounds.ambient.currentTime = 0;
        game.sounds.ambient.pause();
    },

    varInit: function() {
        game.sounds.bip = [
            new Audio('app/assets/sounds/computer-bip-1.mp3'),
            new Audio('app/assets/sounds/computer-bip-2.mp3'),
            new Audio('app/assets/sounds/computer-bip-3.mp3'),
            new Audio('app/assets/sounds/computer-bip-4.mp3'),
            new Audio('app/assets/sounds/computer-bip-5.mp3'),
            new Audio('app/assets/sounds/computer-bip-6.mp3'),
            new Audio('app/assets/sounds/error-beep.mp3')
        ];
        game.sounds.hdd = [
            new Audio('app/assets/sounds/hard-disk-writing-1.mp3'),
            new Audio('app/assets/sounds/hard-disk-writing-2.mp3'),
            new Audio('app/assets/sounds/hard-disk-writing-3.mp3'),
            new Audio('app/assets/sounds/hard-disk-writing-4.mp3'),
        ];
    },
};