import Ember from 'ember';

export function join([arr], {with: separator}) {
  return arr.join(separator);
}

export default Ember.Helper.helper(join);
