_console.clear = function(args) {
    console.log(args)
    
    $('#console-content').empty();
    
    if (args.length > 1)
        _console.print('error', _console.errors.clearError);
    else if (args.length == 1)
        $('#console-content').empty();
};