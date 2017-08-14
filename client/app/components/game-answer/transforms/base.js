import Ember from 'ember';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {on} from 'ember-decorators/object/evented';
import {observes} from 'ember-decorators/object';

import {delegateTo} from '../../../utils/decorators';
import Bindings from '../../mixins/bindings';

export default class BaseTransform extends Ember.Object.extend(Ember.Evented) {

  transition = 'none'

  @delegateTo('component') answerOrdering
  @delegateTo('component') round
  @delegateTo('component') submission
  @delegateTo('component') element
  @delegateTo('round') game
  @delegateTo('answerOrdering') membership

  trigger(name, ...args) {
    if(this[name]) this[name](...args);
    return this._super(name, ...args);
  }

  sendAction(...args) {
    get(this, 'component').sendAction(...args);
  }

};
