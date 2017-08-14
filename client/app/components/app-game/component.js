import Component from 'ember-component';
import {computed} from 'ember-decorators/object';
import {on} from 'ember-decorators/object/evented';
import {alias, bool, not} from 'ember-decorators/object/computed';
import {action} from 'ember-decorators/object';

import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default class AppGameComponent extends Component {

  localClassNames = ['app-game']

  localClassNameBindings = [
    'isRoundSubmitted',
    'isPlayerSubmitted',
    'isAcknowledging',
    'isCzar',
    'hasWinner'
  ]

  isMenuOpen = false
  isAcknowledging = false

  @not('game.hasPlayer') mustJoin
  @alias('round.isSubmitted') isRoundSubmitted
  @alias('round.czar.isPlayer') isCzar
  @bool('round.winner') hasWinner

  @computed
  round() {
    return get(this, 'game.currentRound');
  }

  @computed('game.playerMembership.submissions.[]', 'round', 'round.pick')
  isPlayerSubmitted(submissions, round, pick) {
    if(!submissions) return false;
    submissions = submissions.filterBy('round', round);
    return get(submissions, 'length') === pick;
  }

  @action
  toggle() {
    this.toggleProperty('isMenuOpen');
  }

  @action
  acknowledging() {
    set(this, 'isAcknowledging', true);
  }

  @action
  acknowledged() {
    this.notifyPropertyChange('round');
    set(this, 'isAcknowledging', false);
  }

  @action
  join() {
    const player = get(this, 'game.player');
    const membership = get(this, 'game.memberships').createRecord({player});
    membership.save();
  }

  @action
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

};
