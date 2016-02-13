import Ember from 'ember';
import InstallEmberCpmInitializer from '../../../initializers/install-ember-cpm';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | install ember cpm', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  InstallEmberCpmInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
