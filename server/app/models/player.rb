class Player < ApplicationRecord

  has_many :memberships
  has_many :games, through: :memberships

end
