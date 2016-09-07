module FieldRestrictableResource

  private

  def update_fields fields
    define_singleton_method(:updatable_fields) { |context| fields }
  end

  def create_fields fields
    define_singleton_method(:creatable_fields) { |context| fields }
  end

end
