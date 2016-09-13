import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import computed from 'ember-computed-decorators';
import {delegateTo} from '../utils/decorators';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({

  position: 0,
  isGroupPanning: false,

  game: belongsTo({async: false}),
  player: belongsTo({async: false}),
  answerOrderings: hasMany({async: false}),
  submissions: hasMany({async: false}),

  @delegateTo('player') isPlayer,

  @computed('game.rounds.@each.winner')
  score(rounds) {
    return rounds.filterBy('winner', this).length;
  }

});
