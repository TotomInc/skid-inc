_console.hack = function(args, from) {
    var moneyIncome = Math.floor(Math.random() * (_core.player.randMoneyMax - _core.player.randMoneyMin + 1)) + _core.player.randMoneyMin,
        expIncome = Math.floor(Math.random() * (_core.player.randExpMax - _core.player.randExpMin + 1)) + _core.player.randExpMin,
        reducerMoneyIncome = Math.ceil(moneyIncome / _core.player.clickReducer),
        reducerExpIncome = Math.ceil(expIncome / _core.player.clickReducer);
    
    if (typeof args == 'undefined' || args.length == 1) {
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
    else if (typeof args == 'object') {
        this.print('log', 'TODO');
    }
};