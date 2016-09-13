import Route from 'ember-route';

export default Route.extend({

  redirect(model, transition) {
    transition.send('acknowledge');
  }

});
