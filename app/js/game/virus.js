game.virus = {
    doingVirus: false,
    whatVirus: undefined,
    virusProgress: 0,
    oneSecInterval: 0,
    
    getTime: function(what) {
        return what.time / game.player.getGlobalTimeMult();
    },
    
    getEffect: function(what) {
        return what.effect;
    },
    
    getTotalEffect: function(what) {
        return getEffect(what) * what.send;
    },
    
    getSuccessRate: function(what) {
        return what.success * 100;
    },
    
    getAllVirusSend: function() {
        var count = 0;
        
        for (var virus in game.virus.list)
            count += game.virus.list[virus].effect * game.virus.list[virus].send;
    
        return count;
    },
    
    virusDesc: function(what) {
        var Virus = game.virus.list[what];
        return 'level req. <b>' + Virus.reqLevel + '</b>, takes <b>' + game.virus.getTime(Virus) + '</b> sec, success rate of <b>' + game.virus.getSuccessRate(Virus) +
            '</b>, one ' + Virus.name + ' infect <b>' + Virus.effect + '</b> computers/sec. <span class="virus-factoid"><i class="fa fa-question-circle-o" aria-hidden="true"></i> <span class="virus-factoid-content"><i>' + Virus.factoid + '</i></span></span>';
    },
    
    cancel: function() {
        $('#virus-progress').html('Virus ' + game.virus.whatVirus.name + ' cancelled.').attr('id', 'old-virus-progress');
        game.virus.doingVirus = false;
        game.virus.whatVirus = undefined;
        game.virus.virusProgress = 0;
    },
    
    create: function(what) {
        var Virus = game.virus.list[what];
        
        if (!game.hack.isHacking && !game.virus.doingVirus && game.player.level >= Virus.reqLevel) {
            game.virus.doingVirus = true;
            game.virus.whatVirus = Virus;
            game.console.print('Creating ' + Virus.name + ' virus... You can cancel your virus with <b>virus create cancel</b>.');
            $('.text-side').append('<p id="virus-progress">');
        }
        else if (game.hack.isHacking)
            game.console.print('You can\'t hack a place and create a virus at the same time.', 'error');
        else if (game.virus.doingVirus)
            game.console.print('You can\'t create multiple virus at once.', 'error');
        else if (game.player.level < Virus.reqLevel)
            game.console.print('Your level is too low to create this virus.', 'error');
        else
            game.console.print('You can\'t create this virus.', 'error');
    },
    
    loop: function(times) {
        if (game.virus.oneSecInterval >= 1000) {
            game.virus.oneSecInterval = 0;
            game.servers.zombie.owned += game.virus.getAllVirusSend();
            game.botnet.power = game.botnet.getPower();
        }
        else
            game.virus.oneSecInterval += (times / game.fps) * 1000;
        
        if (game.virus.doingVirus) {
            var Virus = game.virus.whatVirus,
                time = game.virus.getTime(Virus),
                timeLeft = 0,
                percent = Math.floor(game.virus.virusProgress / time * 100),
                filled = Math.floor(game.virus.virusProgress / time * 35),
                left = Math.ceil(35 - filled),
                bar = '|';

            game.virus.virusProgress += times / game.fps;

            if (game.virus.virusProgress < time) {
                for (var i = 0; i < filled; i++)
                    bar += '#';

                for (var e = 0; e < left; e++)
                    bar += '=';

                timeLeft = time - game.virus.virusProgress;
                bar += '| <b>' + fix(percent, 0) + '%, ' + fix(timeLeft, 2) + ' sec</b>';

                $('#virus-progress').html(bar);
            }
            else if (game.virus.virusProgress >= time) {
                var successRate = Math.random();

                for (var j = 0; j < 35; j++)
                    bar += '#';

                bar += '| <b>100%, 0.00 sec</b>';

                if (successRate <= Virus.success) {
                    Virus.send++;
                    game.console.print('Your ' + Virus.name + ' virus works well and will infect computers over time.');
                }
                else
                    game.console.print('Your ' + Virus.name + ' virus is a fail.', 'error');

                $('#virus-progress').html(bar).attr('id', 'old-virus-progress');
                
                game.virus.doingVirus = false;
                game.virus.whatVirus = undefined;
                game.virus.virusProgress = 0;
            };
        }
    }
};