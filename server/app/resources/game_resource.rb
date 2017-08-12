class GameResource < ApplicationResource

  attributes :viewing_position, :created_at

  has_many :memberships
  has_many :rounds
  has_one :current_round

  create_fields []
  update_fields [:viewing_position]

  after_create :add_current_player!

  after_update :notify!

  authenticate :current_player?, on: :create

  def self.records options = {}
    if player = options[:context][:current_player]
      player.games
    end
  end

  private

  def current_player?
    current_player
  end

  def add_current_player!
    membership = @model.memberships.create!(player: current_player)
    @model.rounds.create!
    membership.draw!
  end

  def notify!
    GameChannel.broadcast_json @model, @model
  end

end
