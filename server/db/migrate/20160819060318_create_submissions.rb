class CreateSubmissions < ActiveRecord::Migration[5.0]
  def change
    create_table :submissions do |t|
      t.references :round, null: false, index: true, foreign_key: true
      t.references :answer_ordering, null: false, index: true, foreign_key: true
      t.references :submitter, null: false, index: true, foreign_key: { to_table: :memberships }

      t.index [:round_id, :answer_ordering_id], unique: true

      t.timestamps
    end
  end
end
