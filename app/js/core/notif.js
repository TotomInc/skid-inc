game.notif = {
    requestPermission: function() {
        if (window.Notification && Notification.permission !== "granted") {
            Notification.requestPermission(function(status) {
                if (Notification.permission !== status)
                    Notification.permission = status;
            });
        };
    },
    
    showNotif: function(title, content, iconAccess) {
        if (window.Notification && Notification.permission === "granted" && !game.options.gotFocus) {
            var notif = new Notification(title, {
                body: content,
                icon: iconAccess
            });

            notif.onclick = function() {
                window.focus();
                this.close();
            };

            setTimeout(notif.close(), 10000);
        };
    }
};