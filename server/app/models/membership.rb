# == Schema Information
#
# Table name: memberships
#
#  id              :integer          not null, primary key
#  player_id       :integer          not null
#  game_id         :integer          not null
#  score           :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  acknowledged_id :integer
#

class Membership < ApplicationRecord

  belongs_to :player
  belongs_to :game
  has_many :answer_orderings, dependent: :destroy
  has_many :answers, through: :answer_orderings

  def score
    game.rounds.where(winner: self).count
  end

  def draw!
    draw = 10 + game.draw - answer_orderings.count
    draw.times { game.answer_orderings.draw!(self) }
  end

end
