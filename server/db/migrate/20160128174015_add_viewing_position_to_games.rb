class AddViewingPositionToGames < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :viewing_position, :integer, default: 0, null: false
  end
end
