class QuestionOrdering < ApplicationRecord

  include Ordering

  belongs_to :question
  belongs_to :game

  def self.pull
    next_with_lock do |ordering|
      question = ordering.question
      ordering.update!(pile: 'discard')
      ordering.reposition!
      question
    end
  end

end
