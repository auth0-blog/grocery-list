# Grocery List App

A grocery list application built on Koa, LokiJS and Angular 2 running on Node.js.

## Global dependencies

This is an application heavily based on javascript, from the backend to the front-end, and as so [Node.js and NPM](https://docs.npmjs.com/getting-started/installing-node) are the main dependencies. Besides that we will also need [Typescript](https://github.com/Microsoft/TypeScript#installing) and [Webpack](https://webpack.github.io/docs/tutorials/getting-started/), both installed globally.

Oh, and be aware that [Koa](https://github.com/koajs/koa#installation) - next generation Node.js's web framework that we are using in this application - needs to run on Node.js v4+ (or v0.12  with --harmony-generators or --harmony flag, but please try to be up to date).

## Running application in development mode

First of all, we will have to clone this repo, as you may have been expecting. After cloning it, run a `npm install` to install all `dev` and `runtime` dependencies.

Having all the dependencies in place, there are two `npm scripts` that we need to run to setup a proper development environment:

1. `npm run dev` - this will create a `./dev/` folder with front-end and backend code.
2. `npm run livereload` - this will start [browsersync](https://browsersync.io/) and listen to changes on `./dev/client/` to hot reload your browser.

Soon I will create a single script that will trigger both scripts automatically, so keep in touch.