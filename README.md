# fuse-box-electron-seed

This version works with `FuseBox 4.0.0` `Electron 4.0.4`

What's inside:

* FuseBox respects electron environment without shimming
* Typescript in renderer and main process
* HMR for renderer without pain
* Livereload of main process
* Sass (grouping into 1 file)
* Base build process with electron-builder
* Auto saving app boundaries (x, y width, height) with electron-settings


## Usage

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

### Package app with electron-packager
tested on MacOS, linux Ubuntu, Windows 7
```
npm run package
```

### Package and publish to github app with electron-packager

```
export GH_TOKEN=YOUR_TOKEN && npm run pack-and-publish
```
more info: [here](https://www.electron.build/publishing-artifacts)

## TODO

* add some UI framework/s
* add test examples
