class AnswerMembership < ApplicationRecord
  belongs_to :answer
  belongs_to :membership
end
