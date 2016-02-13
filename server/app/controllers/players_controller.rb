class PlayersController < ApplicationController

  def index
    render json: [current_player]
  end

  def create
    player = Player.new player_params
    if player.save!
      cookies.permanent.signed[:player_id] = player.id
    end
    render json: player
  end

  private

  def player_params
    params.require(:player).permit(:name)
  end
  
end
