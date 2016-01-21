class CreateAnswerMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :answer_memberships do |t|
      t.references :answer, index: true, foreign_key: true, null: false
      t.references :membership, index: true, foreign_key: true, null: false

      t.timestamps
    end
  end
end
