class CreateMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :memberships do |t|
      t.references :player, index: true, foreign_key: true, null: false
      t.references :game, index: true, foreign_key: true, null: false

      t.timestamps
    end
    add_index :memberships, [:player_id, :game_id], unique: true
  end
end
