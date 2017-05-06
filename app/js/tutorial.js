skidinc.tutorial = {};
skidinc.tutorial.enabled = true;
skidinc.tutorial.finish = false;
skidinc.tutorial.step = 0;

skidinc.tutorial.switchStep = function(step) {
    skidinc.tutorial.step = step;
    skidinc.tutorial.core();
};

skidinc.tutorial.begin = function() {
    if (!this.enabled || this.finish) {
        $('.intro').remove();
        $('.game').fadeIn('fast', function() {
            $('#command-input').focus();
        });
        
        return;
    };
    
    this.core();
};

skidinc.tutorial.finished = function() {
    skidinc.tutorial.enabled = false;
    skidinc.tutorial.finish = true;

    $('.intro').fadeOut('fast', function() {
        $('.intro').remove();
        $('.game').fadeIn('fast', function() {
            $('#command-input').focus();
        });
    });
};

skidinc.tutorial.skip = function() {
    skidinc.console.inputEnabled = true;
    skidinc.tutorial.finished();
};

skidinc.tutorial.core = function() {
    switch(this.step) {
        case 0:
            skidinc.console.inputEnabled = false;
            
            skidinc.console.print('<h>INTRODUCTION</h> Welcome to <b>SkidInc</b>, an idle-game with an hacking theme! I\'m a small tutorial explaining how to play this game. Before starting, you don\'t need to have any knowledge in programming or other stuff like this to understand and enjoy the game.', function() {
                skidinc.console.print('<h>TUTORIAL</h> So, if you didn\'t noticed it, this is the terminal. This is where everything takes place. Terminal is divided into <b>2 parts</b>, <b>logs</b> (where things are written) and <b>input</b> where you write things (next to the <b>skidinc@root</b> thing).', function() {
                    skidinc.console.print('<h>TUTORIAL</h> Before starting this adventure, we need to know your username. To set your username, you need to type a command, which require an argument. This command is <b>username [yourUsername]</b>, where <b>username</b> is the command, and <b>[yourUsername]</b> is the argument of the command <b>(put your username without the [])</b> (you can\'t change your username later!).', function() {
                        skidinc.console.inputEnabled = true;
                    });
                });
            });
            break;
        
        case 1:
            skidinc.console.inputEnabled = false;
            
            skidinc.console.print('<h>TUTORIAL</h> You can get a list of all available commands by entering <b>help</b>. Try it and take a look at the available commands.', function() {
                skidinc.console.inputEnabled = true;
            });
            break;
        
        case 2:
            setTimeout(function() {
                skidinc.console.inputEnabled = false;
                
                skidinc.console.print('<h>TUTORIAL</h> We are going to take a look at the <b>script</b> command. This command will execute a script, which will take some time, but when it will finish we will earn some money and experience. You can get a list of available scripts if you add the argument <b>-l/-list</b>, so it will looks like <b>script -l</b> or <b>script -list</b>. Now try to execute your first script.', function() {
                    skidinc.console.inputEnabled = true;
                });
            }, 5000);
            break;
        
        case 3:
            skidinc.console.inputEnabled = false;
            
            setTimeout(function() {
                skidinc.console.print('<h>TUTORIAL COMPLETE</h> Nice, you are ready to play the real game now.', function() {
                    setTimeout(function() {
                        skidinc.console.inputEnabled = true;
                        skidinc.tutorial.finished();
                    }, 5000);
                });
            }, 2000);
            break;
    };
};