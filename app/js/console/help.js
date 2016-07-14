game.console.help = {
    hack: "<b>hack</b> can be used with arguments.<br>" + 
        "<b>hack -stats</b>: stats for the simple hack.<br>" +
        "<b>hack -place <i>nameOfPlace</i></b>: hack a place.<br> "+
        "<b>hack -place -list</b>: print a list of places with their respective informations.<br>" +
        "<b>hack -place -cancel</b>: cancel the current place hack.",

    config: "You must use <b>config</b> with arguments.<br>" +
        "<b>config -sounds <i>value</i></b>: enable (true) or disable (false) the sound of the game. (default to false)<br>" +
        "<b>config -background <i>value</i></b>: enable (true) or disable (false) the background animation. (default to false)<br>" +
        '<b>config -gamemode <i>value</i></b>: switch to normal or hardcore mode (default to normal).',

    clear: "<b>clear</b> don't accept any arguments.",
    
    buy: "<b>buy</b> must be used with arguments. Try the <b>-help</b> argument for a list of commands for the specified resources.<br>" +
        "<b>buy -server</b>: buy a server. More information with <b>buy -server -help</b>.<br>" +
        "<b>buy -hacker</b>: buy a hacker to automatically hack places. More information with <b>buy -hacker -help</b><br>" +
        "<b>buy -ability</b>: buy an ability to enhance your hacking power. More information with <b>buy -ability -help</b>",
        
    buyServer: "<b>buy -server -list</b>: show a list of available servers.<br>" +
        "<b>buy -server nameOfServer</b>: buy one quantity of the selected server.<br>" +
        "<b>buy -server -info</b>: show informations about your servers.",
    
    buyHacker: "<b>buy -hacker <i>nameOfHacker</i></b>: buy the specified hacker.<br>" +
        "<b>buy -hacker -list</b>: print a list of all hackers available.",
    
    buyAbility: "<b>buy -ability <i>nameOfAbility</i></b>: buy the specified ability.<br>" +
        "<b>buy -ability -list</b>: print a list of all abilities available.",
    
    buyUpgrade: "<b>buy -upgrade <i>nameOfServer</i></b>: upgrade the selected server.<br>" +
        "<b>buy -upgrade -info</b>: print informations on the upgrades.",
    
    achievements: "<b>achievements</b> must be used with arguments.<br>" +
        "<b>achievements -list</b>: print a list of all achievements.",
    
    hackers: "<b>team</b> must be used with arguments.<br>" +
        '<b>team -status</b>: print a list of all hired hackers.<br>' +
        '<b>team -pause nameOfHacker</b>: stop the selected hacker.<br>' +
        'You can buy hackers with the <b>buy</b> command. Look at <b>buy -hacker -help</b> command.',
    
    ability: '<b>ability</b> must be used with arguments.<br>' +
        '<b>ability -list</b>: print a list of all abilities available.<br>' +
        'You can buy abilities with the <b>buy</b> command. Look at <b>buy -ability -help</b> command.',
};