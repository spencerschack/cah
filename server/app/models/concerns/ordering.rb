module Ordering

  def self.included base
    base.enum pile: {draw: 'draw', discard: 'discard'}
    base.validates :position, numericality: { only_integer: true }
  end

  def reposition
    self.position = rand(-2147483648..2147483647)
    self
  end

  module Extensions

    def top
      where(pile: 'draw').order(:position).first
    end

    def shuffle!
      update_all!(pile: 'draw')
    end

    def top_or_shuffle!
      top || shuffle! && top
    end

  end

end
