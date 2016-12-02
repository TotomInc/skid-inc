game.botnet = {
    power: 0,
    
    getPowerMult: function() {
        return 1;
    },
    
    getPower: function() {
        return (game.servers.zombie.owned * 0.1) * game.botnet.getPowerMult();
    }
};