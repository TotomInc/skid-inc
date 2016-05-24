_console.clear = function(args) {
    if (args.length > 1)
        _console.print('error', _console.errors.clearError);
    else if (args.length == 1)
        $('#console-content').empty();
};