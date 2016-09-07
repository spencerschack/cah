class ApplicationResourceSerializer < JSONAPI::ResourceSerializer

  private

  def links_hash(*)
    {}
  end

  def self_link(*)
    ''
  end

  def related_link(*)
    ''
  end

  def link_object(*)
    super.except!(:links)
  end

end
