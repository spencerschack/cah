import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({

  classNames: ['players-list'],

  // attrs
  memberships: null,

  orderedMemberships: computed.sort('memberships', 'ordering'),
    ordering: ['score:desc']

});
