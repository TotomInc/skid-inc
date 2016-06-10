game.console = {
    history: [],
    historyNum: null,
    arrowPressed: false,

    // wow
    pressUpArrow: function() {
      if(game.console.arrowPressed === false || game.console.history.length > 0) {
        var num = game.console.historyNum;
        game.console.arrowPressed = true;
        game.console.historyNum = num[num.length - 1];
        console.log(game.console.historyNum);
      }
      console.log('up');
      $('#console-input').val();
    },

    pressDownArrow: function() {
      console.log('down');
    },

    executer: function() {
        var input = $('#console-input').val();
        var results = filterArrayOnRegexPattern(input, game.console.cmds);

        if(input === '') return false;
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


        game.console.history.push(input);
        console.log(game.console.history);

        $('#console-input').val('');
    }
};
