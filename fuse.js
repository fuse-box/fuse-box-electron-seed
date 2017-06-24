const {
    FuseBox,
    SassPlugin,
    CSSPlugin,
    Sparky
} = require("fuse-box");

const {spawn} = require("child_process");


Sparky.task("copy-html", () => {
    return Sparky.src("src/index.html").dest("dist/$name");
});

Sparky.task("default", ["copy-html"], () => {
    const fuse = FuseBox.init({
        homeDir: "src",
        output: "dist/$name.js"
    });
    // development server for hot reload
    fuse.dev({port: 4445, httpServer: false});

    fuse.bundle("electron")
        .target("electron")
        .watch()
        .instructions(" > [electron.ts]"); // it's import to isolate like this []

    fuse.bundle("app")
        .target("electron")
        .plugin(SassPlugin(), CSSPlugin({group: "bundle.css"}))
        .watch()
        .hmr()
        .instructions(" > [index.ts]"); // it's import to isolate like this []
    return fuse.run().then(() => {
        // launch the app
        spawn('node', [`${ __dirname }/node_modules/electron/cli.js`,  __dirname ]);
    });
});