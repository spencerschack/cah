class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.string :name, null: false
      t.string :token, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
