var _sounds = {
    backgroundSound: undefined,
    serverRoom: 'app/js/sounds/assets/server-room.mp3',
    errorSound: 'app/js/sounds/assets/error-beep.mp3',
    button: 'app/js/sounds/assets/button.mp3',
    hardDrives: [
        'app/js/sounds/assets/hard-disk-writing-1.mp3',
        'app/js/sounds/assets/hard-disk-writing-2.mp3',
        'app/js/sounds/assets/hard-disk-writing-3.mp3',
        'app/js/sounds/assets/hard-disk-writing-4.mp3'
    ],
    
    triggerSounds: function() {
        if (!_core.options.sounds)
            _sounds.stopBackgroundAudio();
        else {
            _sounds.createBackgroundAudio();
            
            _core.options.intervals.randomSound = window.setInterval(function() {
                _sounds.randomSound();
            }, 30000);
        }
    },
    
    randomSound: function() {
        var rand = Math.floor(Math.random() * 100),
            randSound = Math.floor(Math.random() * (this.hardDrives.length - 0 + 1)) + 0;
        
        if (rand > 50 && _core.options.sounds == true) {
            var effect = new Audio(this.hardDrives[randSound]);
            effect.volume = 0.25;
            effect.play();
        };
    },
    
    createBackgroundAudio: function() {
        this.backgroundSound = new Audio(this.serverRoom);
        this.backgroundSound.volume = 0.5;
        this.backgroundSound.play();
            
        _core.options.intervals.backgroundAudio = window.setInterval(function() {
            this.backgroundSound = new Audio(_sounds.serverRoom);
            this.backgroundSound.volume = 0.5;
            this.backgroundSound.play();
        }, 59500);
    },
    
    stopBackgroundAudio: function() {
        this.backgroundSound.pause();
        _core.options.intervals.randomSound = clearInterval(_core.options.intervals.randomSound);
        _core.options.intervals.backgroundAudio = clearInterval(_core.options.intervals.backgroundAudio);
    },
    
    varInit: function() {
        if (_core.options.sounds == true) {
            _sounds.createBackgroundAudio();
            
            _core.options.intervals.randomSound = window.setInterval(function() {
                _sounds.randomSound();
            }, 30000);
        }
    }
};