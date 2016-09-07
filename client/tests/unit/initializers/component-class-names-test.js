import Ember from 'ember';
import ComponentClassNamesInitializer from 'cards-against-humanity/initializers/component-class-names';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | component class names', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ComponentClassNamesInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
