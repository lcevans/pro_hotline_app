ProHotlineApp::Application.routes.draw do

  root :to => "questions#index"

  resource :session, :only => [:create, :destroy, :new]
  
  resources :users, :only => [:create, :new, :show] do
  	resources :questions, :only => [:new]
  end

  resources :questions, :only => [:create, :index, :show, :destroy, :edit, :update]
  resources :answers, :only => [:create, :update, :destroy]
  resources :comments, :only => [:create, :update, :destroy] 
  resources :votes, :only => [:create, :destroy]

end
