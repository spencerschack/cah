import Ember from 'ember';

export function map([arr], {by}) {
  return arr.mapBy(by);
}

export default Ember.Helper.helper(map);
