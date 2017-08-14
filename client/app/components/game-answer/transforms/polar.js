import Mixin from 'ember-metal/mixin';
import {computed} from 'ember-decorators/object';

export default Mixin.create({

  @computed('radius', 'theta')
  translateX(radius, theta) {
    return radius * Math.cos(theta);
  },

  @computed('radius', 'theta')
  translateY(radius, theta) {
    return radius * Math.sin(theta);
  },

});
