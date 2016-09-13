import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany} from 'ember-data/relationships';
import computed from 'ember-computed-decorators';

export default Model.extend({

  isPanning: false,

  updatedAt: attr('date'),

  answer:     belongsTo({async: false}),
  game:       belongsTo({async: false}),
  membership: belongsTo({async: false}),
  submissions: hasMany({async: false})

});
