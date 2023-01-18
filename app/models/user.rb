class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :tweets, dependent: :destroy
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
end
