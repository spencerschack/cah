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
    answers << (answers.count...10).map{ game.answer_orderings.pull }
  end

end
