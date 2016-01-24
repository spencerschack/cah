import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {cardWidth} from './hand/choice';

export default Component.extend({

  // attrs
  choices: null,
  'on-choose': null,
  'has-submitted': null,

  classNames: ['game-show--hand'],
  classNameBindings: ['isTouching', 'has-submitted'],

  position: 0,

  maxPosition: computed('choices.length', function() {
    return get(this, 'choices.length') - 1;
  }),

  isTouching: false,

  touchStart({originalEvent: event}) {
    set(this, 'isTouching', true);
    set(this, 'lastX', event.touches[0].pageX);
  },

  touchMove({originalEvent: event}) {
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
    const maxPosition = get(this, 'maxPosition');
    let position = get(this, 'position');
    position = Math.min(maxPosition, Math.max(0, Math.round(position)));
    set(this, 'position', position);
    set(this, 'isTouching', false);
  },

  actions: {
    
    choose(answer) {
      this.sendAction('on-choose', answer);
    }
  
  }

});
