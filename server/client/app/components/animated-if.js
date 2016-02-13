import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import on from 'ember-evented/on';
import run from 'ember-runloop';
import set from 'ember-metal/set';

export default Component.extend({

  classNames: ['animated-if'],
  classNameBindings: ['isAnimatingOut', 'isAnimatingIn'],

  isAnimatingIn: computed(function() { return get(this, 'display'); }),
  isAnimatingOut: false,

  display: computed(function() { return get(this, 'predicate'); }),

  notifier: observer('predicate', function() {
    if(get(this, 'predicate')) {
      set(this, 'display', true);
      run.schedule('afterRender', () => set(this, 'isAnimatingIn', true));
    } else {
      set(this, 'isAnimatingOut', true);
    }
  }),

  finishedAnimating: on('transitionEnd', 'animationEnd', function({target}) {
    if(target === this.element) {
      set(this, 'isAnimatingIn', false);
      set(this, 'isAnimatingOut', false);
      if(!get(this, 'predicate'))
        set(this, 'display', false);
    }
  })

}).reopenClass({
  positionalParams: ['predicate']
});
