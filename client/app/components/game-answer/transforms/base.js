import Ember from 'ember';
import get from 'ember-metal/get';
import {on, observes} from 'ember-computed-decorators';
import {delegateTo} from '../../../utils/decorators';
import Bindings from '../../mixins/bindings';

export default Ember.Object.extend(
  Ember.Evented,
  Bindings('transform', {prefix: '(', suffix: ')', separator: ' '}),
{

  @delegateTo('component') answerOrdering,
  @delegateTo('component') round,
  @delegateTo('component') submission,
  @delegateTo('component') element,
  @delegateTo('round') game,
  @delegateTo('answerOrdering') membership,

  @on('willDestroyElement')
  @observes('component.state')
  teardown() {
    this.destroy();
  },

  trigger(name, ...args) {
    if(this[name]) this[name](...args);
    return this._super(name, ...args);
  },

  sendAction(...args) {
    get(this, 'component').sendAction(...args);
  }

});
