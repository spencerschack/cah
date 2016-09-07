# == Schema Information
#
# Table name: submissions
#
#  id                 :integer          not null, primary key
#  round_id           :integer          not null
#  answer_ordering_id :integer          not null
#  submitter_id       :integer          not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Submission < ApplicationRecord

  belongs_to :round
  belongs_to :answer_ordering
  belongs_to :submitter, class_name: 'Membership'

  validates :round, :answer_ordering, :submitter, presence: true
  validate :answer_belongs_to_submitter?
  validate :all_in_same_game?
  validate :round_not_ended?
  validate :count_not_more_than_pick?

  private

  def answer_belongs_to_submitter?
    unless answer_ordering.membership == submitter
      errors.add :answer_ordering, 'must belong to submitter'
    end
  end

  def all_in_same_game?
    unless [round, answer_ordering, submitter].map(&:game_id).uniq.length == 1
      errors.add :base, 'not in same game'
    end
  end

  def round_not_ended?
    if round.winner
      errors.add :round, 'has has ended'
    end
  end

  def count_not_more_than_pick?
    submissions_count = submitter.submissions.where(round: round).count + 1
    unless submissions_count > round.game.question.pick
      errors.add :base, 'cannot submit more than allowed'
    end
  end

end
