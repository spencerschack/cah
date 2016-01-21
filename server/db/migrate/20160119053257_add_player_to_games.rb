class AddPlayerToGames < ActiveRecord::Migration[5.0]
  def change
    add_reference :games, :membership, index: true, foreign_key: true
  end
end
