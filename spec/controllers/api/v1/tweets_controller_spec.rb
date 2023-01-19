require 'rails_helper'
require 'shared_contexts'

RSpec.describe Api::V1::TweetsController, :type => :controller do
  let!(:tweet_attr) { attributes_for :tweet }
  let!(:tweet) {create :tweet }
  let(:user) { tweet.user }
  let(:not_owner_user) { create :user, email: "not_owner@cloverpop.com" }

  before(:each) do |test|
    sign_in(user) unless test.metadata[:logged_out]
  end

  it ':project factory works' do
    expect(tweet).to be_valid
  end

  describe "GET index" do
    it "has a 200 status code with json format" do
      get :index, params: { format: 'json' }
      expect(response.status).to eq(200)
    end
  end

  describe "POST" do
    subject { post :create, params: { tweet: tweet_attr, format: :json } }

    before(:each) do
      subject
    end

    it "responds to json formats when provided in the params" do
      expect(response.media_type).to eq "application/json"
    end

    it "not allow create tweet for non sigh_in user", :logged_out do
      expect([JSON.parse(response.body)]).to eq [{"error" => "You need to sign in or sign up before continuing."}]
      expect { subject }.to change(Tweet, :count).by(0)
    end
  end

  describe "DELETE" do
    subject { delete :destroy, params: { id: tweet.id } }
    it "removes tweet" do
      expect { subject }.to change(Tweet, :count).by(-1)
    end
    it "not allow delete tweets for non sigh_in user", :logged_out do
      expect { subject }.to change(Tweet, :count).by(0)
    end
    it "not allow delete tweets for non owners", :logged_out do
      sign_in(not_owner_user)
      subject
      expect(response.status).to eq(403)
      expect { subject }.to change(Tweet, :count).by(0)
    end
  end
end
