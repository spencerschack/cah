import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import computed from 'ember-computed-decorators';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({

  score: attr('number'),

  game: belongsTo({async: false}),
  player: belongsTo({async: false}),
  answerOrderings: hasMany({async: false}),
  submissions: hasMany({async: false}),

  @computed('game.currentRound.czar')
  isCzar(czar) {
    return this === czar;
  }

});
