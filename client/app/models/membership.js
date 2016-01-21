import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({

  score: attr('number'),

  game: belongsTo({inverse: 'memberships', async: false}),
  player: belongsTo({async: false}),
  firstAnswer: belongsTo('answer', {async: false}),
  secondAnswer: belongsTo('answer', {async: false}),
  thirdAnswer: belongsTo('answer', {async: false})
  
});
