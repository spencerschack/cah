export default function() {

  const duration = 500;

  this.transition(
    this.hasClass('game--play--outlet'),
    this.toRoute('game.play.index'),
    this.fromRoute('game.play.players'),
    this.use('toRight', {duration}),
    this.reverse('toLeft', {duration}));

};
