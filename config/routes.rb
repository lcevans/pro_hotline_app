ProHotlineApp::Application.routes.draw do

  root :to => "questions#index"

  resource :session, :only => [:create, :destroy, :new]
  
  resources :users, :only => [:index, :create, :new, :show, :update] do
    post 'add_tag', to: 'users#add_tag', as: :add_tag
    delete 'remove_tag', to: 'users#remove_tag', as: :remove_tag    
  	resources :questions, :only => [:new]
  end

  resources :questions, :only => [:create, :index, :show, :destroy, :edit, :update, :destroy]
  resources :answers, :only => [:create, :update, :destroy]
  resources :comments, :only => [:create, :update, :destroy] 
  resources :votes, :only => [:create, :destroy]

  resources :tags, :only => [:index, :show]

end
