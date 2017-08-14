import get from 'ember-metal/get';
import {computed} from 'ember-decorators/object';

import {delegateTo} from '../../../utils/decorators';
import Transform from './base';
import InteractableHand from './interactable-hand';

export default Transform.extend(
  InteractableHand,
{

  @delegateTo('membership') position,
  @delegateTo('membership') isGroupPanning,

  @computed('membership.answerOrderings', 'round.answerOrderings.[]')
  hand(heldByPlayer, submitted) {
    return heldByPlayer.reject(::submitted.contains);
  }

});
