game.options = {
	typedEffect: false,
	background: true,
	view: 'default',

	toggleBackground: function(toggle) {
		if (toggle == 'enable') {
			game.options.background = true;
			$('.matrix-effect').fadeIn('slow');
		}
		else {
			game.options.background = false;
			$('.matrix-effect').fadeOut('slow');
		};
	},
	
	toggleBlackbars: function(toggle) {
		toggle == 'enable' ? $('.screen').removeClass('no-blackbars') : $('.screen').addClass('no-blackbars');
	},

	toggleTyped: function(toggle) {
		toggle == 'enable' ? game.options.typedEffect = true : game.options.typedEffect = false;
		game.console.print('Typed effect <b>' + toggle + '</b>.');
	},

	setFps: function(num) {
		if (num > 144)
			game.console.print('You can\'t put a value greater than <b>144 fps</b>.', 'error');
		else if (num < 1)
			game.console.print('You can\'t put a value lower than <b>1 fps</b>.', 'error');
		else {
			game.fps = num;
			game.interval = 1000 / game.fps;
			
			clearInterval(game.intervals.core);

			game.intervals.core = setInterval(function() {
				game.core();
			}, game.interval);
			
			game.console.print('FPS set to <b>' + num + '</b>. If the game lag, try to reduce fps.');
		};
	},
	
	changeStats: function(view) {
		var col1 = $('#col-1 > p'),
			col2 = $('#col-2 > p'),
			col3 = $('#col-3 > p');
		
		switch (view) {
			case 'default':
				$(col2[0]).attr('id', 'stats-timemult').html('');
				$(col2[1]).attr('id', 'stats-moneymult').html('');
				$(col2[2]).attr('id', 'stats-expmult').html('');
				$(col3[0]).attr('id', 'stats-reputation').html('');
				$(col3[1]).attr('id', 'stats-totalmoney').html('');
				$(col3[2]).attr('id', 'stats-prestigied').html('');
				break;
			
			case 'servers':
				$(col2[0]).attr('id', 'stats-irccost').html('');
				$(col2[1]).attr('id', 'stats-vmcost').html('');
				$(col2[2]).attr('id', 'stats-moneymult').html('');
				$(col3[0]).attr('id', 'stats-ircowned').html('');
				$(col3[1]).attr('id', 'stats-vmowned').html('');
				$(col3[2]).attr('id', 'stats-expmult').html('');
				break;
		};
		
		game.options.view = view;
		game.console.print('Stats view switched to <b>' + view + '</b>.');
	}
};