import Component from 'ember-component';
import get from 'ember-metal/get';
import computed from 'ember-computed-decorators';

export default Component.extend({

  classNames: ['game-status'],

  @computed('round.game.memberships.length', 'round.czar.isPlayer', 'round.czar.player.name', 'round.isSubmitted')
  text(membershipCount, isPlayer, name, isSubmitted) {
    if(membershipCount > 2) {
      if(isSubmitted) {
        return isPlayer ?
          'Choose a winning answer.' :
          `${name} is choosing an answer...`;
      } else {
        return isPlayer ?
          'Answers will show up here as they are submitted.' :
          `Choose an answer for ${name}.`;
      }
    } else {
      return 'Share this page to let others join.'
    }
  }

});
