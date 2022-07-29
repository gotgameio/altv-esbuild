# altv-esbuild

A plugin that greatly simplifies server/client JS and TS development (as well as production) on the [alt:V](https://altv.mp) platform.

(extended and improved version of the previous [esbuild dev plugin](https://github.com/xxshady/esbuild-plugin-altv-dev-server))

## Features

- Hot reload without server restart or client reconnect (using alt:V [resource restart](https://docs.altv.mp/articles/commandlineargs.html#server-commands))
- Full client and server support
- Restart console command for client and server ("res" by default)
- Improved top-level exception output during development

## Docs

Docs web page: <https://xxshady.github.io/altv-esbuild>

## How to use?
Example resource can be found [here](https://github.com/xxshady/altv-esbuild/tree/main/example)

### Install from npm

```cli
npm i altv-esbuild
```

### Add to your build code of the server and client

Example of the build server code:

```js
import esbuild from "esbuild"
import { altvEsbuild } from "altv-esbuild"

esbuild.build({
  entryPoints: ["src/main.js"],
  outfile: "dist/bundle.js",
  bundle: true,
  watch: dev,
  plugins: [
    altvEsbuild({
      mode: "server", // use "server" for server code, and "client" for client code

      dev: true, // see docs for more info
    }),
  ],
  
  external: [
    // none of the following is required, the plugin handles all alt:V modules automatically
    // "alt-server",
    // "alt-client",
    // "alt-shared",
    // "natives"
  ]
})
```
