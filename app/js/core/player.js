game.player = {
    money: 0,
    totalMoney: 0,

    level: 1,

    exp: 0,
    maxExp: 100,
    expInflation: 1.10,

    moneyMult: 1,

    randMoneyMax: 7,
    randMoneyMin: 3,

    expMult: 1,

    randExpMax: 5,
    randExpMin: 1,
    
    clickReducer: 16,
    
    achievementsPoints: 0,
    
    timesHacked: 0,
    timesPlacesHacked: 0,
    
    isHacking: false,
    hackingWhat: undefined,
    hackingProgress: 0,
    
    serverPers: 0,
    serverPersReward: 1.20,
    serverPersCost: 500,
    serverPersInflation: 1.08,
    
    serverPro: 0,
    serverProReward: 1.40,
    serverProRewardExp: 1.40,
    serverProCost: 7500,
    serverProInflation: 1.06,
    
    serverSpeedHack: 0,
    serverSpeedHackAccelerator: 1.01,
    serverSpeedHackCost: 5000,
    serverSpeedHackInflation: 1.50,
    
    serverQuickHack: 0,
    serverQuickHackAccelerator: 1.5,
    serverQuickHackCost: 1000000,
    serverQuickHackInflation: 1e3
};