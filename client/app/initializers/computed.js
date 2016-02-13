import WeakMap from 'ember-weakmap/weak-map';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import EmberCPM from 'ember-cpm';

function binaryProp(fn) {
  return (key1, key2) => computed(key1, key2, function() {
    return fn(get(this, key1), get(this, key2));
  });
}

function collectionProp(fn) {
  return function(collection, property, valueKey) {
    const collectionKey = `${collection}.@each.${property}`;
    return computed(collectionKey, valueKey, function() {
      return fn(get(this, collection), property, get(this, valueKey));
    });
  }
}

export function initialize() {
  EmberCPM.install();
  computed.gtProp = binaryProp((a, b) => a > b);
  computed.equalProp = binaryProp((a, b) => a === b);
  computed.findByProp = collectionProp((c, p, v) => c.findBy(p, v));
  computed.filterByProp = collectionProp((c, p, v) => c.filterBy(p, v));
  computed.init = key => computed(function() { return get(this, key); });
  computed.last = function(condition, dependentKey) {
    const lastValues = new WeakMap();
    return computed(dependentKey, function() {
      const value = get(this, dependentKey);
      if(condition(value))
        return lastValues.set(this, value);
      return lastValues.get(this);
    });
  };
  computed.previous = function(dependentKey) {
    const previousValues = new WeakMap();
    return computed(dependentKey, function() {
      const last = previousValues.get(this);
      previousValues.set(this, get(this, dependentKey));
      return last;
    });
  };
  computed.ifProp = function(condition, truthy, falsy) {
    return computed(condition, truthy, falsy, function() {
      return get(this, condition) ? get(this, truthy) : get(this, falsy);
    });
  };
}

export default {
  name: 'install-ember-cpm',
  initialize
};
