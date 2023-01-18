Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      resources :twits, param: :id
    end
  end
  get '/', to: 'pages#app'
  root "pages#home"
end
