import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  attrs: {
    submissions: {serialize: false}
  }

});
