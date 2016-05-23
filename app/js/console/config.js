_console.config = function(args) {
    // args = ['config', '-sound', '0']
    
    if (args.length == 1) {
        if (args.indexOf('config') == 0)
            _console.print('error', _console.errors.configError1);
    }
    
    if (args.length == 2) {
        if (args.indexOf('config') == 0 && args.indexOf('-help') == 1)
            _console.print('log', '<b>config -sound <i>value</i></b>: enable or disable sounds with 1 or 0 (defaut 0).<br><b>config -whaow <i>value</i></b>: it\'s a secret.');

        if (args.indexOf('config') == 0 && args.indexOf('-whaow') == 1)
            _console.print('warn', 'MATRIX ! (TODO)');
    }
    
    if (args.length == 3) {
        // config -sound 0
        // config -sound 1
        if (args.indexOf('config') == 0 && args.indexOf('-sound') == 1 && typeof args[2] == 'string') {
            var value = parseInt(args[2]);
            
            if (value == 0 || value == 1) {
                _core.options.sounds = !!value;
                _sounds.triggerSounds();
                this.print('log', 'sound set to ' + !!value);
            } else
                this.print('error', this.errors.soundValue);
        }
    };
};