import * as fs from "fs";
import * as path from "path";
import "./foo.scss";
import "./bar.scss";

const test = document.querySelector("#test")

test.innerHTML = 'loading file content from: ' + path.resolve(__dirname, "./package.json") + '\n';

const versions = `
node: ${process.versions.node}
chrome: ${process.versions.chrome}
electron: ${process.versions.electron}
`

test.innerHTML = versions + '\n';

const myPackage = fs.readFileSync(path.resolve(__dirname, './package.json')).toString();
test.innerHTML += myPackage;



