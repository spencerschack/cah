import Component from 'ember-component';
import computed from 'ember-computed-decorators';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import Pannable from '../mixins/pannable';

export default Component.extend(
  Pannable,
{

  classNameBindings: ['isPanning'],

  position: 0,

  @computed('game.playerMembership.answerOrderings.length')
  maxPosition(answerOrderings) {
    return answerOrderings - 1;
  },

  panX({deltaX}) {
    let delta = -deltaX / this.element.offsetWidth;
    const position = get(this, 'position');
    const maxPosition = get(this, 'maxPosition');
    if(position < 0 || position > maxPosition)
      delta /= 4;
    this.incrementProperty('position', delta);
  },

  panEnd() {
    let position = get(this, 'position');
    const maxPosition = get(this, 'maxPosition');
    position = Math.min(Math.max(Math.round(position), 0), maxPosition);
    set(this, 'position', position);
  }

});
