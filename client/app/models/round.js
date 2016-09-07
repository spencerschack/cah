import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany} from 'ember-data/relationships';
import computed, {mapBy} from 'ember-computed-decorators';

export default Model.extend({

  question: attr('string'),
  pick: attr('number'),

  game:     belongsTo({async: false}),
  czar:     belongsTo('membership', {async: false}),
  winner:   belongsTo('membership', {async: false}),
  submissions: hasMany({async: false}),

  @mapBy('submissions', 'answer') answers,

  @computed('submitters.@each.submitter')
  submitters(submitters) {
    return submitters.mapBy('submitter').uniq();
  },

  @computed('submitters.length', 'game.memberships.length')
  allSubmitted(submittersLength, membershipsLength) {
    return submittersLength === membershipsLength - 1;
  }

});
