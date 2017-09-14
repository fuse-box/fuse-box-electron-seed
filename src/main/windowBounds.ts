const settings = require('electron-settings');

let ti;
let win;

export function init (mainWin) {
    win = mainWin

    win.on('resize', saveWindowBounds);
    win.on('move', saveWindowBounds);
}

export function get () {
    return settings.get('window') || {
        width: 800,
        height: 600
    };
}

function saveWindowBounds () {
    clearTimeout(ti);
    ti = setTimeout(() => {
        console.log('saving', win.getBounds());
        settings.set('window', win.getBounds());
    }, 1000);
}
