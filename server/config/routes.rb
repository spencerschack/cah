Rails.application.routes.draw do

  resources :games, only: [:create, :update, :show]
  resources :rounds, only: :update
  resources :memberships, only: [:create, :update]
  resources :submissions, only: :create
  resources :players, only: [:create, :show]

  mount ActionCable.server => '/cable'

  get '*path' => 'static#ember'
  root to: 'static#ember'
  
end
