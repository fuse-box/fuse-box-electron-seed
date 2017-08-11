import * as fs from "fs";
import * as path from "path";
import "./foo.scss";
import "./bar.scss";



const myPackage = fs.readFileSync(path.resolve("./package.json")).toString();
const versions = `
node: ${process.versions.node}
chrome: ${process.versions.chrome}
electron: ${process.versions.electron}
`

const test = document.querySelector("#test")
test.innerHTML = myPackage + versions;


