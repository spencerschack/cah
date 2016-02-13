import Route from 'ember-route';
import get from 'ember-metal/get';
import service from 'ember-service/inject';

export default Route.extend({

  session: service(),

  beforeModel() {
    return get(this, 'session').load();
  }

});
