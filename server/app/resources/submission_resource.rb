class SubmissionResource < ApplicationResource

  immutable

  has_one :round
  has_one :answer_ordering
  has_one :submitter

  update_fields []

  after_create :notify!

  authenticate :current_player, on: :create

  validate :answer_ordering do |answer_ordering|
    answer_ordering.membership.player == current_player
  end

  validate :submitter do |submitter|
    submitter.player == current_player
  end

  private

  def notify!
    GameChannel.broadcast_json @model.round.game, @model
  end

end
