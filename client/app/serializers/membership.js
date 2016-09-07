import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  attrs: {
    score: {serialize: false},
    submissions: {serialize: false}
  }

});
