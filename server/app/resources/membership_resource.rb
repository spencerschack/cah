class MembershipResource < ApplicationResource

  has_one :player
  has_one :game
  has_many :answer_orderings

  create_fields [:player, :game]
  update_fields []

  after_create :draw!
  after_create :notify!

  validate :player do |player|
    player == current_player
  end

  private

  def draw!
    @model.draw!
  end

  def notify!
    GameChannel.broadcast_json @model.game, @model,
      include: %w(
        player
        answer_orderings
        answer_orderings.answer)
  end

end
