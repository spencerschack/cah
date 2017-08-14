import Component from 'ember-component';
import {action} from 'ember-decorators/object';
import {alias} from 'ember-decorators/object/computed';
import {service} from 'ember-decorators/service';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default class AppIntroComponent extends Component {

  classNameBindings = ['isLoading']

  @service store
  @service session
  @service('-routing') routing

  name = ''
  @alias('session.player') player

  isLoading = false

  createRecord(model, attrs) {
    set(this, 'isLoading', true);
    const record = get(this, 'store').createRecord(model, attrs);
    return record.save().finally(() => {
      set(this, 'isLoading', false);
    });
  }

  transitionToGame(game) {
    get(this, 'routing.router').transitionTo('game', get(game, 'id'));
  }

  @action
  start() {
    this.createRecord('game').then(::this.transitionToGame);
  }

  @action
  join(name) {
    if(!name) return;
    get(this, 'session').createPlayer({name}).then(() => {
      const game = get(this, 'game');
      if(game) {
        this.transitionToGame(game);
      } else {
        this.send('start');
      }
    });
  }

};
