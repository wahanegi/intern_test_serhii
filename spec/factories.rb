FactoryBot.define do
  factory(:user) do
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 6, max_length: 128) }
  end

  factory(:tweet) do
    content { Faker::Hobby.activity }
    user
  end
end
