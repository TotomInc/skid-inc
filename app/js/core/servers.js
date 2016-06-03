game.servers = {
    getPersCost: function() {
        return Math.floor(game.servers.personal.cost * Math.pow(game.servers.personal.inflation, game.servers.personal.owned));
    },
    
    getPersReward: function() {
        return (1 + (game.servers.personal.owned * (game.servers.personal.moneyReward - 1)));
    },
    
    getProCost: function() {
        return Math.floor(game.servers.professional.cost * Math.pow(game.servers.professional.inflation, game.servers.professional.owned));
    },
    
    getProReward: function() {
        return {
            money: (1 + (game.servers.professional.owned * (game.servers.professional.moneyReward - 1))),
            exp: (1 + (game.servers.professional.owned * (game.servers.professional.expReward - 1)))
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
        return Math.floor(16 - game.servers.quickhack.owned);
    },
    
    // increase money income for hack cmd/button
    personal: {
        owned: 0,
        cost: 750,
        inflation: 1.12,
        moneyReward: 1.05
    },
    
    // increase money/exp income for hack cmd/button
    professional: {
        owned: 0,
        cost: 150000,
        inflation: 1.12,
        moneyReward: 1.20,
        expReward: 1.05
    },
    
    // reduce place hack time
    vm: {
        owned: 0,
        cost: 5000,
        inflation: 1.40,
        accelerator: 1.02
    },
    
    // reduce click divider (default 16)
    quickhack: {
        owned: 0,
        cost: 1e6,
        inflation: 1e3,
        accelerator: 1.5
    }
};