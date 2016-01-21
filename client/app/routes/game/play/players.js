import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({

    model() {
      const game = this.modelFor('game');
      return get(game, 'memberships');
    }

});
