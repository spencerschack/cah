class AnswerOrdering < ApplicationRecord

  include Ordering

  belongs_to :answer
  belongs_to :game

  def self.pull
    next_with_lock do |ordering|
      answer = ordering.answer
      ordering.destroy
      answer
    end
  end

end
