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

class Round < ApplicationRecord

  belongs_to :game
  belongs_to :czar, class_name: 'Membership'
  belongs_to :question
  belongs_to :winner, class_name: 'Membership'
  has_many :submissions
  has_many :answer_orderings, through: :submissions

  validates :game, :czar, :question, presence: true
  validates :winner, absence: true, on: :create
  validates :winner, inclusion: { in: :submitters }, on: :update
  validate :winner_not_chosen?, on: :update

  before_validation :begin!, on: :create
  after_update :end!, if: :winner_changed?

  def submitters
    game.memberships.where.not(id: czar)
  end

  private

  def winner_not_chosen?
    unless winner_id_was.nil?
      errors.add(:base, 'cannot be updated after winner has been chosen')
    end
  end

  def begin!
    self.czar = game.next_czar
    self.question = game.question_orderings.draw!.question
    submitters.each(&:draw!)
  end

  def end!
    answer_orderings.each(&:discard!)
    game.rounds.create!
  end

end
