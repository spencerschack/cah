Rails.application.routes.draw do

  resources :games, only: [:index, :create, :show]

  resources :players, only: [:index, :create]

  resources :memberships, only: :create

  mount ActionCable.server => '/cable'

  mount_ember_app :client, to: '/'
  
end
