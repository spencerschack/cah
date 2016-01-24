class QuestionOrdering < ApplicationRecord

  include Ordering

  belongs_to :question
  belongs_to :game

  def self.pull
    next_with_lock do |ordering|
      question = ordering.question
      ordering.reposition.update!(pile: 'discard')
      question
    end
  end

end
