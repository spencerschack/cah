# == Schema Information
#
# Table name: rounds
#
#  id          :integer          not null, primary key
#  game_id     :integer          not null
#  czar_id     :integer          not null
#  question_id :integer          not null
#  winner_id   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class RoundTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
