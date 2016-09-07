class CreateRounds < ActiveRecord::Migration[5.0]
  def change
    create_table :rounds do |t|
      t.references :game, null: false, index: true, foreign_key: true
      t.references :czar, null: false, index: true, foreign_key: { to_table: :memberships }
      t.references :question, null: false, index: true, foreign_key: true
      t.references :winner, index: true, foreign_key: { to_table: :memberships }

      t.timestamps
    end
  end
end
