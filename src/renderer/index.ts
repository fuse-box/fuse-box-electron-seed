import * as fs from "fs";
import * as path from "path";
import "./foo.scss";
import "./bar.scss";

const test = document.querySelector("#test")


const versions = `
node: ${process.versions.node}
chrome: ${process.versions.chrome}
electron: ${process.versions.electron}
`

test.innerHTML = versions + '\n';
test.innerHTML += 'loading file content from: ' + path.resolve(__dirname, "./package.json") + '\n';

const {ipcRenderer, remote} = require('electron');
ipcRenderer.on('message', function(event, text) {
  var container = document.getElementById('messages');
  var message = document.createElement('div');
  message.innerHTML = text;
  container.appendChild(message);
})

const app = remote.app;
const appDir = app.getAppPath();

const myPackage = fs.readFileSync(appDir + '/package.json').toString();
test.innerHTML += myPackage;



