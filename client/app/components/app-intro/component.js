import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import set from 'ember-metal/set';

export default Component.extend({

  classNames: ['app-intro'],

  classNameBindings: ['isLoading'],

  store: service(),
  session: service(),
  routing: service('-routing'),

  name: '',
  player: computed.alias('session.player'),

  isLoading: false,

  createRecord(model, attrs) {
    set(this, 'isLoading', true);
    const record = get(this, 'store').createRecord(model, attrs);
    return record.save().finally(() => {
      set(this, 'isLoading', false);
    });
  },

  transitionToGame(game) {
    get(this, 'routing.router').transitionTo('game', get(game, 'id'));
  },

  actions: {

    start() {
      this.createRecord('game').then(::this.transitionToGame);
    },

    join(name) {
      if(!name) return;
      get(this, 'session').createPlayer({name}).then(() => {
        const game = get(this, 'game');
        if(game)
          this.transitionToGame(game);
      });
    }

  }

});
