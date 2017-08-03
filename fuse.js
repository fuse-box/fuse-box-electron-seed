const {
    FuseBox,
    SassPlugin,
    CSSPlugin,
    WebIndexPlugin,
    Sparky
} = require("fuse-box");

const {spawn} = require("child_process");

Sparky.task("default", () => {
    const fuse = new FuseBox({
        homeDir: "src",
        output: "dist/$name.js",
        plugins: [
            [SassPlugin(), CSSPlugin()],
            WebIndexPlugin({
                template: "src/index.html"
            }),
        ]
    });
    // development server for hot reload
    fuse.dev({port: 4445});

    // vendor = fuse.bundle("vendor").instructions("~ index.ts - fs - path")

    fuse.bundle("app")
        .target("electron")
        .watch()
        .hmr()
        .instructions("> [index.ts] + fuse-box-css"); // it's import to isolate like this []
    
    return fuse.run().then(() => {
        // launch the app
        spawn('node', [`${ __dirname }/node_modules/electron/cli.js`,  __dirname ]);
    });
});