/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    },
    babel: {
      stage: 0
    }
  });

  app.import({
    development: 'bower_components/seedrandom/seedrandom.js',
    production: 'bower_components/seedrandom/seedrandom.min.js'
  });

  app.import({
    development: 'bower_components/hammerjs/hammer.js',
    production: 'bower_components/hammerjs/hammer.min.js'
  });

  return app.toTree();
};
