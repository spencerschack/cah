import Model from 'ember-data/model';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({

  round:          belongsTo({async: false}),
  answerOrdering: belongsTo({async: false}),
  submitter:      belongsTo('membership', {async: false})

});
