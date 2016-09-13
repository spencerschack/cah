class ApplicationResource < JSONAPI::Resource

  extend FieldRestrictableResource
  extend AuthenticatableResource
  extend ValidatableResource

  abstract

  def self.serialize_to_hash model, options={}
    resource = resource_for_model(model)
    serializer = ApplicationResourceSerializer.new(resource, options)
    serializer.serialize_to_hash(resource.new(model, nil))
  end

  def current_player
    context[:current_player]
  end

end
