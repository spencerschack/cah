import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {computed} from 'ember-decorators/object';
import {alias} from 'ember-decorators/object/computed';
import {on} from 'ember-decorators/object/evented';

import StyledComponentMixin from 'ember-style-bindings/mixins/styled-component';
import Pannable from '../mixins/pannable';
import states from './transforms';

export default class GameAnswerComponent extends Component.extend(StyledComponentMixin, Pannable) {

  classNameBindings = ['stateClass']

  // styleBindings = [
  //   'state.transform',
  //   'state.transition',
  //   'state.zIndex',
  // ]

  @computed('state.{transform,transition,zIndex}')
  style(transform, transition, zIndex) {
    return {transform, transition: 'none', zIndex};
  }

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
  }

  @computed('stateName')
  stateClass(name) {
    return 'is-state-' + name.dasherize();
  }

  @computed('stateName')
  state(name) {
    const lastState = get(this, 'lastState');
    if(lastState) lastState.destroy();
    const state = states[name].create({component: this});
    set(this, 'lastState', state);
    return state;
  }

  @on('willDestroyElement')
  teardownState() {
    const state = get(this, 'state');
    if(state) state.destroy();
  }

  @computed('round.submissions.[]', 'answerOrdering')
  submission(submissions, answerOrdering){
    return submissions.findBy('answerOrdering', answerOrdering);
  }

  trigger(...args) {
    get(this, 'state').trigger(...args);
    return this._super(...args);
  }

};
