game.options.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
game.options.isFirefox = typeof InstallTrigger !== 'undefined';
game.options.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
game.options.isIE = /*@cc_on!@*/false || !!document.documentMode;
game.options.isEdge = !game.options.isIE && !!window.StyleMedia;
game.options.isChrome = !!window.chrome && !!window.chrome.webstore;
game.options.isBlink = (game.options.isChrome || game.options.isOpera) && !!window.CSS;

if (navigator.appVersion.indexOf("Win")!=-1) game.options.whatOS="win";
if (navigator.appVersion.indexOf("Mac")!=-1) game.options.whatOS="mac";
if (navigator.appVersion.indexOf("X11")!=-1) game.options.whatOS="unix";
if (navigator.appVersion.indexOf("Linux")!=-1) game.options.whatOS="linux";

if (game.options.isIE || game.options.isEdge)
    alert('Skid-Inc is not fully supported on Internet Explorer and Edge. We recommend you to play with Chrome or Firefox.');