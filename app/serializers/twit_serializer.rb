class TwitSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :text, :user_id
end