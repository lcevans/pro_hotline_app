ProHotlineApp::Application.routes.draw do

  root :to => "users#show"
  
  resources :users, :only => [:create, :new, :show] do
  	resources :questions, :only => [:new]
  end
  resources :questions, :only => [:create, :index, :show]

  resource :session, :only => [:create, :destroy, :new]

end
