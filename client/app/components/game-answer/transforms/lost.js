import computed from 'ember-computed-decorators';
import HandTransform from './hand';

export default HandTransform.extend({

  concatenatedProperties: ['transformBindings'],

  transformBindings: ['moveDownToHide:translateY(vh)'],

  moveDownToHide: 50

});
