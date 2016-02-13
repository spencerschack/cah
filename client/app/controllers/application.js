import Controller from 'ember-controller';
import computed from 'ember-computed';
import service from 'ember-service/inject';

export default Controller.extend({

  session: service(),

  currentPlayer: computed.alias('session.player')

});
