game.kongregate = {
    adAvailable: false,
    onAd: false,
    adsCompleted: 0,
    bonusTime: 0,
    bonusMult: 3,
    
    getBonusMult: function() {
        if (game.kongregate.bonusTime > 0)
            return game.kongregate.bonusMult;
        else
            return 1;
    },
    
    init: function() {
        if (kongregateAPI)
            kongregateAPI.loadAPI(onComplete);
        
        function onComplete() {
            var api = kongregateAPI.getAPI();
            
            game.kongregate.isGuest = api.services.isGuest();
            
            api.mtx.addEventListener("adsAvailable", function() {
                game.kongregate.adAvailable = true;
            });
            
            api.mtx.addEventListener("adsUnavailable", function() {
                game.kongregate.adAvailable = false;
            });
            
            api.mtx.addEventListener("adOpened", function() {
                game.kongregate.onAd = true;
            });
            
            api.mtx.addEventListener("adCompleted", function() {
                game.kongregate.adsCompleted++;
                game.kongregate.onAd = false;
                game.kongregate.bonusTime += 2.16E7;
                game.console.print('Thanks for watching the ad, this support me to develop this game. Here are 6h of the bonus ads multiplier.');
            });
            
            api.mtx.addEventListener("adAbandoned", function() {
                game.kongregate.onAd = false;
                game.console.print('You closed the ad before it ended, you are not rewarded of your bonus.');
            });
            
            api.mtx.initializeIncentivizedAds();
            
            if (!game.kongregate.isGuest) {
                game.kongregate.userId = api.services.getUserId();
                game.kongregate.username = api.services.getUsername();
                game.kongregate.token = api.services.getGameAuthToken();
            };
        };
    },
    
    submitScore: function() {
        // var api = kongregateAPI.getAPI(),
        //     money = game.player.money,
        //     level = game.player.level;
        
        // api.stats.submit('Level', level);
        // api.stats.submit('Money', money);
    },
    
    getAllMtx: function() {
        if (typeof game.kongregate.isGuest !== 'boolean') {
            console.error('Not on Kongregate.');
            return;
        };
        
        var api = kongregateAPI.getAPI(),
            result = api.mtx.requestItemList(undefined, onItemList),
            items = [];
        
        function onItemList(result) {
            if (result.success) {
                for (var i = 0; i < result.data.length; i++) {
                    var item = result.data[i];
                    items.push(item);
                };
                
                return items;
            };
        };
    },
    
    buyMtx: function(what) {
        if (typeof game.kongregate.isGuest !== 'boolean') {
            game.console.print('This feature is only available for Kongregate.', 'error');
            return;
        };
        
        var api = kongregateAPI.getAPI();
        
        api.mtx.purchaseItems([what], onPurchaseResult);
        
        function onPurchaseResult(result) {
            if (!result.success) {
                game.console.print('Purchase failed, if you think this is an error, report this as a Powerup Reward bug.', 'error');
                return;
            };
            
            switch(what) {
                case 'black_theme':
                    game.console.themesUnlocked[1] = true;
                    game.console.print('To enable your theme, write <b>option theme black</b>.');
                    break;
            };
            
            game.console.print('Thanks for your purchase, it help me to maintain the game and introduce new features.');
        };
    },
    
    watch: function() {
        if (typeof game.kongregate.isGuest !== 'boolean')
            game.console.print('You need to play on Kongregate to enable this functionnality.', 'error');
        else {
            var api = kongregateAPI.getAPI();
            
            if (!game.kongregate.adAvailable)
                game.console.print('Sorry, there is no ad currently, try again later.', 'error');
            else
                api.mtx.showIncentivizedAd();
        };
    },
    
    bonusTimeLoop: function(times) {
        if (game.kongregate.bonusTime > 0)
            game.kongregate.bonusTime -= (times / game.fps) * 1000;
        else if (game.kongregate <= 0)
            game.kongregate.bonusTime = 0;
    }
};