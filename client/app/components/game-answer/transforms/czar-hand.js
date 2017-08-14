import get from 'ember-metal/get';
import {on} from 'ember-decorators/object/evented';

import {delegateTo} from '../../../utils/decorators';
import Transform from './base';
import InteractableHand from './interactable-hand';
import Submission from './submission';

export default Transform.extend(
  InteractableHand,
  Submission,
{

  @delegateTo('round') isGroupPanning,

  @on('panEnd', 'tap')
  updateGamePosition() {
    const game = get(this, 'game');
    if(get(game, 'dirtyType'))
      game.save();
  }

});
