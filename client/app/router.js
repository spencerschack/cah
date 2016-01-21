import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('lobby', {path: '/'});
  this.route('register');
  this.route('game', {path: '/:game_id'}, function() {
    this.route('play', {path: '/'}, function() {
      this.route('players');
    });
    this.route('join');
  });
});

export default Router;
