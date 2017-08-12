import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import service from 'ember-service/inject';
import computed, {alias, mapBy} from 'ember-computed-decorators';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({

  session: service(),

  viewingPosition: attr('number'),
  createdAt: attr('date'),

  answerOrderings: hasMany({async: false}),
  memberships:     hasMany({async: false}),
  rounds:          hasMany({async: false}),
  currentRound:    belongsTo('round', {async: false}),

  @alias('session.player') player,
  @mapBy('memberships', 'player') players,

  @computed('memberships.@each.player', 'player')
  playerMembership(memberships, player) {
    return memberships.findBy('player', player);
  },

  @computed('players.[]', 'player')
  hasPlayer(players, player) {
    return players.includes(player);
  },

  @computed('memberships.@each.player', 'player')
  opponents(memberships, player) {
    return memberships.rejectBy('player', player);
  }

});
