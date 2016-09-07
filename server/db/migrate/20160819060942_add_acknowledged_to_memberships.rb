class AddAcknowledgedToMemberships < ActiveRecord::Migration[5.0]
  def change
    add_column :memberships, :acknowledged, :boolean, null: false, default: false
  end
end
