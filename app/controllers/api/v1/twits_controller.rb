class Api::V1::TwitsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_project, only: [:show, :edit, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  def index
    if user_signed_in?
      respond_to do |format|
        format.json do
          render json: TwitSerializer.new(current_user.twits).serialized_json
        end
      end

    else
      render json: {}, status: 401
    end
  end

  private

  def set_twit
    @project = Twit.find(params[:id])
  end
  def project_params
    params.require(:twit).permit(:text, :user_id)
  end
end
