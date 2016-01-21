class AddPileEnum < ActiveRecord::Migration[5.0]
  def up
    execute "CREATE TYPE pile AS ENUM ('draw', 'discard')"
  end
  def down
    execute "DROP TYPE pile"
  end
end
