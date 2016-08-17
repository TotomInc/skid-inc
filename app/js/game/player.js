game.player = {
    rank: 'Script Kid',
    money: 0,
    totalMoney: 0,
    level: 1,
    exp: 0,
    expReq: 100,
    expInflation: 1.30,

    isNew: false,
    difficulty: 'normal'
};

g.player.getCashMult = () => {
	return 1;
};

g.player.getExpMult = () => {
	return 1;
};

g.player.calculateExpReq = () => {
	var exp = Math.floor(Math.pow(g.player.expInflation, g.player.level) * (100 * g.player.level));

	g.player.expReq = exp;
};