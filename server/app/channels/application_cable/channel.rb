# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
module ApplicationCable
  class Channel < ActionCable::Channel::Base

    private

    def self.broadcast_json channel_model, data_model, options={}
      broadcast_to channel_model, resource_for(data_model, options).as_json
    end

    def transmit_json model, options={}
      transmit resource_for(model, options).as_json
    end

    def resource_for model, options
      resource = self.class.resource_for(model, options)
      resource.serialization_scope = current_player
      resource
    end

    def self.resource_for model, options
      resource = ActiveModel::SerializableResource.new(model, options)
      resource.serialization_scope_name = :current_player
      resource
    end

  end
end
