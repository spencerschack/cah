import Component from 'ember-component';
import GameButton from '../mixins/game-button';

export default Component.extend(
  GameButton,
{

  classNameBindings: ['isClosed']

});
