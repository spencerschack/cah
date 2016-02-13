import Ember from 'ember';

export function wrapUnderscores([text], attrs) {
  return (text || '').replace(/_/g, function() {
    return `<span class="${attrs.class}">_</span>`;
  });
}

export default Ember.Helper.helper(wrapUnderscores);
