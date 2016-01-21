class MembershipSerializer < ActiveModel::Serializer

  attributes :id, :score
  belongs_to :player
  belongs_to :game
  belongs_to :first_answer
  belongs_to :second_answer
  belongs_to :third_answer
  has_many :answers

end
