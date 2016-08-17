game.places = {
	'mini_market': {
		name: 'mini_market',
		cleanName: 'mini-market',
		minMoney: 250,
		maxMoney: 750,
		minExp: 100,
		maxExp: 300,
		time: 20,
		levelReq: 2
	},
	'market': {
		name: 'market',
		cleanName: 'market',
		minMoney: 650,
		maxMoney: 2500,
		minExp: 200,
		maxExp: 500,
		time: 60,
		levelReq: 8
	},
	'jewelry': {
		name: 'jewelry',
		cleanName: 'jewelry',
		minMoney: 7500,
		maxMoney: 15000,
		minExp: 400,
		maxExp: 1500,
		time: 480,
		levelReq: 15
	},
	'bank': {
		name: 'bank',
		cleanName: 'bank',
		minMoney: 25000,
		maxMoney: 50000,
		minExp: 2500,
		maxExp: 10000,
		time: 2880,
		levelReq: 20
	},
	'trading_center': {
		name: 'trading_center',
		cleanName: 'trading-center',
		minMoney: 1e5,
		maxMoney: 4e5,
		minExp: 15000,
		maxExp: 50000,
		time: 11520,
		levelReq: 28
	},
	'anonymous_hideout': {
		name: 'anonymous_hideout',
		cleanName: 'anonymous-hideout',
		minMoney: 1e6,
		maxMoney: 1e7,
		minExp: 75000,
		maxExp: 150000,
		time: 34560,
		levelReq: 35
	},
	'deepweb': {
		name: 'deepweb',
		cleanName: 'deepweb',
		minMoney: 5e8,
		maxMoney: 15e8,
		minExp: 300000,
		maxExp: 1000000,
		time: 81920,
		levelReq: 50
	}
};

g.places.getTime = (what) => {
	return g.places[what].time;
};

g.places.getAverageCash = (what) => {
	var cashMult = g.player.getCashMult();

	return (g.places[what].maxMoney - g.places[what].minMoney) * cashMult;
};

g.places.getAverageExp = (what) => {
	var expMult = g.player.getExpMult();

	return (g.places[what].maxExp - g.places[what].minExp) * expMult;
};

g.places.getCash = (what) => {
	var cashMult = g.player.getCashMult();

	return randomInclusive(g.places[what].minMoney, g.places[what].maxMoney) * cashMult;
};

g.places.getExp = (what) => {
	var expMult = g.player.getExpMult();

	return randomInclusive(g.places[what].minExp, g.places[what].maxExp) * expMult;
};