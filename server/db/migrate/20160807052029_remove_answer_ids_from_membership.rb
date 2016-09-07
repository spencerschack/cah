class RemoveAnswerIdsFromMembership < ActiveRecord::Migration[5.0]
  def change
    remove_column :memberships, :first_answer_id
    remove_column :memberships, :second_answer_id
    remove_column :memberships, :third_answer_id
  end
end
