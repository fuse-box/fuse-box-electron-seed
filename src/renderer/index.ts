import * as fs from "fs";
import * as path from "path";
import "./foo.scss";
import "./bar.scss";

const test = document.querySelector("#test");

const versions: any = process.versions;
test.innerHTML = `
node: ${versions.node}
chrome: ${versions.chrome}
electron: ${versions.electron}

`;
test.innerHTML += 'loading file content from: ' +
  path.resolve(__dirname, "./package.json") +
  '\n';

const { remote } = require('electron');
const appDir = remote.app.getAppPath();

const myPackage = fs.readFileSync(appDir + '/package.json').toString();
test.innerHTML += myPackage;
