game.console = {
    latest: undefined,
    canUseUpkey: true,
    
    typeLast: function() {
        var last = String(game.console.latest);
        
        if (game.abilities.list['up_key'].owned && game.console.canUseUpkey) {
            game.console.canUseUpkey = false;
            $('#console-input').val(last);
            
            window.setTimeout(function() {
                game.console.canUseUpkey = true;
            }, game.options.upkeyBindTime);
        }
    },
    
    executer: function() {
        var input = $('#console-input').val();
        var results = filterArrayOnRegexPattern(input, game.console.cmds);
        
        if (input == '') {
            game.console.print('error', 'You can\'t send empty commands.');
            
            return;
        }
        
        if (results.length == 1) {
            var result = results[0],
                instances = filterArrayOnRegexPattern(input, result.commandRegex);
            
            if (instances.length == 1) {
                var instance = instances[0],
                    option = '';
                
                if (instance.options) {
                    var optionRegex = new RegExp(instance.options, 'g'),
                        matches = input.match(optionRegex);
                    
                    if (matches == null)
                        game.console.print('error', '<b>' + input + '</b>: unknown argument(s) value(s).');
                    else if (matches.length == 1) {
                        var option = matches[0];
                        eval(instance.exec);
                    }
                }
                else
                    eval(instance.exec);
            }
            else
                game.console.print('error', '<b>' + input + '</b>: unknown argument(s).');
        }
        else
            game.console.print('error', '<b>' + input + '</b>: unknown command.');
        
        if (game.options.sounds)
            game.sounds.button.play();
        
        game.console.latest = input;
        $('#console-input').val('');
    },
    
    domInit: function() {
        // console domInit
        $('#console-enter').on('click', function() {
            game.console.executer();
        });

        $('#console-input').bind('keydown', function(e) {
            if (e.which == 13)
                game.console.executer();
        }).keydown(function(e) {
            if (e.which == 38) {
                e.preventDefault();
                game.console.typeLast();
            };
        });

        $('#console-input').bind('copy paste', function(e) {
            e.preventDefault();
        });

        $('#console-input').bind('cut paste', function(e) {
            e.preventDefault();
        });
        
        // place tab domInit
        for (var place in game.console.cmds[0].places) {
            var thisPlace = game.console.cmds[0].places[place],
                moneyMult = game.getGlobalMoneyMult(),
                expMult = game.getGlobalExpMult(),
                time = game.getPlaceTime(thisPlace),
                money = thisPlace.maxMoneyReward * moneyMult,
                exp = thisPlace.maxExpReward * expMult;
            
            $('#places-well').append('<div id="place-' + thisPlace.name + '" class="row">');
            $('#place-' + thisPlace.name).append('' +
                '<div class="col-md-2">' +
                    '<a class="thumbnail">' +
                        '<img id="img-' + thisPlace.name + '" src="' + thisPlace.iconURL + '" width="50">' +
                    '</a>' +
                '</div>' +
                '<div class="col-md-3">' +
                    '<p class="text-center"><b>' + thisPlace.name.cap() + '</b><br>Require level ' + fix(thisPlace.reqLevel, 0) + '<br>Take ' + fix(time, 2) + ' sec.</p>' +
                '</div>' +
                '<div class="col-md-4">' +
                    '<p class="text-center">Up to $' + fix(money) + '<br>Up to ' + fix(exp) + ' exp.</p>' +
                    '<div class="progress">' +
                        '<div id="bar-' + thisPlace.name + '" class="progress-bar"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-3">' +
                    '<a id="hack-' + thisPlace.name + '" class="btn btn-default btn-block">Hack!</a><p id="time-' + thisPlace.name + '" class="text-center hack-ui-margin">0.00 sec left</p>' +
                '</div>');
            $('#img-' + thisPlace.name + ', #hack-' + thisPlace.name).on('click', function() {
                var hackID = $(this).attr('id'),
                    place = hackID.substring(5, hackID.length);
                
                game.hack('place', place);
            });
            
            if (game.team.list[thisPlace.hackerName].owned) {
                $('#hack-' + thisPlace.name).addClass('hacker-owned').html('Hacker owned').css('cursor', 'not-allowed').off('click');
                $('#bar-' + thisPlace.name).addClass('bar-hacker-owned');
            }
        }
    }
};