module.exports = { contents: "\"use strict\";\nexports.__esModule = true;\nvar fs = require(\"fs\");\nvar path = require(\"path\");\nrequire(\"./foo.scss\");\nrequire(\"./bar.scss\");\nvar myPackage = fs.readFileSync(path.resolve(\"./package.json\")).toString();\nvar test = document.querySelector(\"#test\");\ntest.innerHTML = myPackage;\n",
dependencies: ["fs","path","./foo.scss","./bar.scss"],
sourceMap: {},
headerContent: undefined,
mtime: 1492673117000
};