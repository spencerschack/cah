# == Schema Information
#
# Table name: question_orderings
#
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  game_id     :integer          not null
#  position    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  pile        :enum             not null
#

require 'test_helper'

class QuestionOrderingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
