class AnswerOrderingResource < ApplicationResource

  immutable

  attributes :pile, :updated_at

  has_one :answer
  has_one :membership
  has_one :game

  create_fields []
  update_fields []

end
