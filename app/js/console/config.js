_console.config = function(args) {
    // args = ['config', '-sound', '0']
    
    if (args.length == 1) {
        // config
        if (args.indexOf('config') == 0)
            _console.print('error', _console.errors.configError);
    }
    
    if (args.length == 2) {
        // config -help
        if (args.indexOf('config') == 0 && args.indexOf('-help') == 1) {
            for (var arg in _console.commands.config.args) {
                var thisArg = _console.commands.config.args[arg];
                this.print('log', '<b>' + thisArg.name + '</b>: ' + thisArg.desc + ' Example: <b>' + thisArg.example + '</b>');
            }
        }
        
        // config -whaow
        if (args.indexOf('config') == 0 && args.indexOf('-whaow') == 1)
            _console.print('warn', 'TODO');
    }
    
    if (args.length == 3) {
        // config -sound value (0/1)
        if (args.indexOf('config') == 0 && args.indexOf('-sound') == 1 && typeof args[2] == 'string') {
            var value = parseInt(args[2]);
            
            if (value == 0 || value == 1) {
                _core.options.sounds = !!value;
                _sounds.triggerSounds();
                this.print('log', 'sound set to ' + !!value);
            } else
                this.print('error', this.errors.soundValue);
        }
    }
};