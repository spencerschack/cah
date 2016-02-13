class ApplicationController < ActionController::API

  self._serialization_scope = :current_player

  def self.helper_method(*); end

  include ActionController::Cookies

  def ember
    send_file Rails.root.join('public', 'index.html'),
      type: 'text/html; charset=utf-8'
  end

  def current_player
    return @current_player if defined? @current_player
    id = cookies.signed[:player_id]
    @current_player = id ? Player.find_by(id: id) : nil
  end

end
