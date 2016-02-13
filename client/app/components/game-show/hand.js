import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {cardWidth} from './hand/choice';

export default Component.extend({

  // attrs
  choices: null,
  'on-choose': null,
  'on-position': null,
  'has-submitted': null,

  classNames: ['game-show--hand'],
  classNameBindings: ['isTouching'],

  position: 0,

  maxPosition: computed.difference('choices.length', 1),
  isTouching: false,

  touchStart({originalEvent: event}) {
    if(!get(this, 'on-choose')) return;
    set(this, 'lastPosition', get(this, 'position'));
    set(this, 'isTouching', true);
    set(this, 'lastX', event.touches[0].pageX);
  },

  touchMove({originalEvent: event}) {
    if(!get(this, 'on-choose')) return;
    const lastX = get(this, 'lastX');
    const currentX = event.touches[0].pageX;
    const position = get(this, 'position');
    let delta = (lastX - currentX) / cardWidth();
    if(position <= 0 || position >= get(this, 'maxPosition'))
      delta /= 4;
    this.incrementProperty('position', delta);
    set(this, 'lastX', currentX);
  },

  touchEnd() {
    if(!get(this, 'on-choose')) return;
    const maxPosition = get(this, 'maxPosition');
    let position = get(this, 'position');
    position = Math.min(maxPosition, Math.max(0, Math.round(position)));
    set(this, 'position', position);
    if(position !== get(this, 'lastPosition'))
      this.sendAction('on-position', position);
    set(this, 'isTouching', false);
  },

  actions: {
    
    choose(choice) {
      get(this, 'choices').removeObject(choice);
      this.sendAction('on-choose', choice);
    }
  
  }

});
