import Component from 'ember-component';
import computed, {alias, bool, on, not} from 'ember-computed-decorators';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import service from 'ember-service/inject';

export default Component.extend({

  classNames: ['app-game'],

  classNameBindings: [
    'isRoundSubmitted',
    'isPlayerSubmitted',
    'isAcknowledging',
    'isCzar',
    'hasWinner'
  ],

  isMenuOpen: false,
  isAcknowledging: false,

  @not('game.hasPlayer') hasToJoin,
  @alias('round.isSubmitted') isRoundSubmitted,
  @alias('round.czar.isPlayer') isCzar,
  @bool('round.winner') hasWinner,

  @computed
  round() {
    return get(this, 'game.currentRound');
  },

  @computed('game.playerMembership.submissions.[]', 'round', 'round.pick')
  isPlayerSubmitted(submissions, round, pick) {
    if(!submissions) return false;
    submissions = submissions.filterBy('round', round);
    return get(submissions, 'length') === pick;
  },

  actions: {

    toggle() {
      this.toggleProperty('isMenuOpen');
    },

    acknowledging() {
      set(this, 'isAcknowledging', true);
    },

    acknowledged() {
      this.notifyPropertyChange('round');
      set(this, 'isAcknowledging', false);
    },

    join() {
      const player = get(this, 'game.player');
      const membership = get(this, 'game.memberships').createRecord({player});
      membership.save();
    },

    submit(answerOrdering) {
      const round = get(this, 'round');
      if(get(round, 'isSubmitted')) {
        set(round, 'winner', get(answerOrdering, 'membership'));
        round.save();
      } else {
        const submissions = get(this, 'game.playerMembership.submissions');
        const submission = submissions.createRecord({answerOrdering, round});
        submission.save();
      }
    }

  }

});
