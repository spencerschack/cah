import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed-decorators';
import StyledComponentMixin from 'ember-style-bindings/mixins/styled-component';
import Pannable from '../mixins/pannable';
import transforms from './transforms';

export default Component.extend(
  StyledComponentMixin,
  Pannable,
{

  classNameBindings: ['stateClass'],

  offsetX: 0,
  offsetY: 0,

  styleBindings: [
    'transformer.transform:transform',
    'transformer.opacity:opacity',
    'transformer.zIndex:zIndex',
  ],

  @computed('answerOrdering.membership.{,player.isPlayer}')
  state(membership, isPlayer) {
    if(!membership) return 'pile';
    return isPlayer ? 'hand' : 'opponent';
  },

  @computed('state')
  stateClass(state) {
    return `is-state-${state}`;
  },

  @computed('state')
  transformer(state) {
    return transforms[state].create({card: this});
  },

  tap() {
    if(get(this, 'state') === 'hand') {
      const handIndex = get(this, 'answerOrdering.handIndex');
      if(get(this, 'position') === handIndex) {
        // TODO: bounce
      } else {
        set(this, 'position', handIndex);
      }
    }
  },

  panUp({deltaX, deltaY}) {
    deltaX *= 100 / this.element.offsetWidth;
    deltaY *= 100 / this.element.offsetHeight;
    const offsetY = get(this, 'offsetY');
    if(offsetY > 0) deltaY /= 4;
    this.incrementProperty('offsetX', deltaX);
    this.incrementProperty('offsetY', deltaY);
  },

  panEnd() {
    if(get(this, 'offsetY') < -50) {
      set(this, 'answerOrdering.membership', null);
    }
    set(this, 'offsetX', 0);
    set(this, 'offsetY', 0);
  }

});
