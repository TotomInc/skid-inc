game.console = {
    latest: undefined,
    
    typeLast: function() {
        var last = String(game.console.latest);
        console.log('last: ' + last);
        console.log('typeLast called');
        
        if (game.abilities.list['up-key'].owned) {
            console.log('condition passed');
            $('#console-input').val(last);
        };
    },
    
    executer: function() {
        var input = $('#console-input').val();
        var results = filterArrayOnRegexPattern(input, game.console.cmds);
        
        if (results.length == 1) {
            var result = results[0],
                instances = filterArrayOnRegexPattern(input, result.commandRegex);
            
            if (instances.length == 1) {
                var instance = instances[0],
                    option = '';
                
                if (instance.options) {
                    var optionRegex = new RegExp(instance.options, 'g'),
                        matches = input.match(optionRegex);
                    
                    if (matches.length == 1) {
                        var option = matches[0];
                        eval(instance.exec);
                    }
                    else
                        game.console.print('error', 'Unknown argument value.');
                }
                else
                    eval(instance.exec);
            }
            else
                game.console.print('error', 'Unknown arguments.');
        }
        else
            game.console.print('error', 'Unknown command.');
        
        $('#console-input').val('');
    }
};