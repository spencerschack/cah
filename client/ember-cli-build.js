/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    },
    babel: {
      plugins: [
        'transform-export-extensions',
        'transform-decorators-legacy',
        'transform-function-bind',
        'transform-class-properties'
      ]
    }
  });

  return app.toTree();
};
