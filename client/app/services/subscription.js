import $ from 'jquery';
import Service from 'ember-service';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import service from 'ember-service/inject';
import {computed} from 'ember-decorators/object';

export default Service.extend({

  store: service(),
  cable: service(),

  @computed
  consumer() {
    const a = document.createElement('a');
    a.href = '/cable';
    a.protocol = 'ws:';
    return get(this, 'cable').createConsumer(a.href);
  },

  subscribe(model) {
    if(!get(model, 'subscription')) {
      const subscriptions = get(this, 'consumer.subscriptions');
      const modelName = get(model, 'constructor.modelName');
      const channel = `${modelName.classify()}Channel`;
      const identifier = {channel, id: get(model, 'id')};
      const received = ::this.received;
      const subscription = subscriptions.create(identifier, {received});
      set(model, 'subscription', subscription);
    }
  },

  unsubscribe(model) {
    const subscription = get(model, 'subscription');
    if(subscription) {
      subscription.unsubscribe();
      set(model, 'subscription', null);
    }
  },

  received(data) {
    const store = get(this, 'store');
    if($.active === 0) {
      this.push(data);
    } else {
      $(document).one('ajaxComplete', () => {
        if($.active === 1) { // The current request that just 'ajaxComplete'ed.
          this.push(data);
        } else {
          this.received(data);
        }
      });
    }
  },

  push(data) {
    const store = get(this, 'store');
    data.forEach(item => store.pushPayload(item));
  }

});
