class TweetsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "tweets_channel"
  end

  def unsubscribed; end
end
