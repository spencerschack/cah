import Component from 'ember-component';
import get from 'ember-metal/get';
import on from 'ember-evented/on';
import run from 'ember-runloop';

function transformFor(x, y, radius) {
  return `translateX(${x}vw) translateY(${y}vw) rotateZ(${radius}rad)`;
}

export default Component.extend({

  // attrs
  number: null,

  classNames: ['game-show--submission'],

  throwInFrom: on('willInsertElement', function() {
    const theta = Math.random() * Math.PI;
    const radius = 100;
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;
    const rotation = (Math.random() - 0.5) * Math.PI * 4;
    this.element.style.transform = transformFor(x, y, rotation);
  }),

  throwInTo: on('didInsertElement', function() {
    run.later(() => {
      const rotation = (Math.random() - 0.5) * Math.PI / 2;
      const x = Math.random() * 20;
      const y = Math.random() * 20;
      this.element.style.transform = transformFor(x, y, rotation);
    }, get(this, 'delay'));
  })

});
