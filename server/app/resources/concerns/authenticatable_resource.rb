module AuthenticatableResource

  module AuthenticatableMethods
    def forbidden!
      fail ForbiddenError
    end
  end

  include AuthenticatableMethods

  def self.extended base
    base.include AuthenticatableMethods
  end

  private

  def authenticate method, on:
    send(:"before_#{on}") { forbidden! unless send(method) }
  end

  class ForbiddenError < JSONAPI::Exceptions::Error
    def errors
      [JSONAPI::Error.new(code: JSONAPI::FORBIDDEN, status: :forbidden)]
    end
  end

end
