class PositionService < GameService

  attr_reader :game, :position, :player

  validates :game, :player, presence: true
  validates :position, numericality: { only_integer: true, greater_than: 0 }
  validate :player_is_czar?

  def run
    game.update! position: position
  end

  def update
    GameChannel.broadcast_json_to game, game, fields: ['viewing_position']
  end

  private

  def player_is_czar?
    unless game.membership.player == player
      errors.add :player, 'is not the czar'
    end
  end

end
