skidinc.server = {};
skidinc.server.servers = ['telnet', 'web'];
skidinc.server.owned = [0, 0];
skidinc.server.telnet = {
    id: 'telnet',
    index: 0,
    price: 1e6,
    inflation: 2,
    max: 100,
    effects: {
        time: 0.05
    }
};
skidinc.server.web = {
    id: 'web',
    index: 1,
    price: 800,
    inflation: 1.18,
    max: Infinity,
    effects: {
        money: 0.12,
        exp: 0.05
    }
};

skidinc.server.getPrice = function(what) {
    var server = skidinc.server[what];
    
    return Math.floor(server.price * Math.pow(server.inflation, skidinc.server.owned[server.index]));
};

skidinc.server.getMultibuyPrice = function(what, amount) {
    var server = skidinc.server[what];
    
    return Math.floor(server.price * Math.pow(server.inflation, amount));
};

skidinc.server.getEffects = function(what) {
    var server = skidinc.server[what],
        size = Object.keys(server.effects).length,
        obj = {};
    
    for (var effect in server.effects) {
        var i = effect,
            effect = server.effects[effect];
        
        obj[i] = 1 + effect * skidinc.server.owned[server.index];
    };
    
    return obj;
};

skidinc.server.getEffectsToStr = function(what) {
    var server = skidinc.server[what],
        size = Object.keys(server.effects).length,
        e = 0,
        str = '';
    
    for (var effect in server.effects) {
        var i = effect,
            effect = server.effects[effect];
        
        str += '<b>+' + fix(effect) + '</b> to ' + i + ' multiplier';
        
        e++;
        
        (e == size) ? str += '' : str += ', ';
    };
    
    return str;
};

skidinc.server.list = function() {
    var str = '';
    
    for (var i = 0; i < skidinc.server.servers.length; i++) {
        var server = skidinc.server[skidinc.server.servers[i]],
            cost = skidinc.server.getPrice(server.id),
            effects = skidinc.server.getEffectsToStr(server.id);
        
        str += '<b>*</b> <z>' + server.id + '</z>: cost <b>$' + fix(cost) + '</b>, ' + effects + '.<br>';
    };
    
    return str;
};

skidinc.server.buy = function(item, amount) {
    if (skidinc.server.servers.indexOf(item) == -1)
        return skidinc.console.print('<x>ERR</x> server type <b>' + item + '</b> doesn\`t exist.');
    
    if (typeof amount == 'number' && amount == 1) {
        var cost = skidinc.server.getPrice(item),
            server = skidinc.server[item];
        
        if (skidinc.player.money >= cost && skidinc.server.owned[server.index] + 1 <= server.max) {
            skidinc.player.money -= cost;
            skidinc.server.owned[server.index]++;
            return skidinc.console.print('<z>SERVER</z> you successfully upgraded your <b>' + server.id + '</b> server.');
        };
        
        if (skidinc.server.owned[server.index] + 1 > server.max)
            return skidinc.console.print('<x>ERR</x> this server have a max level which is <b>' + server.max + '</b>.');
        else if (skidinc.player.money < cost)
            return skidinc.console.print('<x>ERR</x> not enough money to upgrade your <b>' + server.id + '</b> server (cost <b>$' + fix(cost, 0) + '</b>).');
    };
    
    if (typeof amount == 'number' && amount > 1) {
        var server = skidinc.server[item],
            owned = skidinc.server.owned[server.index],
            tempOwned = owned,
            i = 0,
            totalCost = 0;
        
        while (i < amount) {
            tempOwned++;
            totalCost += skidinc.server.getMultibuyPrice(item, tempOwned);
            i++;
        };
        
        if (skidinc.player.money >= totalCost && tempOwned <= server.max) {
            skidinc.player.money -= totalCost;
            skidinc.server.owned[server.index] += amount;
            return skidinc.console.print('<z>SERVER</z> you successfully upgraded your <b>' + server.id + '</b> server by <b>' + amount + ' levels</b>.');
        };
        
        if (skidinc.server.owned[server.index] + amount > server.max)
            return skidinc.console.print('<x>ERR</x> this server have a max level (<b>' + server.max + '</b>) that will be exceeded if you upgrade it <b>' + amount + ' times</b>.');
        if (skidinc.player.money < totalCost)
            return skidinc.console.print('<x>ERR</x> not enough money to upgrade your <b>' + server.id + '</b> server <b>' + amount + ' times</b> (total cost of <b>$' + fix(totalCost, 0) + '</b>).');
    };
    
    if (typeof amount == 'string' && amount == 'max') {
        var server = skidinc.server[item],
            owned = skidinc.server.owned[server.index],
            tempOwned = owned,
            toBuy = 0,
            totalCost = 0;
        
        while (skidinc.player.money >= totalCost + skidinc.server.getMultibuyPrice(item, tempOwned + 1)) {
            tempOwned++;
            toBuy++;
            totalCost += skidinc.server.getMultibuyPrice(item, tempOwned);
        };
        
        if (skidinc.player.money >= totalCost && tempOwned <= server.max) {
            skidinc.player.money -= totalCost;
            skidinc.server.owned[server.index] += toBuy;
            return skidinc.console.print('<z>SERVER</z> you successfully upgraded your <b>' + server.id + '</b> server by <b>' + toBuy + ' levels</b>, it cost you <b>$' + fix(totalCost, 0) + '</b>.');
        };
        
        if (skidinc.server.owned[server.index] + toBuy > server.max)
            return skidinc.console.print('<x>ERR</x> this server have a max level (<b>' + server.max + '</b>) that will be exceeded if you upgrade it <b>' + toBuy + ' times</b>.');
        if (skidinc.player.money < totalCost)
            return skidinc.console.print('<x>ERR</x> not enough money to upgrade your <b>' + server.id + '</b> server <b>' + toBuy + ' times</b> (total cost of <b>$' + fix(totalCost, 0) + '</b>).');
    };
};

skidinc.server.prestige = function() {
    skidinc.server.owned = [];
    
    skidinc.server.servers.forEach(function(i) {
        skidinc.server.owned.push(0);
    });
};