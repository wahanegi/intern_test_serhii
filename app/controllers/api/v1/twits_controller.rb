class Api::V1::TwitsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_twit, only: [:show, :edit, :destroy, :update]
  before_action :authenticate_user!, except: [:index, :show]

  def index
    if user_signed_in?
      @twits = Twit.all
      respond_to do |format|
        format.json do
          render json: TwitSerializer.new(@twits).serialized_json
        end
      end

    else
      render json: {}, status: 401
    end
  end

  def show
    render json: TwitSerializer.new(@twit).serialized_json
  end

  def edit
  end

  def create
    @twit = current_user.twits.build(twit_params)

    if @twit.save
      render json: TwitSerializer.new(@twit).serialized_json
    else
      render json: {error: @twit.errors }, status: 422
    end
  end

  def update
    if @twit.update(twit_params)
      render json: TwitSerializer.new(@twit).serialized_json
    else
      render json: {error: @twit.errors }, status: 422
    end
  end

  def destroy
    if @twit.destroy
      head :no_content, notice: "Twit was successfully destroyed."
    else
      render json: {error: @twit.errors }, status: 422
    end
  end

  private

  def set_twit
    @twit = Twit.find(params[:id])
  end
  def twit_params
    params.require(:twit).permit(:text, :user_id)
  end
end
