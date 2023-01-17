Rails.application.routes.draw do
  devise_for :users
  # devise_scope :user do
  #   authenticated :user do
  #     get '/', to: 'pages#app'
  #     get '/*undefined', to: redirect('/')
  #   end
  #   unauthenticated do
  #     get '*path', to: 'pages#home', via: :all
  #   end
  # end
  namespace :api do
    namespace :v1 do
      resources :twits, param: :id
    end
  end
  get '/', to: 'pages#app'
  root "pages#home"
end
