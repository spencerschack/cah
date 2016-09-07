class MembershipResource < ApplicationResource

  attributes :score

  has_one :player
  has_one :game
  has_many :answer_orderings

  create_fields [:player, :game]
  update_fields []

  after_create :draw!
  after_create :notify!

  def player_id= value
    forbidden! if value != current_player.id
    @model.player_id = value
  end

  private

  def draw!
    @model.draw!
  end

  def notify!
    GameChannel.broadcast_json @model.game, @model, @model.player
  end

end
