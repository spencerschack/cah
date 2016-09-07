import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  attrs: {
    token: {serialize: false},
    games: {serialize: false}
  }

});
