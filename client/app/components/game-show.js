import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import set from 'ember-metal/set';

const handRadius = 300;
export const handAngle = 0.165;

export default Component.extend({

  // attrs
  'on-pick': null,

  session: service(),

  classNames: ['game-show'],

  isCzar: computed('session.player', 'game.player', function() {
    return get(this, 'session.player') === get(this, 'game.player');
  }),

  submittable: computed('game.memberships', function() {
    const player = get(this, 'session.player');
    return get(this, 'game.memberships').filter(membership => {
      return get(membership, 'player') !== player;
    });
  }),

  submitted: computed.filterBy('game.memberships', 'answers.length'),

  allSubmitted: computed('submittable.length', 'submitted.length', function() {
    return get(this, 'submittable.length') === get(this, 'submitted.length');
  }),

  onlyPlayer: computed.equal('submittable.length', 0),

  playerMembership: computed('game.memberships', function() {
    const player = get(this, 'session.player');
    return get(this, 'game.memberships').findBy('player', player);
  }),

  playerSubmitted: computed('playerMembership.answers.length', 'game.question.pick', function() {
    return get(this, 'playerMembership.answers.length') === get(this, 'game.question.pick');
  }),

  actions: {
    
    submit(answer) {
      const game = get(this, 'game');
      const answers = get(this, 'playerMembership.answers');
      answers.addObject(answer);
      get(game, 'answers').removeObject(answer);
      if(get(answers, 'length') === get(game, 'question.pick'))
        this.sendAction('on-submit', answers);
    },

    pick(membership) {
      this.sendAction('on-pick', membership);
    }
    
  }

});
