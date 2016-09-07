# == Schema Information
#
# Table name: submissions
#
#  id                 :integer          not null, primary key
#  round_id           :integer          not null
#  answer_ordering_id :integer          not null
#  submitter_id       :integer          not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'test_helper'

class SubmissionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
