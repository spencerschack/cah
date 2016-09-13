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

  def render_results(operation_results)
    response_doc = create_response_document(operation_results)

    render_options = {
      status: response_doc.status,
      json:   response_doc.contents,
      content_type: JSONAPI::MEDIA_TYPE
    }

    render(render_options)
  end

end
