import Ember from 'ember';
import get from 'ember-metal/get';
import {defineProperty} from 'ember-platform';
import {map, on, observes} from 'ember-computed-decorators';
import computed from 'ember-computed';

const bindingMatcher = /([\w\.]+)(?::(\w+))?(?:\(([^)]+)\))?/;

function parseBinding(binding) {
  let [, key, property = key, unit = ''] = binding.match(bindingMatcher);
  return {key, property, unit};
}

export default Ember.Object.extend({

  zIndex: 'auto',
  opacity: 1,
  transformBindings: [],

  @map('transformBindings', parseBinding) transformNames,

  @on('init')
  setTransformBindings() {
    const keys = get(this, 'transformNames').mapBy('key');
    Ember.mixin(this, {transform: computed(...keys, this.buildTransform)});
  },

  buildTransform() {
    return get(this, 'transformNames').map(({key, property, unit}) => {
      return `${property}(${get(this, key)}${unit})`;
    }).join(' ');
  },

  @on('card.willDestroyElement')
  @observes('card.transformer')
  teardown() {
    this.destroy();
  }

});
