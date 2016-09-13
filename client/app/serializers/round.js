import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  attrs: {
    question: {serialize: false},
    game: {serialize: false},
    czar: {serialize: false}
  }

});
