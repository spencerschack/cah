class AddPlayerIdToAnswerOrderings < ActiveRecord::Migration[5.0]
  def change
    add_reference :answer_orderings, :membership, foreign_key: true, index: true
  end
end
