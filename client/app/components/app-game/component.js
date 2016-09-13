import Component from 'ember-component';
import computed, {alias, bool, on, not} from 'ember-computed-decorators';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import service from 'ember-service/inject';

export default Component.extend({

  classNameBindings: [
    'isRoundSubmitted',
    'isPlayerSubmitted',
    'isCzar'
  ],

  isMenuOpen: false,
  
  @alias('round.game') game,
  @not('game.hasPlayer') hasToJoin,
  @alias('round.isSubmitted') isRoundSubmitted,
  @alias('round.czar.isPlayer') isCzar,
  @bool('round.winner') hasWinner,

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
