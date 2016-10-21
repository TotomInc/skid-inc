game.kongregate = {
    init: function() {
        kongregateAPI.loadAPI(function() {
            game.kongregate.api = kongregateAPI.getAPI();
        });
    }
};