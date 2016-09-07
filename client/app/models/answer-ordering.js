import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';
import computed from 'ember-computed-decorators';

export default Model.extend({

  pile: attr('string'),
  position: attr('number'),
  answer: attr('string'),
  updatedAt: attr('date'),

  game:       belongsTo({async: false}),
  membership: belongsTo({async: false}),

  @computed('membership.answerOrderings.[]')
  handIndex(answerOrderings) {
    return answerOrderings.indexOf(this);
  }

});
