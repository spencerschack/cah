class AddAnswerToMembership < ActiveRecord::Migration[5.0]
  def change
    add_reference :memberships, :answer, index: true, foreign_key: true
  end
end
