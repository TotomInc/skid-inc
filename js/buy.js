skidinc.buy = {};
skidinc.buy.secondArgs = [];
skidinc.buy.thirdArgs = [];

skidinc.buy.categories = ['autoscript', 'script', 'server', 'battery'];
skidinc.buy.categoriesList = ['skidinc.autoscript.list', 'skidinc.script.listBuy', 'skidinc.server.list', 'skidinc.battery.list'];
skidinc.buy.categoriesDesc = [
    'buy autoscripts to automatize script execution.',
    'buy new, more powerful scripts.',
    'upgrade your servers to maximize your income.',
    'upgrade your battery level.'
];

skidinc.buy.help = function() {
    var str = '<y>BUY HELP</y> buy new scripts, auto-scripts and upgrade servers:<br>' +
        '<b>-</b> <b>buy</b> command require <b>1 argument</b> of type <b>string</b>.<br>' +
        '<b>-</b> first argument is the <b>category</b> of the thing you want to buy.<br>' +
        '<b>-</b> second argument is optional for some categories, it\'s the <b>name</b> of the specific thing you want to buy.<br>' +
        '<b>-</b> you can add an argument to buy multiple things at once (<b>-q</b> followed by a number or <b>"max"</b> keyword).<br>' +
        '<b>-</b> get a list of all the things you can buy with <b>buy -l/-list</b>.';
    
    return skidinc.console.print(str);
};

skidinc.buy.list = function() {
    var str = '<y>BUY LIST</y>:<br>';
    
    for (var i = 0; i < skidinc.buy.categories.length; i++) {
        var category = skidinc.buy.categories[i],
            categoryList = skidinc.buy.categoriesList[i],
            categoryDesc = skidinc.buy.categoriesDesc[i];
        
        str += '<b>-</b> <z>' + category + '</z>: ' + categoryDesc + '<br><p class="text-bullet">' + eval(categoryList)() + '</p>';
    };
    
    return skidinc.console.print(str);
};

skidinc.buy.execute = function(args) {
    var exists = false,
        c;

    for (var category in skidinc.buy.categories) {
        var i = category,
            category = skidinc.buy.categories[i];
        
        if (args[0] == category) {
            exists = true;
            c = category;
        };
    };
    
    if (!exists)
        return skidinc.console.print('<x>ERR</x> <b>' + args[0] + '</b> is not valid category.');
    
    if (exists) {
        var item = (typeof args[1] == 'undefined') ? undefined : args[1],
            amount = 1,
            qIndex;
        
        if (args.indexOf('-q') > -1) {
            qIndex = args.indexOf('-q');
            
            if (isNaN(args[qIndex + 1]) && args[qIndex + 1] !== 'max')
                return skidinc.console.print('<x>ERR</x> expected a number or \"max\" string after <b>-q</b> argument.');
            if (!isNaN(args[qIndex + 1]))
                amount = parseInt(args[qIndex + 1]);
            if (args[qIndex + 1] == 'max')
                amount = 'max';
        };
        
        switch(c) {
            case 'autoscript':
                skidinc.autoscript.buy(item);
                break;
            
            case 'script':
                skidinc.script.buy(item);
                break;
            
            case 'server':
                skidinc.server.buy(item, amount);
                break;
            
            case 'battery':
                skidinc.battery.buy();
                break;
        };
    };
};

skidinc.buy.init = function() {
    skidinc.buy.categories.forEach(function(i) {
        skidinc.buy.secondArgs.push(i);
    });
    
    skidinc.script.scripts.forEach(function(i) {
        skidinc.buy.thirdArgs.push(i.id);
    });
    
    skidinc.server.servers.forEach(function(i) {
        skidinc.buy.thirdArgs.push(i);
    });
};