class GamesController < ApplicationController

  def index
    games = find(params[:ids] || [])
    render json: games, include: 'memberships.player'
  end

  def create
    game = Game.new
    Game.transaction do
      game.save!
      membership = game.memberships.create!(player: current_player)
      game.update!(membership: membership)
    end
    render json: game, include: Game::FULL_INCLUDES
  end

  def show
    game = find(params[:id])
    render json: game, include: Game::FULL_INCLUDES
  end

  private

  def find ids
    Game.includes(:players, :membership).find(ids)
  end

end
