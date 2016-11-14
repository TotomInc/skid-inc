game.notification = {
    notify: function(title, message) {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            var notification = new Notification(title, {
                // TODO: icon
                icon: '',
                body: message,
            });
        }
    }
};