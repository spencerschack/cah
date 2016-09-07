class GameService

  include ActiveModel::Validations

  def self.run **args
    runner = new(**args)
    if runner.valid?
      result = runner.run
      if result
        runner.update
        result
      end
    end
  end

  def initialize **args
    args.each do |key, value|
      instance_variable_set "@#{key}", value
    end
  end

  def run
    
  end

  def update
    
  end

end
