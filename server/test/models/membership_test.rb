# == Schema Information
#
# Table name: memberships
#
#  id              :integer          not null, primary key
#  player_id       :integer          not null
#  game_id         :integer          not null
#  score           :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  acknowledged_id :integer
#

require 'test_helper'

class MembershipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
