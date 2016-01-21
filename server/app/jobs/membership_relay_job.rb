class MembershipRelayJob < ApplicationJob

  queue_as :default

  def perform membership
    GameChannel.membership_created(membership)
  end
  
end
