var pkg = require('./package.json');
var packager = require('electron-packager');

packager({
    dir: './',
    name: pkg.name,
    appVersion: pkg.version,
    // all: true,
    platform: 'linux',
    arch: 'x64',

    icon: 'src/icon/logo.png',

    out: 'release',
    // asar: true,
    overwrite: true,
    ignore: [
      'coverage$',
      'test$',
      'release$',
      'src$',
    ]
  },
  function done_callback (err, appPaths) {
    if (err) {
      console.error(err);
    }
    console.log('package done ', appPaths);
  }
);
