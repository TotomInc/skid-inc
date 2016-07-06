game.sounds = {
    button: new Audio('app/assets/sounds/button.mp3'),

    enableSounds: function() {
        game.options.sounds = true;
        
        game.options.intervals.randomSound = setInterval(game.sounds.randomSound, 20000);
    },

    disableSounds: function() {
        game.options.sounds = false;
    },
    
    randomSound: function() {
        var gotSound = Math.floor(Math.random() * 100),
            soundType = Math.floor(Math.random() * 100),
            audio = undefined;
        
        if (gotSound >= 25 && game.options.sounds) {
            if (soundType >= 50) {
                var rand = Math.ceil(Math.floor(game.randomInclusive(0, game.sounds.bip.length - 1)));
                
                game.sounds.bip[rand].volume = 0.30;
                game.sounds.bip[rand].play();
            }
            else if (soundType < 50) {
                var rand = Math.ceil(Math.floor(game.randomInclusive(0, game.sounds.hdd.length - 1)));
                
                game.sounds.hdd[rand].volume = 0.30;
                game.sounds.hdd[rand].play();
            };
        };
    },

    varInit: function() {
        if (game.options.sounds)
            game.options.intervals.randomSound = setInterval(game.sounds.randomSound, 20000);
        
        game.sounds.bip = [
            new Audio('app/assets/sounds/computer-bip-1.mp3'),
            new Audio('app/assets/sounds/computer-bip-2.mp3'),
            new Audio('app/assets/sounds/computer-bip-3.mp3'),
            new Audio('app/assets/sounds/computer-bip-4.mp3'),
            new Audio('app/assets/sounds/computer-bip-5.mp3'),
            new Audio('app/assets/sounds/computer-bip-6.mp3')
        ];
        
        game.sounds.hdd = [
            new Audio('app/assets/sounds/hard-disk-writing-1.mp3'),
            new Audio('app/assets/sounds/hard-disk-writing-2.mp3'),
            new Audio('app/assets/sounds/hard-disk-writing-3.mp3'),
            new Audio('app/assets/sounds/hard-disk-writing-4.mp3'),
        ];
    },
};