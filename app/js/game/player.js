game.player = {
    rank: 'Script Kid',
    money: 0,
    totalMoney: 0,
    level: 1,
    exp: 0,
    expReq: 100,
    expInflation: 1.30,

    isNew: true,
    difficulty: 'normal'
};

g.player.getCashMult = () => {
	return g.servers.getAllCashMult();
};

g.player.getExpMult = () => {
	return g.servers.getAllExpMult();
};

g.player.calculateExpReq = () => {
	var exp = Math.floor(Math.pow(g.player.expInflation, g.player.level) * (100 * g.player.level));

	g.player.expReq = exp;
};