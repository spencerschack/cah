import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({

  score: attr('number'),

  game: belongsTo({inverse: 'memberships', async: false}),
  player: belongsTo({async: false}),
  answers: hasMany({async: false})
  
});
