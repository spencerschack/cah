class GameResource < ApplicationResource

  attributes :viewing_position

  has_many :memberships
  has_many :rounds

  create_fields []
  update_fields [:viewing_position]

  after_create :add_current_player!

  authenticate :current_player?, on: :create

  private

  def current_player?
    current_player
  end

  def add_current_player!
    @model.memberships.create!(player: current_player)
    @model.rounds.create!
  end

end
