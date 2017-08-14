import Ember from 'ember';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {on, observes} from 'ember-computed-decorators';
import {delegateTo} from '../../../utils/decorators';
import Bindings from '../../mixins/bindings';

export default Ember.Object.extend(
  Ember.Evented,
  Bindings('transform', {prefix: '(', suffix: ')', separator: ' '}),
{

  @delegateTo('component') answerOrdering: null,
  @delegateTo('component') round: null,
  @delegateTo('component') submission: null,
  @delegateTo('component') element: null,
  @delegateTo('round') game: null,
  @delegateTo('answerOrdering') membership: null,

  trigger(name, ...args) {
    if(this[name]) this[name](...args);
    return this._super(name, ...args);
  },

  sendAction(...args) {
    get(this, 'component').sendAction(...args);
  }

});
