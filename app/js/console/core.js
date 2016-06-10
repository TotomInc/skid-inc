game.console = {
    history: [],
    historyNum: null,
    arrowPressed: false,

    // wow
    pressUpArrow: function() {
      var history = game.console.history;
      var historyNum = game.console.historyNum;

      if(game.console.arrowPressed === false) {
        game.console.arrowPressed = true;
        game.console.historyNum = history.length;
        console.log(game.console.historyNum);
        if(game.console.historyNum < 0) {
          game.console.historyNum = 0;
        }
      }

      if(game.console.historyNum > 0) {
        game.console.historyNum -= 1;
      } else {
        game.console.historyNum = 0;
      }

      var command = history[game.console.historyNum];

      console.log(game.console.historyNum);
      $('#console-input').val(command);
    },

    pressDownArrow: function() {
      var history = game.console.history;
      var historyNum = game.console.historyNum;

      if(game.console.historyNum >= history.length) {
        game.console.historyNum = history.length;
      } else {
        game.console.historyNum += 1;
      }

      var command = history[game.console.historyNum];

      console.log(game.console.historyNum);
      $('#console-input').val(command);
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
        game.console.arrowPressed = false;
        $('#console-input').val('');
    }
};
