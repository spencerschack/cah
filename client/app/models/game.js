import Model from 'ember-data/model';
import {computed} from 'ember-decorators/object';
import {alias, mapBy} from 'ember-decorators/object/computed';
import {attr, belongsTo, hasMany} from 'ember-decorators/data';
import {service} from 'ember-decorators/service';

export default class Game extends Model {

  @service session

  @attr('number') viewingPosition
  @attr('date')   createdAt

  @hasMany({async: false}) answerOrderings
  @hasMany({async: false}) memberships
  @hasMany({async: false}) rounds
  @belongsTo('round', {async: false}) currentRound

  @alias('session.player') player
  @mapBy('memberships', 'player') players

  @computed('memberships.@each.player', 'player')
  playerMembership(memberships, player) {
    return memberships.findBy('player', player);
  }

  @computed('players.[]', 'player')
  hasPlayer(players, player) {
    return players.includes(player);
  }

  @computed('memberships.@each.player', 'player')
  opponents(memberships, player) {
    return memberships.rejectBy('player', player);
  }

};
