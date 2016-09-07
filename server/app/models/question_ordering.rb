# == Schema Information
#
# Table name: question_orderings
#
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  game_id     :integer          not null
#  position    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  pile        :enum             not null
#

class QuestionOrdering < ApplicationRecord

  include Ordering

  module Extensions
    include Ordering::Extensions
    def draw!
      top_or_shuffle!.discard!
    end
  end

  belongs_to :question
  belongs_to :game

  validates :question, :game, presence: true

  def discard!
    update!(pile: 'discard')
    self
  end

end
