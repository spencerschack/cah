# == Schema Information
#
# Table name: answer_orderings
#
#  id            :integer          not null, primary key
#  answer_id     :integer          not null
#  game_id       :integer          not null
#  position      :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  pile          :enum
#  membership_id :integer
#

class AnswerOrdering < ApplicationRecord

  include Ordering

  module Extensions
    include Ordering::Extensions
    def draw! membership
      top_or_shuffle!.draw!(membership)
    end
  end

  belongs_to :answer
  belongs_to :game
  belongs_to :membership

  validates :answer, :game, presence: true

  validate :pile_or_membership?

  def draw! membership
    update!(pile: nil, membership: membership)
    self
  end

  def discard!
    reposition.update!(pile: 'discard', membership: nil)
    self
  end

  private

  def pile_or_membership?
    unless membership_id? != pile?
      errors.add(:base, 'must set either pile or membership_id')
    end
  end

end
