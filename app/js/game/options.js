game.options = {
	typedEffect: false,
	background: false,
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
		if (num > 60)
			game.console.print('You can\'t put a value greater than <b>60 fps</b>.', 'error');
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
				$(col1[0]).attr('id', 'stats-money').html('');
				$(col1[1]).attr('id', 'stats-level').html('');
				$(col1[2]).attr('id', 'stats-exp').html('');
				$(col2[0]).attr('id', 'stats-timemult').html('');
				$(col2[1]).attr('id', 'stats-moneymult').html('');
				$(col2[2]).attr('id', 'stats-expmult').html('');
				$(col3[0]).attr('id', 'stats-reputation').html('');
				$(col3[1]).attr('id', 'stats-totalmoney').html('');
				$(col3[2]).attr('id', 'stats-prestigied').html('');
				break;
			
			case 'servers':
				$(col1[0]).attr('id', 'stats-money').html('');
				$(col1[1]).attr('id', 'stats-level').html('');
				$(col1[2]).attr('id', 'stats-moneymult').html('');
				$(col2[0]).attr('id', 'stats-irccost').html('');
				$(col2[1]).attr('id', 'stats-vmcost').html('');
				$(col2[2]).attr('id', 'stats-expmult').html('');
				$(col3[0]).attr('id', 'stats-ircowned').html('');
				$(col3[1]).attr('id', 'stats-vmowned').html('');
				$(col3[2]).attr('id', 'stats-timemult').html('');
				break;
			
			case 'botnet':
				$(col1[0]).attr('id', 'stats-money').html('');
				$(col1[1]).attr('id', 'stats-exp').html('');
				$(col1[2]).attr('id', 'stats-level').html('');
				$(col2[0]).attr('id', 'stats-infectionspersec').html('');
				$(col2[1]).attr('id', 'stats-zombieowned').html('');
				$(col2[2]).attr('id', '').html('');
				$(col3[0]).attr('id', 'stats-botnetpower').html('');
				$(col3[1]).attr('id', 'stats-powermult').html('');
				$(col3[2]).attr('id', '').html('');
				break;
		};
		
		game.options.view = view;
		game.console.print('Stats view switched to <b>' + view + '</b>.');
	},
	
	changeTheme: function(what) {
		switch (what) {
			case 'default':
				$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top');
				$('.console').attr('class', 'console');
				break;
			
			case 'black':
				if (game.console.black) {
					$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top dark');
					$('.console').attr('class', 'console dark');
				}
				else
					game.console.print('This theme is locked, you need to buy it.', 'error');
				break;
			
			case 'monokai':
				if (game.console.monokai) {
					$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top monokai');
					$('.console').attr('class', 'console monokai');
				}
				else
					game.console.print('This theme is locked, you need to buy it.', 'error');
				break;
			
			case 'afterglow':
				if (game.console.afterglow) {
					$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top afterglow');
					$('.console').attr('class', 'console afterglow');
				}
				else
					game.console.print('This theme is locked, you need to buy it.', 'error');
				break;
			
			case 'fluoro':
				if (game.console.afterglow) {
					$('.navbar').attr('class', 'navbar navbar-default navbar-fixed-top fluoro');
					$('.console').attr('class', 'console fluoro');
				}
				else
					game.console.print('This theme is locked, you need to buy it.', 'error');
				break;
		};
	},
	
	redeemCode: function(code) {
		var time = new Date().getTime();
		
		switch(code) {
			case 1337:
				var limit = new Date(2016,12,25).getTime();
				
				if (time < limit) {
					game.console.print('TODO');
				};
				break;
		};
	}
};