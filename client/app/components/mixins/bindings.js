import Ember from 'ember';
import Mixin from 'ember-metal/mixin';
import computed, {map} from 'ember-computed';
import on from 'ember-evented/on';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

const bindingMatcher = /([\w\.]+)(?::(\w+))?(?:\(([^)]+)\))?/;

export default function Bindings(name,
  {separator, prefix, suffix = '', dasherize, htmlSafe}) {

  return Mixin.create({
    [`setup${name.capitalize()}Bindings`]: on('init', setupBindings)
  });

  function setupBindings() {
    const bindings = get(this, `${name}Bindings`).map(parseBinding);
    set(this, `${name}Bindings`, bindings);
    const keys = bindings.mapBy('key');
    Ember.mixin(this, {[name]: computed(...keys, buildBindings)});
  }

  function buildBindings() {
    const bindings = get(this, `${name}Bindings`);
    const result = bindings.map(({key, property, unit}) => {
      const value = get(this, key);
      if(value || value === 0)
        return property + prefix + value + unit + suffix;
    }).compact().join(separator);
    return htmlSafe ? result.htmlSafe() : result;
  }

  function parseBinding(binding) {
    let [, key, property = key, unit = ''] = binding.match(bindingMatcher);
    if(dasherize) property = property.dasherize();
    return {key, property, unit};
  }

};
