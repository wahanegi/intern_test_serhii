class TweetSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :content, :is_owner, :user_attributes, :created_at

  belongs_to :user
end