var floating = {
    addFloating: function(where, text) {
        var floatingText = document.createElement('div'),
            divWidth = $('#' + where).width() - 35,
            randWidth = game.randomInclusive(0, divWidth);
        
        $(floatingText).addClass('floating-text')
            .html(text)
            .css({
                'margin-top': '-62px',
                'margin-left': randWidth + 'px'
            })
            .animate({
                'opacity': 0,
                'margin-top': '-85px'
            }, 750, function() {
                $(this).remove();
            });
        
        $('#' + where).append(floatingText);
    }
};