# == Schema Information
#
# Table name: answer_orderings
#
#  id            :integer          not null, primary key
#  answer_id     :integer          not null
#  game_id       :integer          not null
#  position      :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  pile          :enum
#  membership_id :integer
#

require 'test_helper'

class AnswerOrderingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
