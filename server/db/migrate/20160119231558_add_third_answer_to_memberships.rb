class AddThirdAnswerToMemberships < ActiveRecord::Migration[5.0]
  def change
    add_reference :memberships, :third_answer, index: true
    add_foreign_key :memberships, :answers, column: :third_answer_id
  end
end
