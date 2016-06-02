game.achievements = {
    owned: new Array(),
    list: new Array(),
    
    create: function(name, desc, reqName, reqNum, reward) {
        this.name = name;
        this.desc = desc;
        this.reqName = reqName;
        this.reqNum = reqNum;
        this.reward = reward;
    },
    
    check: function() {
        for (var i = 0; i < game.achievements.list.length; i++) {
            var thisAch = game.achievements.list[i],
                playerValue = eval(game.achievements.list[i].reqName);
            
            if (playerValue >= thisAch.reqNum && !game.achievements.owned[i]) {
                game.player.achievementsPoints += thisAch.reward;
                game.achievements.owned[i] = true;
                
                game.console.print('success', 'Achievement earned: <b>' + thisAch.name + '</b>, ' + thisAch.desc);
            };
        };
    },
    
    exec: function(from) {
        if (from == "sp") {
            game.console.print('error', game.console.errors.achNoArgs);
            
            return;
        };
        
        if (from == "help") {
            game.console.print('help', game.console.help.achievements);
            
            return;
        };
        
        if (from == "list") {
            game.console.print('log', 'Achievements points: ' + fix(game.player.achievementsPoints));
            
            for (var i = 0; i < game.achievements.list.length; i++)
                game.console.print('', '<b>' + game.achievements.list[i].name + '</b>: ' + game.achievements.list[i].desc + ' ' +
                    'Reward: +' + game.achievements.list[i].reward + ' ach. points, owned: ' + !!game.achievements.owned[i] + '.');
            
            return;
        };
    },
    
    varInit: function() {
        game.achievements.list = [
            new game.achievements.create('Script Kid I', 'Hack 100 times (click or via console).',
                'game.player.timesHacked', 100, 10),
            new game.achievements.create('Script Kid II', 'Hack 1,000 times (click or via console).',
                'game.player.timesHacked', 1000, 25),
            new game.achievements.create('Script Kid III', 'Hack 10,000 times (click or via console).',
                'game.player.timesHacked', 10000, 50),
            new game.achievements.create('Script Kid IV', 'Hack 100,000 times (click or via console).',
                'game.player.timesHacked', 100000, 75),
            
            new game.achievements.create('Hacker I', 'Hack 10 times a place.',
                'game.player.timesPlacesHacked', 10, 10),
            new game.achievements.create('Hacker II', 'Hack 1,00 times a place.',
                'game.player.timesPlacesHacked', 100, 25),
            new game.achievements.create('Hacker III', 'Hack 1,000 times a place.',
                'game.player.timesPlacesHacked', 1000, 50),
            new game.achievements.create('Hacker IV', 'Hack 10,000 times a place.',
                'game.player.timesPlacesHacked', 10000, 75)
        ];
        
        for (var i = 0; i < game.achievements.list.length; i++)
            game.achievements.owned.push(false);
    },
    
    domInit: function() {}
};