import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-show/answers-hand', 'Integration | Component | game show/answers hand', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{game-show/answers-hand}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#game-show/answers-hand}}
      template block text
    {{/game-show/answers-hand}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
