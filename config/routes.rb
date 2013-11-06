ProHotlineApp::Application.routes.draw do

  root :to => "questions#index"

  resource :session, :only => [:create, :destroy, :new]
  
  resources :users, :only => [:create, :new, :show] do
  	resources :questions, :only => [:new]
  end
  resources :questions, :only => [:create, :index, :show, :destroy, :edit, :update] do
  	resources :answers, :only => [:new, :create, :index]
  end

  resources :answers, :only => [:edit, :update, :destroy]

end
