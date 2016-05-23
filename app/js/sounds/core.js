var _sounds = {
    backgroundSound: undefined,
    serverRoom: 'app/js/sounds/server-room.mp3',
    errorSound: 'app/js/sounds/error-beep.wav',
    devices: [
        'app/js/sounds/device-added.oga',
        'app/js/sounds/device-removed.oga'
    ],
    hardDrives: [
        'app/js/sounds/hard-disk-writing-1.mp3',
        'app/js/sounds/hard-disk-writing-2.mp3',
        'app/js/sounds/hard-disk-writing-3.mp3',
        'app/js/sounds/hard-disk-writing-4.mp3'
    ],
    
    triggerSounds: function() {
        if (!_core.options.sounds) {
            this.backgroundSound.pause();
            _core.options.intervals.randomSound = clearInterval(_core.options.intervals.randomSound);
            _core.options.intervals.backgroundAudio = clearInterval(_core.options.intervals.backgroundAudio);
        } else {
            this.backgroundSound = new Audio(this.serverRoom);
            this.backgroundSound.volume = 0.25;
            this.backgroundSound.play();
            
            _core.options.intervals.backgroundAudio = window.setInterval(function() {
                this.backgroundSound = new Audio(_sounds.serverRoom);
                this.backgroundSound.volume = 0.25;
                this.backgroundSound.play();
            }, 59400);
            
            _core.options.intervals.randomSound = window.setInterval(function() {
                _sounds.randomSound();
            }, 30000);
        }
    },
    
    randomSound: function() {
        var rand = Math.floor(Math.random() * 100),
            randSound = Math.floor(Math.random() * (this.hardDrives.length - 0 + 1)) + 0;
        
        if (rand > 75 && _core.options.sounds == true) {
            var effect = new Audio(this.hardDrives[randSound]);
            effect.volume = 0.3;
            effect.play();
        };
    },
    
    varInit: function() {
        if (_core.options.sounds == true) {
            this.backgroundSound = new Audio(this.serverRoom);
            this.backgroundSound.volume = 0.25;
            this.backgroundSound.play();
            
            _core.options.intervals.backgroundAudio = window.setInterval(function() {
                this.backgroundSound = new Audio(_sounds.serverRoom);
                this.backgroundSound.volume = 0.25;
                this.backgroundSound.play();
            }, 59400);
            
            _core.options.intervals.randomSound = window.setInterval(function() {
                _sounds.randomSound();
            }, 30000);
        }
    }
};