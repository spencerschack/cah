class MembershipSerializer < ActiveModel::Serializer

  attributes :id, :score
  belongs_to :player
  belongs_to :game
  has_many :answers
  has_many :submissions

  def submissions
    [object.first_answer, object.second_answer, object.third_answer].compact
  end

end
