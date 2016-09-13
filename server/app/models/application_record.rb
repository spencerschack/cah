class ApplicationRecord < ActiveRecord::Base

  self.abstract_class = true
  self.belongs_to_required_by_default = false

  def preload associations
    ActiveRecord::Associations::Preloader.new.preload([self], associations)
    self
  end
  
end
