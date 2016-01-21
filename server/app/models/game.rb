class Game < ApplicationRecord

  FULL_INCLUDES = [:answers, :question,
    memberships: [:player, :first_answer, :second_answer, :third_answer]]

  belongs_to :membership
  has_many :memberships, -> { order(:id) }
  has_many :players, through: :memberships
  has_many :question_orderings, -> { order(:position) }
  has_many :answer_orderings, -> { order(:position) }
  has_many :questions, through: :question_orderings
  has_many :answers, through: :answer_orderings

  after_create :populate_piles

  def question
    question_orderings.draw.first.question
  end

  def populate_piles
    QuestionOrdering.populate(self)
    AnswerOrdering.populate(self)
  end

end
