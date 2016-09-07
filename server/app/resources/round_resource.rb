class RoundResource < ApplicationResource

  attributes :question, :pick

  has_one :game
  has_one :czar
  has_one :winner
  has_many :submissions

  create_fields []
  update_fields [:winner]

  authenticate :is_czar?, on: :update

  after_update :notify!

  def question
    @model.question.text
  end

  def pick
    @model.question.pick
  end

  private

  def is_czar?
    @model.czar.player == current_player
  end

  def notify!
    GameChannel.broadcast_json(@model.game,
      @model, @model.answer_orderings, @model.game.current_round)
  end

end
