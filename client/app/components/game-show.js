import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import service from 'ember-service/inject';
import set from 'ember-metal/set';

export default Component.extend({

  // attrs
  'on-pick': null,

  session: service(),

  isCzar: computed('session.player', 'game.player', function() {
    return get(this, 'session.player') === get(this, 'game.player');
  }),

  submittable: computed('game.memberships', function() {
    const player = get(this, 'session.player');
    return get(this, 'game.memberships').filter(membership => {
      return get(membership, 'player') !== player;
    });
  }),

  submitted: computed.filterBy('game.memberships', 'firstAnswer'),

  allSubmitted: computed('submittable.length', 'submitted.length', function() {
    return get(this, 'submittable.length') === get(this, 'submitted.length');
  }),

  onlyPlayer: computed.equal('submittable.length', 0),

  playerMembership: computed('game.memberships', function() {
    const player = get(this, 'session.player');
    return get(this, 'game.memberships').findBy('player', player);
  }),

  playerSubmitted: computed.bool('playerMembership.firstAnswer'),

  rotate: Ember.on('didInsertElement', function() {
    this.$('.game-show--hand').on('scroll', event => {
      const {scrollLeft, scrollWidth, clientWidth} = event.target;
      const scrollPosition = scrollLeft / (scrollWidth - clientWidth);
      const cardWidth = window.innerWidth / 2;
      const cards = this.$('.game-show--hand--card');
      cards.each((index, item) => {
        const cardPosition = (item.offsetLeft - cardWidth / 2) / (scrollWidth - clientWidth);
        const delta = Math.min(cardPosition - scrollPosition, 0.2);
        const radius = cardWidth * 10;
        const angle = delta / Math.sqrt(1 - Math.pow(delta, 2));
        const drop = -(Math.sqrt(1 - Math.pow(delta, 2)) - 1) * radius;
        item.style.transform = `rotate(${angle}rad) translateY(${drop}px)`;
      });
    }).trigger('scroll');
  }),

  actions: {
    
    submit(answer) {
      set(this, 'playerMembership.firstAnswer', answer);
      // this.sendAction('on-submit', [answer]);
    },

    pick(membership) {
      this.sendAction('on-pick', membership);
    }
    
  }

});
