/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    },
    emberCliFontAwesome: {
      useScss: true
    },
    babel: {
      optional: ['es7.decorators']
    }
  });

  app.import('vendor/actioncable.js');

  return app.toTree();
};
