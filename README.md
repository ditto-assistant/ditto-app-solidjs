# SolidStart + AuthJS

Everything you need to build an [AuthJS](https://authjs.dev/) authenticated Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Install dependencies
[Install Bun](https://bun.sh/docs/installation) if you haven't already.
[Install Just](https://github.com/casey/just#installation)
The Justfile commands will check and install JS dependencies for you.

## Run the development server

```bash
just
```
`just dev` also works.

Or, start the server and open the app in a new browser tab
```bash
just dev-open
```

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `just build` will generate a Node app that you can run with `just start`. 

To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.
