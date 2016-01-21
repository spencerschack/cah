class GameSerializer < ApplicationSerializer

  attributes :id
  has_many :memberships
  has_many :answers
  has_one :question
  has_one :membership

  def associations
    current_player ? super : super.select{|a| a.name != :answers }
  end

  def answers
    if current_player
      object.memberships.find_by(player: current_player).try(:answers)
    end
  end

end
