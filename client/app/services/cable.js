import Service from 'ember-service';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

function consumer() {
  if(!consumer.instance) {
    const a = document.createElement('a');
    a.href = '/cable';
    a.protocol = 'ws:';
    consumer.instance = Cable.createConsumer(a.href);
  }
  return consumer.instance;
}

export default Service.extend({

  store: service(),

  subscribe(channel, handlers = {}) {
    handlers.received = data => {
      console.log('cable:', data);
      if(data) {
        get(this, 'store').pushPayload(data);
      }
    };
    return consumer().subscriptions.create(channel, handlers);
  }

});
