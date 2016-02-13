import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import on from 'ember-evented/on';
import run from 'ember-runloop';
import set from 'ember-metal/set';

export const cardWidth = () => window.innerWidth * 0.55;

export const angle = 0.15;
export const radius = 300;

const minAngle = 5 / 4 * Math.PI;
const maxAngle = 7 / 4 * Math.PI;

export default Component.extend({

  // attrs
  choice: null,
  position: null,
  'on-choose': null,

  answers: computed('choice', function() {
    const choice = get(this, 'choice');
    if(get(choice, 'text')) return [choice];
    return get(choice, 'submissions');
  }),

  classNames: ['game-show--hand--choice'],

  startX: null,
  startY: null,
  currentX: null,
  currentY: null,
  flickX: computed('startX', 'currentX', function() {
    const start = get(this, 'startX');
    const current = get(this, 'currentX');
    return start && current ? current - start : 0;
  }),
  flickY: computed('startY', 'currentY', function() {
    const start = get(this, 'startY');
    const current = get(this, 'currentY');
    return start && current ? current - start : 0;
  }),

  angle: computed('answers.length', function() {
    const length = get(this, 'answers.length');
    const anglesPerChoice = length > 1 ? length + 0.5 : length;
    return anglesPerChoice * angle;
  }),

  rotation: computed('position', 'angle', function() {
    return get(this, 'position') * get(this, 'angle');
  }),

  touchDirection: null,

  rotateZ: computed('rotation', 'flickX', function() {
    const rotation = get(this, 'rotation');
    const correction = Math.min(get(this, 'flickX') / cardWidth(), 1);
    return `rotateZ(${rotation + correction * angle}rad)`;
  }),

  translateX: computed('rotation', 'flickX', function() {
    const hand = Math.sin(get(this, 'rotation')) * radius;
    const flick = get(this, 'flickX');
    return `translateX(${hand}vw) translateX(${flick}px)`;
  }),

  translateY: computed('rotation', 'flickY', function() {
    const hand = radius - Math.cos(get(this, 'rotation')) * radius;
    const flick = get(this, 'flickY');
    return `translateY(${hand}vw) translateY(${flick}px)`;
  }),

  transforms: computed.collect('translateX', 'translateY', 'rotateZ'),

  transformer: on('didInsertElement', observer('position', 'transforms.[]', function() {
    const style = this.element.style;
    const position = get(this, 'position');
    style.display = position < -2 || position > 2 ? 'none' : '';
    style.transform = get(this, 'transforms').join(' ');
  })),

  firstTouchMove(event) {
    const diffX = get(this, 'startX') - event.originalEvent.touches[0].pageX;
    const diffY = get(this, 'startY') - event.originalEvent.touches[0].pageY;
    const angle = Math.atan2(diffY, diffX) + Math.PI;
    const direction = angle < maxAngle && angle > minAngle ? 'upward' : '?';
    set(this, 'touchDirection', direction);
    if(direction === 'upward')
      this.flickTouchMove(event);
  },

  flickTouchMove(event) {
    event.preventDefault();
    event.stopPropagation();
    set(this, 'currentX', event.originalEvent.touches[0].pageX);
    set(this, 'currentY', event.originalEvent.touches[0].pageY);
  },

  touchStart(event) {
    if(!get(this, 'on-choose')) return;
    set(this, 'startX', event.originalEvent.touches[0].pageX);
    set(this, 'startY', event.originalEvent.touches[0].pageY);
  },

  touchMove(event) {
    if(!get(this, 'on-choose')) return;
    switch(get(this, 'touchDirection')) {
      case null:     this.firstTouchMove(event); break;
      case 'upward': this.flickTouchMove(event); break;
    }
  },

  touchEnd() {
    if(!get(this, 'on-choose')) return;
    // Let this run next so that `hand` can remove `.is-touching`
    run.schedule('afterRender', () => {
      if(-get(this, 'flickY') > cardWidth())
        this.choose();
      set(this, 'touchDirection', null);
      set(this, 'startX', null);
      set(this, 'startY', null);
      set(this, 'currentX', null);
      set(this, 'currentY', null);
    });
  },

  click() {
    if(!get(this, 'on-choose')) return;
    this.$().removeClass('is-bouncing');
    run.next(() => this.$().addClass('is-bouncing'));
  },

  choose() {
    this.animateOut();
    this.sendAction('on-choose', get(this, 'choice'));
  },

  animateOut() {
    const copy = this.$().clone();
    const parent = this.$().parent();
    run.schedule('afterRender', () => {
      copy.appendTo(parent);
      run.next(() => {
        copy.addClass('is-submitted');
        copy.css('transform', '');
        copy.one('transitionend animationend', () => copy.remove());
      });
    });
  }

});
