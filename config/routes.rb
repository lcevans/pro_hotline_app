ProHotlineApp::Application.routes.draw do

  root :to => "questions#index"
  
  resources :users, :only => [:create, :new, :show] do
  	resources :questions, :only => [:new]
  end
  resources :questions, :only => [:create, :index, :show, :destroy, :edit, :update]

  resource :session, :only => [:create, :destroy, :new]

end
