class TweetSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :content, :is_owner, :user_attributes

  belongs_to :user
end