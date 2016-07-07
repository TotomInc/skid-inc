game.console = {
    latest: undefined,
    canUseUpkey: true,
    
    typeLast: function() {
        var last = String(game.console.latest);
        
        if (game.abilities.list['up_key'].owned && game.console.canUseUpkey) {
            game.console.canUseUpkey = false;
            $('#console-input').val(last);
            
            window.setTimeout(function() {
                game.console.canUseUpkey = true;
            }, game.options.upkeyBindTime);
        }
    },
    
    executer: function() {
        var input = $('#console-input').val();
        var results = filterArrayOnRegexPattern(input, game.console.cmds);
        
        if (input == '') {
            game.console.print('error', 'You can\'t send empty commands.');
            
            return;
        }
        
        if (results.length == 1) {
            var result = results[0],
                instances = filterArrayOnRegexPattern(input, result.commandRegex);
            
            if (instances.length == 1) {
                var instance = instances[0],
                    option = '';
                
                if (instance.options) {
                    var optionRegex = new RegExp(instance.options, 'g'),
                        matches = input.match(optionRegex);
                    
                    if (matches == null)
                        game.console.print('error', '<b>' + input + '</b>: unknown argument(s) value(s).');
                    else if (matches.length == 1) {
                        var option = matches[0];
                        eval(instance.exec);
                    }
                }
                else
                    eval(instance.exec);
            }
            else
                game.console.print('error', '<b>' + input + '</b>: unknown argument(s).');
        }
        else
            game.console.print('error', '<b>' + input + '</b>: unknown command.');
        
        if (game.options.sounds)
            game.sounds.button.play();
        
        game.console.latest = input;
        $('#console-input').val('');
    }
};