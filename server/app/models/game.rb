# == Schema Information
#
# Table name: games
#
#  id               :integer          not null, primary key
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  viewing_position :integer          default(0), not null
#

class Game < ApplicationRecord

  delegate :czar, :question, to: :current_round

  has_many :memberships, dependent: :destroy
  has_many :players, through: :memberships
  has_many :question_orderings,
    -> { extending QuestionOrdering::Extensions }, dependent: :destroy
  has_many :answer_orderings,
    -> { extending AnswerOrdering::Extensions }, dependent: :destroy
  has_many :questions,
    -> { extending Question::Extensions }, through: :question_orderings
  has_many :answers,
    -> { extending Answer::Extensions }, through: :answer_orderings
  has_many :rounds, dependent: :destroy

  after_create { questions.populate! }
  after_create { answers.populate! }

  def current_round
    rounds.order(created_at: :desc).first
  end

  def draw
    [question.pick - 1, 0].max
  end

  def next_czar
    if current_round && czar
      memberships.where('created_at > ?', czar.created_at).first
    end || memberships.order(created_at: :asc).first
  end

end
