class AddPickToQuestions < ActiveRecord::Migration[5.0]
  def change
    add_column :questions, :pick, :integer, null: false, default: 1
  end
end
