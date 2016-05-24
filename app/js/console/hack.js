_console.hack = function(args, from) {
    var moneyIncome = Math.floor(Math.random() * (_core.player.randMoneyMax - _core.player.randMoneyMin + 1)) + _core.player.randMoneyMin,
        expIncome = Math.floor(Math.random() * (_core.player.randExpMax - _core.player.randExpMin + 1)) + _core.player.randExpMin,
        reducerMoneyIncome = Math.ceil(moneyIncome / _core.player.clickReducer),
        reducerExpIncome = Math.ceil(expIncome / _core.player.clickReducer);
    
    // hacking with no arguments or button click
    if (args.length == 1) {
        if (from == 'button') {
            _core.earnMoney(reducerMoneyIncome);
            _core.earnExp(reducerExpIncome);
            
            this.print('gain', 'You earned $' + _beautify.fix(reducerMoneyIncome) + ' and ' + _beautify.fix(reducerExpIncome, 0) + ' exp.');
        } else {
            _core.earnMoney(moneyIncome);
            _core.earnExp(expIncome);
            
            this.print('gain', 'You earned $' + _beautify.fix(moneyIncome) + ' and ' + _beautify.fix(expIncome, 0) + ' exp.');
        }
    }
    
    // hack -help
    else if (args.length == 2) {
        if (args.indexOf('hack') == 0 && args.indexOf('-help') == 1) {
            for (var arg in _console.commands.hack.args) {
                var thisArg = _console.commands.hack.args[arg];
                this.print('log', '<b>' + thisArg.name + '</b>: ' + thisArg.desc + ' Example: <b>' + thisArg.example + '</b>');
            }
        }
        else
            this.print('error', _console.errors.arg);
    }
    
    else if (args.length == 3) {
        // hack -place -list
        if (args.indexOf('hack') == 0 && args.indexOf('-place') == 1 && args.indexOf('-list') == 2) {
            for (var place in _console.commands.hack.places) {
                var thisPlace = _console.commands.hack.places[place];
                _console.print('log', '<b>' + thisPlace.name + '</b>: require level ' + thisPlace.reqLevel + ', hacking time ' + thisPlace.time + ' sec.');
            }
        }
        
        // hack -place placeName
        else if (args.indexOf('hack') == 0 && args.indexOf('-place') == 1 && typeof args[2] == 'string' && !_core.player.isHacking) {
            var exist = false;
            
            for (var place in _console.commands.hack.places) {
                if (args[2] == _console.commands.hack.places[place].name)
                    exist = true;
            }
            
            if (exist && _core.player.level >= _console.commands.hack.places[args[2]].reqLevel) {
                _core.player.isHacking = true;
                _core.player.hackingWhat = args[2];
                this.print('log', 'Hacking <b>' + args[2] + '</b>...');
            }
            else if (_core.player.level < _console.commands.hack.places[args[2]].reqLevel)
                this.print('error', _console.errors.hackLevelLow);
            else if (!exist)
                this.print('error', _console.errors.hackPlaceUnknown);
        }
        
        // hack -place unknownPlace
        else
            this.print('error', _console.errors.hackError);
    }

};