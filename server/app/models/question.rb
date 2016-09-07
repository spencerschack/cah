# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  text       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  pick       :integer          default(1), not null
#

class Question < ApplicationRecord

  include Card

  validates :pick, numericality: { only_integer: true, greater_than: 0 }

end
