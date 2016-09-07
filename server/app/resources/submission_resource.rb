class SubmissionResource < ApplicationResource

  immutable

  has_one :round
  has_one :answer_ordering
  has_one :submitter

  update_fields []

  after_create :notify!

  def submitter_id= value
    forbidden! unless Membership.find_by(id: value)&.player == current_player
    @model.submitter_id = value
  end

  private

  def notify!
    GameChannel.broacast_json @model.round.game, @model
  end

end
