var game = {
    randomInclusive: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    setInputTimeout: function() {
        $('#console-input').val('');
        $('#console-input').unbind('keydown');

        setTimeout(function() {
            $('#console-input').bind('keydown', function(e) {
                if (e.which == 13)
                    game.console.executer();
            });
        }, game.options.bindTime);
    },
    
    earnMoney: function(amount) {
        game.player.money += amount;
        game.player.totalMoney += amount;
    },
    
    earnExp: function(amount) {
        game.player.exp += amount;
        
        while (game.player.exp >= game.player.maxExp) {
            game.player.exp -= game.player.maxExp;
            game.player.level++;
            game.player.maxExp = Math.floor(Math.pow(game.player.expInflation, game.player.level) * 100);
        };
    },
    
    display: function() {
        $('#well-resources').html(
            'Money: $' + fix(game.player.money) + '<br>' +
            'Level: ' + fix(game.player.level, 0) + '<br>' +
            'Exp: ' + fix(game.player.exp, 0) + '/' + fix(game.player.maxExp, 0)
        );
        
        document.title = '$' + fix(game.player.money) + ' - SkidInc.';
    },
    
    loop: function() {
		game.options.now = new Date().getTime();
		
		var elapsed = game.options.now - game.options.before,
			times = Math.floor(elapsed / game.options.interval);
		
		elapsed > game.options.interval ? game.updateGame(times) : game.updateGame(1);
		
		game.options.before = new Date().getTime();
    },
    
    updateGame: function(times) {
        game.display();
    },
    
    varInit: function() {
        game.options.interval = (1000 / game.options.fps);
        
        game.options.intervals.loop = setInterval(game.loop, game.options.interval);
        
        game.sounds.varInit();
    },
    
    domInit: function() {
        $('#hack-button').on('click', function() {
            game.hack('sp-click');
        });
        
		$('#console-enter').on('click', function() {
			game.console.executer();
		});

		$('#console-input').bind('keydown', function(e) {
			if (e.which == 13)
				game.console.executer();
		});

		$('#console-input').bind('copy paste', function(e) {
			e.preventDefault();
		});
		
		$('img').on('dragstart', function(e) {
		    e.preventDefault();
		});
    },
    
    init: function() {
        game.varInit();
        game.domInit();
    }
};