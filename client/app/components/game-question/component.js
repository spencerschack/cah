import Component from 'ember-component';
import StyledComponentMixin from 'ember-style-bindings/mixins/styled-component';
import {computed} from 'ember-decorators/object';
import {filter} from '../../utils/object';

export default class GameQuestionComponents extends Component {

  tagName = ''

  @computed('transform', 'transition')
  style(transform, transition) {
    return {transform, transition};
  }

  @computed('round.acknowledgeProgress')
  transform(progress) {
    if(progress < 0) progress /= 4;
    return `translateY(${progress * -100}%)`;
  }

  @computed('round.isWinnerPanning')
  transition(isWinnerPanning) {
    return isWinnerPanning ? 'none' : null;
  }

};
