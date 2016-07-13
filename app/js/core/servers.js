game.servers = {
    getCostArray: function(i) {
        if (i == 0)
            return game.servers.getPersCost();
        else if (i == 1)
            return game.servers.getProCost();
        else if (i == 2)
            return game.servers.getVMCost();
        else if (i == 3)
            return game.servers.getQuickhackCost();
        else
            return;
    },
    
    getCostOption: function(what) {
        if (what == 'personal')
            return game.servers.getPersCost();
        else if (what == 'professional')
            return game.servers.getProCost();
        else if (what = 'vm')
            return game.servers.getVMCost();
        else if (what == 'quickhack')
            return game.servers.getQuickhackCost();
        else
            return;
    },
    
    getPersCost: function() {
        return Math.floor(game.servers.personal.cost * Math.pow(game.servers.personal.inflation, game.servers.personal.owned));
    },
    
    getPersReward: function() {
        return (1 + (game.servers.personal.owned * (game.servers.personal.moneyReward - 1)) + (game.servers.personal.mult * game.servers.personal.owned - game.servers.personal.owned));
    },
    
    getProCost: function() {
        return Math.floor(game.servers.professional.cost * Math.pow(game.servers.professional.inflation, game.servers.professional.owned));
    },
    
    getProReward: function() {
        return {
            money: (1 + (game.servers.professional.owned * (game.servers.professional.moneyReward - 1)) + (game.servers.professional.mult * game.servers.professional.owned - game.servers.professional.owned)),
            exp: (1 + (game.servers.professional.owned * (game.servers.professional.expReward - 1)) + (game.servers.professional.mult * game.servers.professional.owned - game.servers.professional.owned))
        };
    },
    
    getVMCost: function() {
        return Math.floor(game.servers.vm.cost * Math.pow(game.servers.vm.inflation, game.servers.vm.owned));
    },
    
    getVMReward: function() {
        return (1 + (game.servers.vm.owned * (game.servers.vm.accelerator - 1)));
    },
    
    getQuickhackCost: function() {
        return Math.floor(game.servers.quickhack.cost * Math.pow(game.servers.quickhack.inflation, game.servers.quickhack.owned));
    },
    
    getClickDivider: function() {
        return Math.floor(5 - game.servers.quickhack.owned);
    },
    
    // increase money income for hack cmd/button
    personal: {
        owned: 0,
        cost: 750,
        inflation: 1.08,
        moneyReward: 1.08,
        mult: 1,
        level: 0,
        upInflation: 10,
        multAdd: 0.05,
        desc: 'low-cost server, slightly increase money hack income'
    },
    
    // increase money/exp income for hack cmd/button
    professional: {
        owned: 0,
        cost: 150000,
        inflation: 1.08,
        moneyReward: 1.20,
        expReward: 1.05,
        mult: 1,
        level: 0,
        upInflation: 50,
        multAdd: 0.10,
        desc: 'better than low-cost servers, greatly increase money and experience hack income'
    },
    
    // reduce place hack time
    vm: {
        owned: 0,
        cost: 5000,
        inflation: 1.40,
        accelerator: 1.01,
        desc: 'virtual machines can reduce the time when hacking a place'
    },
    
    // reduce click divider (default 16)
    quickhack: {
        owned: 0,
        cost: 1e6,
        inflation: 10000,
        accelerator: 1.5,
        desc: 'a quickhack server reduce by 1 the divided reward when clicking'
    }
};