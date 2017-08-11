class DropTokenFromPlayers < ActiveRecord::Migration[5.0]
  def change
    remove_column :players, :token
  end
end
