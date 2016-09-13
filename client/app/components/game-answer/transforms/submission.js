import Mixin from 'ember-metal/mixin';
import {alias} from 'ember-computed-decorators';

export default Mixin.create({

  @alias('round.answerOrderings') hand,
  @alias('round.game.viewingPosition') position

});
