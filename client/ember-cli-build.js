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
        'transform-decorators-legacy',
        'transform-export-extensions',
        'transform-function-bind'
      ]
    }
  });

  return app.toTree();
};
