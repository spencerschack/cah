import { moduleForModel, test } from 'ember-qunit';

moduleForModel('membership', 'Unit | Model | membership', {
  // Specify the other units that are required for this test.
  needs: ['model:game', 'model:player']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
