game.console.help = {
    hack: "<b>hack</b> can be used with arguments.<br>" + 
        "<b>hack -stats</b>: stats for the simple hack.<br>" +
        "<b>hack -place <i>nameOfPlace</i></b>: hack a place.<br> "+
        "<b>hack -place -list</b>: print a list of places with their respective informations.",

    config: "You must use <b>config</b> with arguments.<br>" +
        "<b>config -sounds <i>value</i></b>: enable (true) or disable (false) the sound of the game. (default to false)<br>" +
        "<b>config -background <i>value</i></b>: enable (true) or disable (false) the background animation. (default to false)",

    clear: "<b>clear</b> don't accept any arguments.",
    
    buy: "<b>buy</b> must be used with arguments.<br>" +
        "<b>buy -server</b>: buy a server. Get a list of server with <b>buy -server -help</b>.<br>" +
        "<b>buy -info</b>: print all your server status (reward, owned, next price, ...).<br>" +
        "<b>buy -hacker</b>: buy a hacker to automatically hack places.<br>" +
        "<b>buy -ability</b>: buy an ability to enhance your hacking power.",
        
    buyServer: "<b>buy -server personal</b>: low-cost server, slightly increase money hack income.<br>" + 
        "<b>buy -server professional</b>: better than low-cost servers, greatly increase money and experience hack income.<br>" + 
        "<b>buy -server vm</b>: virtual machines can reduce the time when hacking a place.<br>" +
        "<b>buy -server quickhack</b>: a quickhack server reduce by 1 the divided reward when clicking.",
    
    buyHacker: "<b>buy -hacker <i>nameOfHacker</i></b>: buy the specified hacker.<br>" +
        "<b>buy -hacker -list</b>: print a list of all hackers available.",
    
    buyAbility: "<b>buy -ability <i>nameOfAbility</i></b>: buy the specified ability.<br>" +
        "<b>buy -ability -list</b>: print a list of all abilities available.",
    
    achievements: "<b>achievements</b> must be used with arguments.<br>" +
        "<b>achievements -list</b>: print a list of all achievements.",
    
    hackers: "<b>hackers</b> must be used with arguments.<br>" +
        '<b>hackers -status</b>: print a list of all hackers available.<br>' +
        'You can buy hackers with the <b>buy</b> command. Look at <b>buy -hacker -help</b> command.',
    
    ability: '<b>ability</b> must be used with arguments.<br>' +
        '<b>ability -list</b>: print a list of all abilities available.<br>' +
        'To buy an ability, you must use the <b>buy</b> command. Type <b>buy -ability -help</b> for more informations.',
    
    upgrade: '<b>upgrade</b> must be used with arguments.<br>' +
        '<b>upgrade nameOfServer</b>: upgrade the specified server.<br>' +
        '<b>upgrade -info</b>: print stats of current and next servers upgrades.'
};