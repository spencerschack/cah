import Model from 'ember-data/model';
import computed from 'ember-computed';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({

  question: belongsTo({async: false}),
  membership: belongsTo({async: false}),
  memberships: hasMany({async: false}),
  answers: hasMany({async: false}),

  player: computed.alias('membership.player'),
  players: computed.mapBy('memberships', 'player')
  
});
