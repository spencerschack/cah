import get from 'ember-metal/get';
import {computed} from 'ember-decorators/object';
import {alias} from 'ember-decorators/object/computed';

export function delegateTo(delegate) {
  return function(target, key, descriptor) {
    return alias(delegate + '.' + key)(target, key, descriptor);
  }
}
