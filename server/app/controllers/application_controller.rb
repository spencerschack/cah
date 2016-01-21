class ApplicationController < ActionController::API

  self._serialization_scope = :current_player

  def self.helper_method(*); end

  include ActionController::Cookies

  def current_player
    return @current_player if defined? @current_player
    id = cookies.signed[:player_id]
    @current_player = id ? Player.find_by(id: id) : nil
  end

end
