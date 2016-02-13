import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import decorated from 'ember-computed-decorators';

export default Component.extend({

  // attrs
  'player-membership': null,
  'on-choose': null,
  'on-position': null,

  classNames: ['game-show'],

  playerMembership: computed.alias('player-membership'),
  game: computed.alias('playerMembership.game'),

  isAcking: computed.equal('state', 'acking'),
  question: computed.ifProp('isAcking', 'game.lastQuestion', 'game.question'),

  memberships: computed.alias('game.memberships'),
  pick: computed.alias('game.question.pick'),

  membershipScores: computed.mapBy('memberships', 'score'),
  totalTurns: computed.sum('membershipScores'),
  ackedTurns: computed.init('totalTurns'),
  needsAck: computed.gtProp('totalTurns', 'ackedTurns'),

  isCzar: computed.equalProp('playerMembership.player', 'game.player'),
  isOnlyPlayer: computed.equal('submittableCount', 0),

  submittableCount: computed.difference('memberships.length', 1),
  submitted: computed.filterByProp('memberships', 'submissions.length', 'pick'),

  isAllSubmitted: computed.equalProp('submittableCount', 'submitted.length'),
  playerSubmissions: computed.alias('playerMembership.submissions'),
  isPlayerSubmitted: computed.equalProp('playerSubmissions.length', 'pick'),

  @decorated('isCzar', 'isPlayerSubmitted', 'isAllSubmitted', 'needsAck')
  state(isCzar, isPlayerSubmitted, isAllSubmitted, needsAck) {
    if(needsAck)
      return 'acking';
    if(isAllSubmitted)
      return 'viewing';
    if(isPlayerSubmitted || isCzar)
      return 'waiting';
    return 'choosing';
  },

  actions: {

    ackTurn() {
      this.incrementProperty('ackedTurns');
    },

    position(position) {
      this.sendAction('on-position', position);
    },
    
    submit(answer) {
      this.sendAction('on-submit', answer);
    },

    pick(membership) {
      this.sendAction('on-pick', membership);
    }
    
  }

});
