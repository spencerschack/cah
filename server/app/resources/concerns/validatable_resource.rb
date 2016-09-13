module ValidatableResource

  def validate relationship
    relationship = _relationship(relationship)
    primary_key = relationship.primary_key
    resource_klass = relationship.resource_klass
    define_method :"#{primary_key}=" do |value|
      record = resource_klass.records.find_by(primary_key => value)
      forbidden! unless record && yield(record)
      @model.send(:"#{primary_key}=", value)
    end
  end

end
