import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('game', {path: '/:game_id'});
  this.route('intro', {path: '/'});
  this.route('dev');
});

export default Router;
