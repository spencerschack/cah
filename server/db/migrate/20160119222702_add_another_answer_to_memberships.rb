class AddAnotherAnswerToMemberships < ActiveRecord::Migration[5.0]
  def change
    rename_column :memberships, :answer_id, :first_answer_id
    add_reference :memberships, :second_answer, index: true
    add_foreign_key :memberships, :answers, column: :second_answer_id
  end
end
