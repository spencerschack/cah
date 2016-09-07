class PickService < GameService

  attr_reader :game, :pick, :player

  validates :game, :pick, :player, presence: true
  validate :player_is_czar?
  validate :pick_is_valid_membership?
  validate :all_memberships_have_submitted?

  def run
    award_winner!
    move_submissions_into_discard!
    pull_new_question!
    draw_up_memberships!
    appoint_next_czar!
  end

  def update
    GameChannel.broadcast_json_to game, game, includes: ''
  end

  private

  def award_winner!
    game.membership.increment!(:score)
  end

  def move_submissions_into_discard!
    game.answer_orderings.submissions.each do |ordering|
      ordering.update!(pile: 'discard', player: nil, position: random_position)
    end
  end

  def pull_new_question!
    if ordering = game.question_orderings.draw.lock.first
      ordering.update!(pile: 'discard', position: random_position)
    else
      game.question_orderings.update_all(pile: 'draw')
      pull_new_question
    end
  end

  def draw_up_memberships!
    game.memberships.without(game.membership).each do |membership|
      in_hand = membership.answer_orderings.hand.count
      to_draw = 10 + game.question.draw - in_hand
      to_draw.times { draw_answer(membership) }
    end
  end

  def appoint_next_czar!
    next_czar = game.memberships.where('id > ?', game.membership_id).first
    game.update!(membership: next_czar || memberships.first)
  end

  def player_is_czar?
    unless game.membership.player == player
      errors.add :player, 'is not the czar'
    end
  end

  def pick_is_valid_membership?
    unless pick.game == game && pick != game.membership
      errors.add :id, 'is not a valid membership'
    end
  end

  def all_memberships_have_submitted?
    unanswered_memberships = game.memberships
      .where.not(id: game.answer_orderings.submissions.select(:membership_id))
      .where.not(id: membership.id)
    unless unanswered_memberships.none?
      errors.add :base, 'cannot pick unless all members have submitted'
    end
  end

  def draw_answer membership
    if ordering = game.answer_orderings.draw.lock.first
      ordering.update!(pile: 'hand', membership: membership)
    else
      game.answer_orderings.discard.update_all(pile: 'draw')
      draw_answer membership
    end
  end

  def random_position
    rand(-2147483648..2147483647)
  end

end
