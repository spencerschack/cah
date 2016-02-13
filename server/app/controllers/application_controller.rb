class ApplicationController < ActionController::Base

  self._serialization_scope = :current_player

  def current_player
    return @current_player if defined? @current_player
    id = cookies.signed[:player_id]
    @current_player = id ? Player.find_by(id: id) : nil
  end

end
