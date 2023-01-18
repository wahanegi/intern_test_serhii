class Api::V1::TweetsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_tweet, only: [:destroy, :update]
  before_action :set_current_user
  before_action :authenticate_user!, except: [:index]

  def index
    if user_signed_in?
      @tweets = Tweet.all
      respond_to do |format|
        format.json do
          render json: TweetSerializer.new(@tweets).serialized_json
        end
      end

    else
      render json: {}, status: 401
    end
  end

  def create
    @tweet = current_user.tweets.build(tweet_params)

    if @tweet.save
      render json: TweetSerializer.new(@tweet).serialized_json
    else
      render json: {error: @tweet.errors }, status: 422
    end
  end

  def update
    return head :forbidden if current_user != @tweet.user

    if @tweet.update(tweet_params)
      render json: TweetSerializer.new(@tweet).serialized_json
    else
      render json: {error: @tweet.errors }, status: 422
    end
  end

  def destroy
    return head :forbidden if current_user != @tweet.user

    if @tweet.destroy
      head :no_content, notice: "Tweet was successfully destroyed."
    else
      render json: {error: @tweet.errors }, status: 422
    end
  end

  private

  def set_tweet
    @tweet = Tweet.find(params[:id])
  end
  def tweet_params
    params.require(:tweet).permit(:content, :user_id)
  end

  def set_current_user
    Tweet.current_user = current_user
  end
end
