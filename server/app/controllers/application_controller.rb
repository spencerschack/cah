class ApplicationController < JSONAPI::ResourceControllerMetal

  include ActionController::HttpAuthentication::Token::ControllerMethods

  private

  def resource_serializer_klass
    ApplicationResourceSerializer
  end

  def context
    { current_player: current_player }
  end

  def current_player
    @current_player ||= authenticate_with_http_token do |token, options|
      Player.find_by_token!(token)
    end
  end

end
