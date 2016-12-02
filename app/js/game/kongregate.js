game.kongregate = {
    adAvailable: false,
    onAd: false,
    adsCompleted: 0,
    bonusTime: 0,
    bonusMult: 3,
    boughtMults: 0,
    
    getMult: function() {
        return game.kongregate.bonusMult + game.kongregate.boughtMults;
    },
    
    getBonusMult: function() {
        if (game.kongregate.bonusTime > 0)
            return game.kongregate.bonusMult + game.kongregate.boughtMults;
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
                
                console.info('Ad available.');
            });
            
            api.mtx.addEventListener("adsUnavailable", function() {
                game.kongregate.adAvailable = false;
                
                console.info('Ad unavailable.')
            });
            
            api.mtx.addEventListener("adOpened", function() {
                game.kongregate.onAd = true;
            });
            
            api.mtx.addEventListener("adCompleted", function() {
                game.kongregate.adsCompleted++;
                game.kongregate.onAd = false;
                game.kongregate.bonusTime += 2.16E7;
                game.console.print('Thanks, you help the developer when watching ads.');
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
            game.console.print('This feature is only available for Kongregate players.', 'error');
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
                case 'ad_mult':
                    game.kongregate.boughtMults++;
                    game.console.print('Your ads multiplier is now of <b>x' + game.kongregate.getMult() + '</b>.');
                    break;
                
                case 'ad_mult_x5':
                    game.kongregate.boughtMults += 5;
                    game.console.print('Your ads multiplier is now of <b>x' + game.kongregate.getMult() + '</b>.');
                    break;
                
                case 'black_theme':
                    game.console.black = true;
                    game.console.print('To enable your theme, write <b>option theme black</b>.');
                    break;
                
                case 'monokai_theme':
                    game.console.monokai = true;
                    game.console.print('To enable your theme, write <b>option theme monokai</b>.');
                    break;
                
                case 'afterglow_theme':
                    game.console.afterglow = true;
                    game.console.print('To enable your theme, write <b>option theme afterglow</b>.');
                    break;
                
                case 'fluoro_theme':
                    game.console.fluoro = true;
                    game.console.print('To enable your theme, write <b>option theme fluoro</b>.');
                    break;
            };
        };
    },
    
    watch: function() {
        if (typeof game.kongregate.isGuest !== 'boolean')
            game.console.print('You need to play on Kongregate to enable this functionnality.', 'error');
        else {
            var api = kongregateAPI.getAPI();
            
            if (!game.kongregate.adAvailable)
                game.console.print('Sorry, no ads available, try again later.', 'error');
            else
                api.mtx.showIncentivizedAd();
        };
    },
    
    bonusTimeLoop: function(times) {
        if (game.kongregate.bonusTime > 0)
            game.kongregate.bonusTime -= (times / game.fps) * 1000;
        else if (game.kongregate.bonusTime <= 0)
            game.kongregate.bonusTime = 0;
    }
};