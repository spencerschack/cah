import Mixin from 'ember-metal/mixin';
import $ from 'jquery';
import {on} from 'ember-computed-decorators';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

const directions = ['right', 'up', 'left', 'down'];
const axis = {right: 'x', left: 'x', up: 'y', down: 'y'};

export default Mixin.create({

  isPanning: false,
  panningDirection: null,
  lastPanEvent: null,

  @on('touchStart', 'mouseDown')
  triggerPanStart(event) {
    event.preventDefault();
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
    set(this, 'isPanning', true);
    const lastPanEvent = get(this, 'lastPanEvent');
    const deltaX = event.deltaX = event.pageX - lastPanEvent.pageX;
    const deltaY = event.deltaY = event.pageY - lastPanEvent.pageY;
    let direction = get(this, 'panningDirection');
    if(!direction) {
      const angle = (Math.atan2(-deltaY, deltaX) + 2 * Math.PI) % (2 * Math.PI);
      const quadrant = Math.round(angle / (Math.PI / 2)) % 4;
      direction = set(this, 'panningDirection', directions[quadrant]);
    }
    event.direction = direction;
    const events = [
      'Move',
      direction.capitalize(),
      axis[direction].capitalize()
    ];
    events.forEach(name => this.trigger('pan' + name, event));
    set(this, 'lastPanEvent', event);
  },

  @on('touchEnd')
  triggerPanEnd(event) {
    set(this, 'lastPanEvent', null);
    if(get(this, 'isPanning')) {
      set(this, 'isPanning', false);
      this.trigger('panEnd', event);
      set(this, 'panningDirection', null);
    } else {
      this.trigger('tap', event);
    }
  }

});
