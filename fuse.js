const {
    FuseBox,
    SassPlugin,
    CSSPlugin,
    WebIndexPlugin,
    Sparky,
    UglifyJSPlugin,
    QuantumPlugin,
    EnvPlugin
} = require("fuse-box");

const express = require("express");
const path = require("path");
const {spawn} = require("child_process");

let producer;
let production = false;

Sparky.task("build", () => {
    const fuse = FuseBox.init({
        homeDir: "src",
        output: "dist/static/$name.js",
        hash: production,
        target: "electron",
        experimentalFeatures: true,
        cache: !production,
        plugins: [
            EnvPlugin({ NODE_ENV: production ? "production" : "development" }),
            [SassPlugin(), CSSPlugin()],
            WebIndexPlugin({
                title: "FuseBox electron demo",
                template: "src/index.html",
                path: production ? "." : "/static/"
            }),
            production && QuantumPlugin({
                bakeApiIntoBundle : 'dist',
                target : 'electron',
                treeshake: true,
                removeExportsInterop: false,
                uglify: true
            })
        ]
    });

    if (!production) {
        // Configure development server
        fuse.dev({ root: false }, server => {
            const dist = path.join(__dirname, "dist");
            const app = server.httpServer.app;
            app.use("/static/", express.static(path.join(dist, 'static')));
            app.get("*", function(req, res) {
                res.sendFile(path.join(dist, "static/index.html"));
            });
        })
    }

    const app = fuse.bundle("dist")
        .instructions('> [index.ts] + fuse-box-css')

    if (!production) { 
        app.hmr().watch()

        return fuse.run().then(() => {
            // launch electron the app
            spawn('node', [`${ __dirname }/node_modules/electron/cli.js`,  __dirname ]);
        });
    }

    return fuse.run()
});

// main task
Sparky.task("default", ["clean", "build"], () => {});

// wipe it all
Sparky.task("clean", () => Sparky.src("dist/*").clean("dist/"));
// wipe it all from .fusebox - cache dir
Sparky.task("clean-cache", () => Sparky.src(".fusebox/*").clean(".fusebox/"));

// prod build
Sparky.task("set-production-env", () => production = true);
Sparky.task("dist", ["clean", "clean-cache", "set-production-env", "build"], () => {})
