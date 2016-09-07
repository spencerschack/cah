import JSONAPIAdapter from 'ember-data/adapters/json-api';
import service from 'ember-service/inject';
import computed from 'ember-computed-decorators';
import {filter} from '../utils/object';

export default JSONAPIAdapter.extend({

  session: service(),

  @computed('authorizationHeader')
  headers(authorizationHeader) {
    return {
      Authorization: authorizationHeader
    }::filter();
  },

  @computed('session.token')
  authorizationHeader(token) {
    return token && `Token token=${token}`;
  }

});
