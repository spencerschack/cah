class RoundResource < ApplicationResource

  has_one :question
  has_one :game
  has_one :czar
  has_one :winner
  has_many :submissions

  create_fields []
  update_fields [:winner]

  authenticate :is_czar?, on: :update
  authenticate :winner_not_chosen?, on: :update

  after_update :notify!

  private

  def is_czar?
    @model.czar.player == current_player
  end

  def winner_not_chosen?
    !@model.winner_id
  end

  def notify!
    RoundNotifier.new(@model).notify!
  end

end
