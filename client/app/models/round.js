import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany} from 'ember-data/relationships';
import computed, {mapBy} from 'ember-computed-decorators';
import {delegateTo} from '../utils/decorators';

export default Model.extend({

  isGroupPanning: false,
  isWinnerPanning: false,
  acknowledgeProgress: 0,

  @delegateTo('question') pick: null,

  question: belongsTo({async: false}),
  game:     belongsTo({async: false, inverse: 'rounds'}),
  czar:     belongsTo('membership', {async: false}),
  winner:   belongsTo('membership', {async: false}),
  submissions: hasMany({async: false}),

  @mapBy('submissions', 'answerOrdering') answerOrderings: null,

  @computed('game.memberships.[]', 'czar')
  submitters(memberships, czar) {
    return memberships.without(czar);
  },

  @computed('game.memberships.length', 'submissions.length', 'pick')
  isSubmitted(memberships, submissions, pick) {
    return submissions === (memberships - 1) * pick;
  }

});
