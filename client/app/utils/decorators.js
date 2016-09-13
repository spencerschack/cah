import get from 'ember-metal/get';
import computed, {alias} from 'ember-computed-decorators';

export function delegateTo(delegate) {
  return function(target, key, descriptor) {
    return alias(delegate + '.' + key)(target, key, descriptor);
  }
}
