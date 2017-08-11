import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, {alias, on} from 'ember-computed-decorators';
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

  @computed('submission.submitter', 'round.winner', 'round.isSubmitted', 'round.czar.isPlayer', 'answerOrdering.membership.isPlayer')
  stateName(submitter, winner, isSubmitted, isPlayer) {
    if(submitter) {
      if(winner === submitter) return 'winner';
      if(!isSubmitted) return 'pile'
      return isPlayer ? 'czarHand' : 'observerHand';
    }
    const membership = get(this, 'answerOrdering.membership');
    if(membership) {
      return get(membership, 'isPlayer') ? 'playerHand' : 'opponent';
    }
    return 'hidden';
  },

  @computed('stateName')
  stateClass(name) {
    return 'is-state-' + name.dasherize();
  },

  @computed('stateName')
  state(name) {
    const lastState = get(this, 'lastState');
    if(lastState) lastState.destroy();
    const state = states[name].create({component: this});
    set(this, 'lastState', state);
    return state;
  },

  @on('willDestroyElement')
  teardownState() {
    const state = get(this, 'state');
    if(state) state.destroy();
  },

  @computed('round.submissions.[]', 'answerOrdering')
  submission(submissions, answerOrdering){
    return submissions.findBy('answerOrdering', answerOrdering);
  },

  trigger(...args) {
    get(this, 'state').trigger(...args);
    return this._super(...args);
  }

});
