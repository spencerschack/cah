import Component from 'ember-component';
import computed from 'ember-computed-decorators';
import get from 'ember-metal/get';
import {range} from '../../utils/array';

export default Component.extend({

  classNames: ['game-show--submissions'],

  // attrs
  submitted: 0,
  submittable: 0,

  @computed('submitted', 'submittable')
  numbers(submitted, submittable) {
    return range(submittable, submittable - submitted);
  }

});
