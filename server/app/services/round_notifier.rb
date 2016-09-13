class RoundNotifier

  attr_reader :round

  def initialize round
    @round = round
  end

  def notify!
    GameChannel.broadcast_json round.game, records
  end

  private

  def records
    records = []
    records << round
    records << round.game
    records << round.game.current_round.question
    records << round.game.current_round
    records += round.answer_orderings
    records += drawn_answer_orderings.map(&:answer)
    records += drawn_answer_orderings
    records
  end

  def drawn_answer_orderings
    @drawn_answer_orderings ||= AnswerOrdering
      .where(membership: round.submitters)
      .where('updated_at > ?', round.updated_at)
      .preload(:answer)
  end

end
