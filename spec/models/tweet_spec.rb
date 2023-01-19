require 'rails_helper'

RSpec.describe Tweet, :type => :model do
  let!(:tweet) { create :tweet }
  let!(:tweet2) { create :tweet, content: tweet.content }
  let(:user) { tweet.user }

  context 'Relationships' do
    it { expect(subject).to belong_to(:user) }
  end

  context 'Validation' do
    it "is not valid without a content" do
      tweet.content = nil
      expect(tweet).to_not be_valid
    end

    it "is not valid with a empty content" do
      tweet.content = ''
      expect(tweet).to_not be_valid
    end

    it "is valid with a content" do
      expect(tweet).to be_valid
    end
  end
end
