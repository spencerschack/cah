class MembershipsController < ApplicationController

  def create
    membership = Membership.new membership_params
    membership.save!
    MembershipRelayJob.perform_later(membership)
    render json: membership, include: 'game.memberships.player,game.answers,game.question'
  end

  private

  def membership_params
    params.require(:membership).permit(:game_id, :player_id)
  end

end
