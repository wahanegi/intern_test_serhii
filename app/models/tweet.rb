class Tweet < ApplicationRecord
  belongs_to :user
  validates :content, presence: true
  cattr_accessor :current_user

  def is_owner
    current_user == user
  end

  def user_attributes
    user.attributes
  end
end
