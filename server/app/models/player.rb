# == Schema Information
#
# Table name: players
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Player < ApplicationRecord

  has_many :memberships
  has_many :games, through: :memberships

  validates :name, presence: true

  ALGORITHM = 'HS512'
  SECRET = Rails.application.secrets.secret_key_base

  def self.find_by_token! token
    payload, header = JWT.decode(token, SECRET, true, { algorithm: ALGORITHM })
    find(payload['id'])
  rescue JWT::DecodeError
    raise PlayerNotFoundByToken.new(token)
  end

  def token
    return unless persisted?
    JWT.encode({ id: id }, SECRET, ALGORITHM)
  end

  class PlayerNotFoundByToken < ActiveRecord::RecordNotFound
    def initialize token
      name = Player.name
      super("Couldn't find #{name} for token '#{token}'", name)
    end
  end

end
