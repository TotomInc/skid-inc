game.achievements = {
    owned: new Array(),
    list: new Array(),
    printed: new Array(),
    
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
                
                console.log(game.achievements.printed[i])
                
                if (!game.achievements.printed[i]) {
                    game.achievements.printed[i] = true;
                    
                    game.console.print('success', 'Achievement earned: <b>' + thisAch.name + '</b>, ' + thisAch.desc);
                };
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
            game.console.print('log', 'Achievements points: <b>' + fix(game.player.achievementsPoints, 0) + '</b>');
            
            for (var i = 0; i < game.achievements.list.length; i++)
                game.console.print('', '<b>' + game.achievements.list[i].name + '</b>: ' + game.achievements.list[i].desc + ' ' +
                    'Reward: +' + game.achievements.list[i].reward + ' ach. points, owned: ' + !!game.achievements.owned[i] + '.');
            
            return;
        };
    },
    
    checkLoaded: function() {
        if (game.achievements.owned.length !== game.achievements.list.length) {
            var diff = game.achievements.list.length - game.achievements.owned.length;
            
            for (var i = 0; i < diff; i++) {
                game.achievements.owned.push(false);
                game.achievements.printed.push(false);
            };
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
            new game.achievements.create('Script Kid V', 'Hack 1,000,000 times (click or via console).',
                'game.player.timesHacked', 1000000, 250),
            
            new game.achievements.create('Hacker I', 'Hack 10 times a place.',
                'game.player.timesPlacesHacked', 10, 10),
            new game.achievements.create('Hacker II', 'Hack 1,00 times a place.',
                'game.player.timesPlacesHacked', 100, 25),
            new game.achievements.create('Hacker III', 'Hack 1,000 times a place.',
                'game.player.timesPlacesHacked', 1000, 50),
            new game.achievements.create('Hacker IV', 'Hack 10,000 times a place.',
                'game.player.timesPlacesHacked', 10000, 75),
            new game.achievements.create('Hacker V', 'Hack 100,000 times a place.',
                'game.player.timesPlacesHacked', 100000, 250),
            
            new game.achievements.create('Personal servers I', 'Buy your first personal server.',
                'game.servers.personal.owned', 1, 10),
            new game.achievements.create('Personal servers II', 'Buy 50 personal servers.',
                'game.servers.personal.owned', 50, 20),
            new game.achievements.create('Personal servers III', 'Buy 250 personal servers.',
                'game.servers.personal.owned', 250, 40),
            new game.achievements.create('Personal servers IV', 'Buy 1,000 personal servers.',
                'game.servers.personal.owned', 1000, 80),
            new game.achievements.create('Personal servers IV', 'Buy 25,000 personal servers.',
                'game.servers.personal.owned', 25000, 160),

            new game.achievements.create('Professional servers I', 'Buy your first professional server.',
                'game.servers.professional.owned', 1, 10),
            new game.achievements.create('Professional servers II', 'Buy 50 professional servers.',
                'game.servers.professional.owned', 50, 20),
            new game.achievements.create('Professional servers III', 'Buy 250 professional servers.',
                'game.servers.professional.owned', 250, 40),
            new game.achievements.create('Professional servers IV', 'Buy 1,000 professional servers.',
                'game.servers.professional.owned', 1000, 80),
            new game.achievements.create('Professional servers IV', 'Buy 25,000 professional servers.',
                'game.servers.professional.owned', 25000, 160)
        ];
        
        for (var i = 0; i < game.achievements.list.length; i++) {
            game.achievements.owned.push(false);
            game.achievements.printed.push(false);
        };
    }
};