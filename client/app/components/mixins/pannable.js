import Mixin from 'ember-metal/mixin';
import $ from 'jquery';
import {on} from 'ember-decorators/object/evented';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

const directions = ['right', 'up', 'left', 'down'];
const axis = {right: 'x', left: 'x', up: 'y', down: 'y'};

export default Mixin.create({

  panMoved: false,
  panningDirection: null,
  lastPanEvent: null,
  firstPanEvent: null,

  @on('touchStart', 'mouseDown')
  triggerPanStart(event) {
    event.preventDefault();
    set(this, 'firstPanEvent', event);
    set(this, 'lastPanEvent', event);
    this.trigger('panStart', event);
    if(event.type === "mousedown") {
      const triggerPanMove = ::this.triggerPanMove;
      $(window).on('mousemove', triggerPanMove);
      $(window).one('mouseup', event => {
        $(window).off('mousemove', triggerPanMove);
        this.triggerPanEnd(event);
      });
    }
  },

  @on('touchMove')
  triggerPanMove(event) {
    const firstPanEvent = get(this, 'firstPanEvent');
    const dX = event.pageX - firstPanEvent.pageX;
    const dY = event.pageY - firstPanEvent.pageY;
    let direction = get(this, 'panningDirection');
    if(!direction && Math.sqrt(dX * dX + dY * dY) > 10) {
      set(this, 'panMoved', true);
      const angle = (Math.atan2(-dY, dX) + 2 * Math.PI) % (2 * Math.PI);
      const quadrant = Math.round(angle / (Math.PI / 2)) % 4;
      direction = set(this, 'panningDirection', directions[quadrant]);
    }
    if(direction) {
      event.elementDeltaX = dX / this.element.offsetWidth;
      event.elementDeltaY = dY / this.element.offsetHeight;
      event.viewportDeltaX = dX / window.innerWidth;
      event.viewportDeltaY = dY / window.innerHeight;
      event.direction = direction;
      const events = [
        'Move',
        direction.capitalize(),
        axis[direction].capitalize()
      ];
      events.forEach(name => this.trigger('pan' + name, event));
    }
  },

  @on('touchEnd')
  triggerPanEnd(event) {
    set(this, 'lastPanEvent', null);
    if(get(this, 'panMoved')) {
      set(this, 'panMoved', false);
      this.trigger('panEnd', event);
      set(this, 'panningDirection', null);
    } else {
      this.trigger('tap', event);
    }
  }

});
