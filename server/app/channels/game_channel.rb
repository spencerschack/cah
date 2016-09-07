# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel

  def subscribed
    stream_for Game.find(params[:id])
  end
  
end
