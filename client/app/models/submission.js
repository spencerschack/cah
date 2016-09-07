import Model from 'ember-data/model';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({

  round:          belongsTo(),
  answerOrdering: belongsTo(),
  submitter:      belongsTo('membership')

});
