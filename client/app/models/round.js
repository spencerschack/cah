import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {computed} from 'ember-decorators/object';
import {belongsTo, hasMany} from 'ember-decorators/data';
import {mapBy} from 'ember-decorators/object/computed';
import {delegateTo} from '../utils/decorators';

export default class Round extends Model {

  isGroupPanning = false
  isWinnerPanning = false
  acknowledgeProgress = 0

  @delegateTo('question') pick

  @belongsTo({async: false})                    question
  @belongsTo({async: false, inverse: 'rounds'}) game
  @belongsTo('membership', {async: false})      czar
  @belongsTo('membership', {async: false})      winner
  @hasMany({async: false})                      submissions

  @mapBy('submissions', 'answerOrdering') answerOrderings

  @computed('game.memberships.[]', 'czar')
  submitters(memberships, czar) {
    return memberships.without(czar);
  }

  @computed('game.memberships.length', 'submissions.length', 'pick')
  isSubmitted(memberships, submissions, pick) {
    return submissions === (memberships - 1) * pick;
  }

};
