import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import on from 'ember-evented/on';
import set from 'ember-metal/set';
import {belongsTo, hasMany} from 'ember-data/relationships';
import {isPresent} from 'ember-utils';

export default Model.extend({

  viewingPosition: attr('number'),

  question: belongsTo({async: false}),
  membership: belongsTo({async: false}),
  memberships: hasMany({async: false}),
  answers: hasMany({async: false}),

  player: computed.alias('membership.player'),
  players: computed.mapBy('memberships', 'player'),

  lastWinner: null,
  lastQuestion: null,
  nextLastQuestion: computed.init('question'),
  updateLastWinner: on('membershipWon', function(membership) {
    set(this, 'lastQuestion', get(this, 'nextLastQuestion'));
    set(this, 'nextLastQuestion', get(this, 'question'));
    set(this, 'lastWinner', membership);
  })
  
});
