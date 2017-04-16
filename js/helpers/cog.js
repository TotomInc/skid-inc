var cog = {};
cog.el = '#cog-btn';
cog.triggered = false;

cog.init = function() {
    $(cog.el).on('click', function() {
        $(this).toggleClass('show');
        cog.triggered = !cog.triggered;
    });
};

$(document).ready(function() {
    cog.init();
});