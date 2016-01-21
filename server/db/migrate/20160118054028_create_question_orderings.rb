class CreateQuestionOrderings < ActiveRecord::Migration[5.0]
  def change
    create_table :question_orderings do |t|
      t.references :question, index: true, foreign_key: true, null: false
      t.references :game, index: true, foreign_key: true, null: false
      t.integer :position, index: true, null: false

      t.timestamps
    end
    add_column :question_orderings, :pile, :pile, index: true, null: false
    add_index :question_orderings, [:question_id, :game_id], unique: true
  end
end
