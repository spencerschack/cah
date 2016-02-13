import Ember from 'ember';
import JSONAPISerializer from 'ember-data/serializers/json-api';
import {underscore} from 'ember-string';

export default JSONAPISerializer.extend({

  keyForAttribute(key) {
    return underscore(key);
  },

  keyForRelationship(key) {
    return underscore(key);
  },

  serialize() {
    const data = this._super(...arguments).data;
    const attributes = data.attributes || {};
    const relationships = data.relationships || {};
    for(let name in relationships) {
      const data = relationships[name].data;
      if(data) {
        attributes[name + '_id'] = data.id;
      }
    }
    return attributes;
  }

});
