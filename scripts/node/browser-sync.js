'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const bs = require('browser-sync').create('Extraclassy');
const path = require('path');

const rootDirectory = fs.realpathSync(process.cwd());
const packageJson = path.resolve(rootDirectory, 'package.json');
const paths = require(packageJson).paths;
const isInteractive = process.stdout.isTTY;

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = require(packageJson).name;

// Load proxy config
const proxy = require(packageJson).proxy;

// Launch Browsersync server.
bs.init({
  proxy,
  files: [
    path.resolve(rootDirectory, paths.themeRoot, 'dist/**/*.css'),
    path.resolve(rootDirectory, paths.themeRoot, 'dist/**/*.js')
  ]
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    bs.exit();
    process.exit();
  });
});
