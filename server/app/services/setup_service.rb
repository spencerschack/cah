class SetupService < GameService

  attr_reader :game, :player

  validates :player, presence: true

  def run
    @game = Game.create!
    populate(:questions)
    populate(:answers)
    membership = game.memberships.create!(player: player)
    game.update!(membership: membership)
    game
  end

  private

  def populate name
    card = Game.reflect_on_association(name)
    ordering = Game.reflect_on_association(card.options[:through])
    Game.connection.execute <<-SQL
      INSERT INTO #{ordering.table_name}
        (game_id, #{card.foreign_key}, position, pile, created_at, updated_at)
      SELECT #{game.id}, id, random_position(), 'draw', NOW(), NOW()
      FROM #{card.table_name}
    SQL
  end

end
