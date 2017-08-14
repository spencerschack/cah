import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import service from 'ember-service/inject';
import {computed} from 'ember-decorators/object';

import {hasMany} from 'ember-data/relationships';

export default Model.extend({

  session: service(),

  name: attr('string'),
  token: attr('string'),

  games: hasMany({async: false}),

  @computed('session.player')
  isPlayer(player) {
    return this === player;
  }

});
