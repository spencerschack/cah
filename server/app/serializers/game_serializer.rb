class GameSerializer < ApplicationSerializer

  attributes :id, :viewing_position
  has_many :memberships
  has_one :question
  has_one :membership

end
