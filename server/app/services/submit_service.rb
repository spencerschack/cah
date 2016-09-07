class SubmitService < GameService

  attr_reader :game, :answers, :player, :answers

  validates :game, :answers, :player, presence: true
  validate :all_questions_answered?
  validate :player_in_game?
  validate :membership_has_not_answered?
  validate :membership_is_not_czar?

  def run
    membership.answer_orderings.each do |ordering|
      if position = answers.index(ordering.answer)
        ordering.update!(position: position, pile: 'submissions')
      end
    end
  end

  def update
    GameChannel.broadcast_json_to game, membership, includes: 'submissions'
  end

  private

  def all_questions_answered?
    if game.question.pick != answers.length
      errors.add :answers, 'is not the right length'
    end
  end

  def player_in_game?
    unless membership
      errors.add :player, 'is not in the game'
    end
  end

  def membership_has_not_answered?
    if membership.answer_orderings.submissions.any?
      errors.add :membership, 'cannot have already answered'
    end
  end

  def membership_is_not_czar?
    if game.membership == membership
      errors.add :membership, 'cannot submit when czar'
    end
  end

  def membership
    @membership ||= game.memberships.find_by(player: player)
  end

end
