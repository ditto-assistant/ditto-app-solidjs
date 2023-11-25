# SolidStart + AuthJS

Everything you need to build an [AuthJS](https://authjs.dev/) authenticated Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Install dependencies
[Install Bun](https://bun.sh/docs/installation) if you haven't already.

```bash
bun i
```

## Run the development server

```bash
bun dev
```

Or, start the server and open the app in a new browser tab
```bash
bun run dev -- --open
```

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `bun run build` will generate a Node app that you can run with `bun start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.
