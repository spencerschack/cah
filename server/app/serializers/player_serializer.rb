class PlayerSerializer < ApplicationSerializer
  attributes :id, :name
  has_many :games
end
