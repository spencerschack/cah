import {alias} from 'ember-decorators/object/computed';

export default {
  @alias('round.answerOrderings') hand: null,
  @alias('round.game.viewingPosition') position: null
};
