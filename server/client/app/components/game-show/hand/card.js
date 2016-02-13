import Component from 'ember-component';
import get from 'ember-metal/get';
import on from 'ember-evented/on';
import {radius, angle} from './choice';

export default Component.extend({

  // attrs
  answers: null,
  index: null,
  length: null,

  classNames: ['game-show--hand--card'],

  transformer: on('didInsertElement', function() {
    const length = get(this, 'length');
    if(length === 1) return;
    const index = get(this, 'index');
    if(index === 1 && length === 3) return;
    const rotateMagnitude = length === 2 ? angle / 2 : angle;
    const rotateDirection = index === 0 ? -1 : 1;
    const rotate = rotateMagnitude * rotateDirection;
    const y = radius - Math.cos(rotate) * radius;
    const x = Math.sin(rotate) * radius;
    this.element.style.transform = `translateX(${x}vw) translateY(${y}vw) rotateZ(${rotate}rad)`;
  })

});
