class CreateFunctionRandomPosition < ActiveRecord::Migration[5.0]
  def up
    execute <<-SQL
      CREATE FUNCTION random_position() RETURNS integer AS '
        SELECT (floor(random() * 4294967295) - 2147483648)::int;
      ' LANGUAGE SQL
    SQL
  end
  def down
    execute 'DROP FUNCTION random_position()'
  end
end
