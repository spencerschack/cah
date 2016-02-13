class Membership < ApplicationRecord

  belongs_to :player
  belongs_to :first_answer, class_name: 'Answer'
  belongs_to :second_answer, class_name: 'Answer'
  belongs_to :third_answer, class_name: 'Answer'
  belongs_to :game
  has_many :answer_memberships
  has_many :answers, through: :answer_memberships

  after_create :draw_up!

  def current?
    game.membership == self
  end

  def draw_up!
    to_draw = game.question.draw + 10 - answers.count
    answers << to_draw.times.map{ game.answer_orderings.pull }
  end

  def unanswer!
    update!(first_answer: nil, second_answer: nil, third_answer: nil)
  end

end
