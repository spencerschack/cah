import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';
import {belongsTo, hasMany} from 'ember-data/relationships';
import {isPresent} from 'ember-utils';

export default Model.extend({

  score: attr('number'),

  game: belongsTo({inverse: 'memberships', async: false}),
  player: belongsTo({async: false}),
  answers: hasMany({async: false}),
  submissions: hasMany('answer', {async: false}),
  
  notifyWin: observer('score', function() {
    get(this, 'game').trigger('membershipWon', this);
  })
  
});
