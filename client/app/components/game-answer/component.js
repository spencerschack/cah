import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, {alias} from 'ember-computed-decorators';
import {last} from '../../utils/decorators';
import Stylable from '../mixins/stylable';
import Pannable from '../mixins/pannable';
import states from './transforms';

export default Component.extend(
  Stylable,
  Pannable,
{

  classNameBindings: ['stateClass'],

  styleBindings: [
    'state.transform:transform',
    'state.transition:transition',
    'state.zIndex:zIndex',
  ],

  @computed(
    'submission.submitter',
    'answerOrdering.membership',
    'round.{czar.isPlayer,isSubmitted}',
    'isWinner')
  stateName(submitter, membership, playerIsCzar, roundIsSubmitted, isWinner) {
    if(submitter) {
      if(isWinner) return 'winner';
      if(!roundIsSubmitted) return 'pile'
      return playerIsCzar ? 'czarHand' : 'observerHand';
    }
    if(membership) {
      return get(membership, 'isPlayer') ? 'playerHand' : 'opponent';
    }
    return last;
  },

  @computed('stateName')
  stateClass(name) {
    return 'is-state-' + name.dasherize();
  },

  @computed('stateName')
  state(name) {
    return states[name].create({component: this});
  },

  @computed('round.submissions.[]', 'answerOrdering')
  submission(submissions, answerOrdering){
    return submissions.findBy('answerOrdering', answerOrdering);
  },

  @computed('submission.submitter', 'round.winner')
  isWinner(submitter, winner) {
    return winner && submitter === winner;
  },

  trigger(...args) {
    get(this, 'state').trigger(...args);
    return this._super(...args);
  }

});
