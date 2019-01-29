# Template for Gene Expression Atlas and Single Cell Expression Atlas NPM packages

## Instructions

***Be sure to be running npm@4.0.0 or later. At least Node.js 8 LTS is strongly recommended.***

### Clone this repository
```
git clone https://github.com/gxa/atlas-package my-package
cd my-package
rm -rf .git
git init
git remote add origin https://github.com/gxa/my-package.git
```
Remember to create the new repository. The recommendation is to prefix the package name with “atlas-”.

### Fill in package metadata
Fill in the fields `name`, `description` and `repository`. As a general rule the packages are prefixed with
“expression-atlas-” or “sc-atlas-”. Finally, replace or remove `README.md`.

## Scripts

### `prepack`
Runs the `build` script before `npm publish`. Only the `lib` directory is packaged, so make sure everything (including
assests such as CSS or images are there).

### `postversion`, `postpublish`
After bumping the version with e.g. `npm version minor`, the package is automatically published and pushed, with all
tags, so new versions can be published in a single step.

### `test`
`npm test` runs all phases of the test lifecycle (i.e. `pretest`, `test` and `posttest`); in case you’ve added support
for Coveralls you won’t likely want to run the `posttest` phase. If that’s the case just do `npx jest`.

## Testing
Basic test boilerplate is included with [Jest](https://facebook.github.io/jest/) and
[Enzyme](http://airbnb.io/enzyme/). Jest is a test runner, an assertion library and a snapshot tester, whereas Enzyme
allows DOM testing. See the examples included in `__test__` to get an idea.

### Continuous integration
If you want CI and nice passing/failing badges, enable the repository in [Travis CI](https://travis-ci.org/). Now, with each push, Travis CI will run your tests and generate a report. You can display a test status badge going to
Travis CI, clicking on the badge and pasting the Markdown embed snippet on your `README.md`.

Enabling code coverage is very similar. You need to enable your repository in [Coveralls](https://coveralls.io/).
Every time that Travis is run, it will generate coverage information and send it to Coveralls for a coverage report.
If you go to Coveralls, you can also get a snippet to embed the coverage report shield on your readme file.

## What’s included?
- [React 16 and PropTypes](https://facebook.github.io/react/)
- [URI.js](https://medialize.github.io/URI.js/) for URL manipulation (the rich version of `query-string`)
- [Babel](https://babeljs.io/) with presets `env` and `react` (see `.babelrc`)
- [Webpack 4 with Webpack-CLI and Webpack-Dev-Server](https://webpack.js.org/)
- [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/) for testing

## Polyfills
No polyfills are included by default, but you might want one or both of these:
- [Fetch polyfill](https://github.com/github/fetch)
- [Babel polyfill](https://babeljs.io/docs/usage/polyfill/)

### NPM
```
npm install --save-dev whatwg-fetch @babel/polyfill
```

Tweak your `webpack.config.js` to include them in your entry points:
```
entry: {
  myComponent: [`@babel/polyfill`, `whatwg-fetch`, `./html/render.js`]
  ...
}
```

## Run it on your browser
Use Webpack-Dev-Server:
```
npx webpack-dev-server -d
```
