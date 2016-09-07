class PlayerResource < ApplicationResource

  immutable

  attributes :name, :token

  has_many :memberships
  has_many :games

  create_fields [:name]
  update_fields []

  authenticate :no_current_player?, on: :create

  def self.find_by_key key, options = {}
    current_player = options[:context][:current_player]
    forbidden! unless current_player && key == 'current'
    resource_for_model(current_player).new(current_player, options[:context])
  end

  def self.verify_key key, context = nil
    key == 'current' && key || super
  end

  def fetchable_fields
    [:name].tap do |fields|
      fields << :token if @model.previous_changes[:id]
    end
  end

  private

  def no_current_player?
    !current_player
  end

end
