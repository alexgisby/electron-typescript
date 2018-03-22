# Electron + Typescript + Babel + Webpack

The aim of this small example app is to demonstrate how to use [Typescript](https://typescriptlang.org) within an
[Electron](https://electronjs.org) application for the main process (or backend), the renderer process AND the [web
workers](https://electronjs.org/docs/tutorial/multithreading) that Electron uses for threading.

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Backend / Main Process](#backend-main-process)
- [Client / Renderer Process](#client-renderer-process)
- [Mistakes? Suggestions?](#mistakes-suggestions)

## Getting Started

```
$ git clone git@github.com:alexgisby/electron-typescript.git electron-typescript
$ cd electron-typescript
$ yarn
$ yarn start
```

This will compile all the Typescript and fire up the Electron app. You should see a beautiful window appear bidding
you welcome!

## Project Structure

The project follows the following structure:

- `app/`
    - Contains only the `index.html` but is the destination for all the compiled files.
    - `js/` will contain the client code
    - `backend/` will contain the compiled main thread code
    - `workers/` will contain the compiled workers code
- `src/`
    - Contains the Typescript source code, as well as the individual `tsconfig.json` files that make it possible
    - `backend/` contains the backend, or main process code
    - `client/` contains the frontend, or renderer process code
    - `workers/` contains the code to run in the web workers
- `tsconfig.json`: there is a top level tsconfig file that provides common configuration, and each of the src/ directories also has their own tsconfig that extends this one.

## Backend / Main Process

The backend is the simplest of the tsconfig files, and is written to mimic the
[First App](https://electronjs.org/docs/tutorial/first-app) tutorial that Electron provides.

You have full access to all of Typescript's features in here, go nuts!

You can build just the backend by running: `yarn build-backend`;

## Client / Renderer Process

This uses both Typescript and [Webpack](https://webpack.js.org/). Why both? Well you're almost certainly going to want
to combine and minify your client code, even in an Electron app to keep things as fast and easy as possible. You may
also be interested in sharing your client code with a website as well as an Electron app, so this example is set up to
not judge. [Babel](https://babeljs.io/) is also in there for good measure since it features heavily in most workflows!

You can use any of Typescript's features in here too, as well as anything that Babel or Webpack will handle.

You can build the client alone using `yarn build-client` and watch for changes using `yarn watch-client`.

## Workers

Probably the reason that you're here, since this took me a bit of figuring out too.

Workers can use Typescript, but they have some limitations:

- Every file should have `export { };` at the top of it. This is to keep Typescript in file-as-module scope, rather than
global scope.
- You cannot use ES6 modules. This is explained below, but everything needs to be `module.exports` and `require`.

The reason for the module restriction is mostly due to how Workers in Electron are, err, weird. They have access to [some]
Node modules, so can `require()` them, however they also need to run in the Browser, so can't use ES6 natively. This
results in needing to write a strange hybrid of the two (hopefully in Electron 2 we will be able to use ES6 modules natively
thanks to the Chromium version bump, but for now, we're stuck with this).

You can still use types, async/await and all the other good stuff Typescript gives you, just not the module system.

You can build the workers on their own using `yarn build-workers`.

## Mistakes? Suggestions?

Please raise an issue on the repo and I will try to help. I'm by no means a Typescript expert (yet) so please let me
know if there's something that could be improved or corrected!
