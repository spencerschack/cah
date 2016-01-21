ActiveModel::Serializer.config.adapter = Class.new(ActiveModel::Serializer::Adapter::JsonApi) do
  def included_for(*)
    super.compact
  end
end
