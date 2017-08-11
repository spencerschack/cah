import Component from 'ember-component';
import get from 'ember-metal/get';
import computed from 'ember-computed-decorators';

export default Component.extend({

  @computed('round.czar.isPlayer', 'round.czar.player.name', 'round.isSubmitted')
  text(isPlayer, name, isSubmitted) {
    if(isSubmitted) {
      return isPlayer ?
        'Choose a winning answer.' :
        `${name} is choosing an answer...`;
    } else {
      return isPlayer ?
        'Answers will show up here as they are submitted.' :
        `Choose an answer for ${name}.`;
    }
  }

});
