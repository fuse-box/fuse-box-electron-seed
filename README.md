# fuse-box-electron-seed

This version works with `FuseBox 2.2.31` `Electron 1.7.5`

What's inside:

* FuseBox respects electron environment without shimming
* Typescript in renderer and main process
* HMR for renderer without pain
* Livereload of main process
* Sass (grouping into 1 file)
* Base build process with electron-builder
* Auto saving app boudries (x, y width, height) with electron-settings


## Ussage

### Run development version

```
npm install
npm start
```

### Build production version of renderer and main process
build with QuantumPlugin

```
npm run dist
```

### Build and show production version

```
npm run prod
```


## TODO

* add some UI framework
* add test examples
