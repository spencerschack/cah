# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
module ApplicationCable
  class Channel < ActionCable::Channel::Base

    delegate :serialize, to: :class

    def self.broadcast_json target, records, **options
      broadcast_to target, serialize(records, **options)
    end

    def transmit_json records, **options
      transmit serialize(records, **options)
    end

    private

    def self.serialize records, **options
      Array.wrap(records).map do |record|
        ApplicationResource.serialize_to_hash(record, options)
      end
    end

  end
end
