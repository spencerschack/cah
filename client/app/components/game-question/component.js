import Component from 'ember-component';
import Stylable from '../mixins/stylable';
import {computed} from 'ember-decorators/object';

export default Component.extend(
  Stylable,
{

  classNameBindings: ['isHidden'],

  styleBindings: ['transform', 'transition'],

  @computed('round.acknowledgeProgress')
  transform(progress) {
    if(progress < 0) progress /= 4;
    return `translateY(${progress * -100}%)`;
  },

  @computed('round.isWinnerPanning')
  transition(isWinnerPanning) {
    return isWinnerPanning ? 'none' : null;
  }

});
