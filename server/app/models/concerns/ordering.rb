module Ordering

  extend ActiveSupport::Concern

  included do
    enum pile: {draw: 'draw', discard: 'discard'}
  end

  def reposition!
    self.class.reposition id
  end

  class_methods do

    def next_with_lock
      transaction do
        ordering = draw.lock.first
        unless ordering
          update_all(pile: 'draw')
          ordering = draw.lock.first
        end
        yield ordering
      end
    end

    def reposition id
      connection.execute <<-SQL
        UPDATE #{table_name}
        SET position = random_position()
        WHERE id = #{id}
      SQL
    end

    def draw
      where(pile: 'draw')
    end

    def discard
      where(pile: 'discard')
    end

    def populate game
      ordered_model = name.sub(/Ordering$/, '').constantize
      ordered_name = ordered_model.model_name.singular + '_id'
      connection.execute <<-SQL
        INSERT INTO #{table_name} (game_id, #{ordered_name}, position, pile, created_at, updated_at)
        SELECT #{game.id}, id, random_position(), 'draw', NOW(), NOW()
        FROM #{ordered_model.table_name}
      SQL
    end

    private

    def random_position
      rand(-2147483648..2147483647)
    end

  end

end
