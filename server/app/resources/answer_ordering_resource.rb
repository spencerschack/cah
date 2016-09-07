class AnswerOrderingResource < ApplicationResource

  immutable

  attributes :pile, :answer, :updated_at

  has_one :membership
  has_one :game

  create_fields []
  update_fields []

  def answer
    @model.answer.text
  end

end
