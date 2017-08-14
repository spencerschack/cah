import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {computed} from 'ember-decorators/object';
import {belongsTo, hasMany} from 'ember-decorators/data';

import {delegateTo} from '../utils/decorators';

export default class Membership extends Model {

  position = 0
  isGroupPanning = false

  @belongsTo({async: false}) game
  @belongsTo({async: false}) player
  @hasMany({async: false})   answerOrderings
  @hasMany({async: false})   submissions

  @delegateTo('player') isPlayer

  @computed('game.rounds.@each.winner')
  score(rounds) {
    return rounds.filterBy('winner', this).length;
  }

};
