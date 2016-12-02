game.servers = {
    vm: {
        name: 'vm',
        owned: 0,
        price: 1e6,
        inflation: 5.5,
        timeEffect: 0.25,
        maxCount: 50,
        buyable: true
    },
    
    irc: {
        name: 'irc',
        owned: 0,
        price: 1e4,
        inflation: 1.23,
        moneyEffect: 1.15,
        expEffect: 0.75,
        maxCount: 1e6,
        buyable: true
    },
    
    zombie: {
        name: 'zombie',
        owned: 0,
        powerEffect: 0.1,
        buyable: false
    },
    
    getCost: function(what) {
        if (what.owned < 1)
            return what.price;
        else
            return what.price * Math.pow(what.owned, what.inflation);
    },
    
    getEffects: function(what) {
        var effects = [],
            result = {};
        
        for (var key in what)
            if (key.indexOf('Effect') > -1)
                effects.push(key);
        
        for (var i = 0; i < effects.length; i++)
            result[effects[i]] = what[effects[i]];
        
        return result;
    },
    
    getTotalEffects: function(what) {
        var effects = [],
            result = {};
        
        for (var key in what)
            if (key.indexOf('Effect') > -1)
                effects.push(key);
        
        for (var i = 0; i < effects.length; i++)
            result[effects[i]] = what[effects[i]] * what.owned + 1;
        
        return result;
    },
    
    buy: function(what) {
        var Server = game.servers[what];

        if (game.player.money >= game.servers.getCost(Server) && (Server.owned + 1) < Server.maxCount && Server.buyable) {
            game.player.money -= game.servers.getCost(Server);
            Server.owned++;
            game.servers.priceUpdate();
            game.console.print('You successfully bought <b>1 ' + Server.name + '</b> server.');
        }
        else if (!Server.buyable)
            game.console.print('You can\'t buy this type of server.', 'error');
        else if (game.player.money < game.servers.getCost(Server))
            game.console.print('Not enough money, you need $<b>' + fix(game.servers.getCost(Server)) + '</b>.', 'error');
        else
            game.console.print('Can\'t buy server.');
    },

    priceUpdate: function() {
        game.console.commands.filter(function(base) {
            if (base.name == 'buy') {
                base.commands.filter(function(command) {
                    if (command.id == 0) {
                        command.optionsDesc[0] = 'VM servers decrease time required to hack a place by <b>25%</b>.' +
                            ' Cost $<b>' + fix(game.servers.getCost(game.servers.vm)) + '</b>.';
                        command.optionsDesc[1] = 'IRC servers increase your money multiplier by +<b>' + game.servers.getEffects(game.servers.irc).moneyEffect +
                            '</b>, same for experience multiplier by +<b>' + game.servers.getEffects(game.servers.irc).expEffect + '</b>. Cost $<b>' +
                            fix(game.servers.getCost(game.servers.irc)) + '</b>.';
                    };
                });
            };
        });
    }
};