class CreateAnswerOrderings < ActiveRecord::Migration[5.0]
  def change
    create_table :answer_orderings do |t|
      t.references :answer, index: true, foreign_key: true, null: false
      t.references :game, index: true, foreign_key: true, null: false
      t.integer :position, index: true, null: false

      t.timestamps
    end
    add_column :answer_orderings, :pile, :pile, index: true
    add_index :answer_orderings, [:answer_id, :game_id], unique: true
  end
end
