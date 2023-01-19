class Tweet < ApplicationRecord
  belongs_to :user
  validates :content, presence: true
  validates :content, length: {maximum: 255}, allow_blank: false
  cattr_accessor :current_user
  scope :ordered, -> { order(created_at: :desc) }

  def is_owner
    current_user == user
  end

  def user_attributes
    user.attributes
  end
end
