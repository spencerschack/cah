import Mixin from 'ember-metal/mixin';
import {on} from 'ember-computed-decorators';
import service from 'ember-service/inject';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Mixin.create({

  subscription: service(),

  afterModel(model) {
    get(this, 'subscription').subscribe(model);
  },

  @on('deactivate')
  unsubscribe() {
    const model = this.modelFor(this.routeName);
    get(this, 'subscription').unsubscribe(model);
  }

});
