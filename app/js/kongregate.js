skidinc.kongregate = {};

skidinc.kongregate.init = function() {
    if (window.location.search.indexOf('kongregate') > -1) {
        kongregateAPI.loadAPI(function() {
            window.kongregate = kongregateAPI.getAPI();
            
            skidinc.kongregate.isGuest = kongregate.services.isGuest();
            
            if (skidinc.kongregate.isGuest) {
                kongregate.services.addEventListener("login", skidinc.kongregate.userLogin);
                
                $('#modal-themes4kong, #modal-themes4logged').hide();
                $('#modal-themes4guests').show();
            }
            else
                skidinc.kongregate.userLogin();
            
            setTimeout(function() {
                skidinc.kongregate.initAds();
            }, 5000);
        });
    };
    
    if (typeof skidinc.kongregate.isGuest == 'undefined' && window.location.search.indexOf('kongregate') == -1)  {
        $('#modal-themes4guests, #modal-themes4logged').hide();
        $('#modal-themes4kong').show();
    };
};

skidinc.kongregate.watchAd = function() {
    if (typeof skidinc.kongregate.isGuest == 'undefined' && window.location.search.indexOf('kongregate') == -1)
        return skidinc.console.print('<x>ERR</x> this feature is only available for Kongregate players.');
    
    kongregate.mtx.showIncentivizedAd();
};

skidinc.kongregate.initAds = function() {
    kongregate.mtx.initializeIncentivizedAds();
    
    kongregate.mtx.addEventListener("adsAvailable", function() {
        console.warn('ads available');
    });
    
    kongregate.mtx.addEventListener("adsUnavailable", function() {
        return skidinc.console.print('<x>ERR</x> no ads available, make sure your adblocker is disabled or try again later.');
    });
    
    kongregate.mtx.addEventListener("adOpened", function() {
        console.warn('ad opened');
    });
    
    kongregate.mtx.addEventListener("adCompleted", function() {
        console.warn('ad completed');
    });
    
    kongregate.mtx.addEventListener("adAbandoned", function() {
        return skidinc.console.print('<w>WARN</w> you closed the ad before it end, you are not awarded of your boost.');
    });
};

skidinc.kongregate.userLogin = function() {
    skidinc.kongregate.username = kongregate.services.getUsername();
    skidinc.kongregate.userID = kongregate.services.getUserId();
    
    $('#modal-themes4kong, #modal-themes4guests').hide();
    $('#modal-themes4logged').show();

    for (var z = 0; z < skidinc.options.themesUnlocked.length; z++) {
        $("#theme-" + z).click(function() {
            var id = $(this).attr('id'),
                num = parseInt(id.substring(id.indexOf('-') + 1, id.length));
            
            skidinc.kongregate.buyTheme(num);
        });
    };
    
    skidinc.kongregate.requestItemInventory();
};

skidinc.kongregate.requestItemInventory = function() {
    kongregate.mtx.requestUserItemList(null, onUserItems);
    
    function onUserItems(res) {
        if (!res.success)
            return skidinc.console.print('<x>ERR</x> there was an error when requesting the player item inventory. Please report this as a bug, thanks.');
        
        for (var i = 0; i < res.data.length; i++) {
            var item = res.data[i];
            
            console.log((i + 1) + ': ' + item.identifier + ', ' + item.id);
            
            switch(item.identifier) {
                case 'stardust_theme':
                    skidinc.options.themesUnlocked[1] = true;
                    break;
                
                case 'matrix_theme':
                    skidinc.options.themesUnlocked[2] = true;
                    break;
            };
        };
    };
};

skidinc.kongregate.buyTheme = function(i) {
    if (skidinc.kongregate.isGuest)
        return skidinc.console.print('<x>ERR</x> guests can\'t purchase things, you need to login to Kongregate.');
    
    switch(i) {
        case 1:
            kongregate.mtx.purchaseItems(['stardust_theme'], onPurchaseDone);
            break;
        
        case 2:
            kongregate.mtx.purchaseItems(['matrix_theme'], onPurchaseDone);
            break;
    };
    
    function onPurchaseDone(res) {
        if (!res.success)
            return skidinc.console.print('<x>ERR</x> there was an error during the payment process. Please report this as a Powerup Reward bug, thanks.');
        
        switch(i) {
            case 1:
                skidinc.options.themesUnlocked[1] = true;
                skidinc.console.print('<y>PURCHASE DONE</y> to enable your new theme, type <b>option theme stardust</b>.');
                break;
            
            case 2:
                skidinc.options.themesUnlocked[2] = true;
                skidinc.console.print('<y>PURCHASE DONE</y> to enable your new theme, type <b>option theme matrix</b>.');
                break;
        };
        
        skidinc.kongregate.requestItemInventory();
    };
};

skidinc.kongregate.domInit = function() {
    $('#cog-watchad').on('click', function() {
        skidinc.kongregate.watchAd();
    });
};