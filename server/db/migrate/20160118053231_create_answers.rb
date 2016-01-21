class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.text :text, null: false, index: {unique: true}

      t.timestamps
    end
  end
end
