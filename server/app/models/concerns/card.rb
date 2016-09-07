module Card

  def self.included base
    base.validates :text, presence: true
  end

  module Extensions

    def populate!
      game = proxy_association.owner
      card = proxy_association.reflection
      ordering = Game.reflect_on_association(card.options[:through])
      ApplicationRecord.connection.execute <<-SQL.squish!
        INSERT INTO #{ordering.table_name}
          (game_id, #{card.foreign_key}, position, pile, created_at, updated_at)
        SELECT #{game.id}, id, random_position(), 'draw', NOW(), NOW()
        FROM #{card.table_name}
      SQL
    end

  end

end