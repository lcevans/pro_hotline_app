ProHotlineApp::Application.routes.draw do

  root :to => "questions#index"

  resource :session, :only => [:create, :destroy, :new]
  
  resources :users, :only => [:create, :new, :show] do
  	resources :questions, :only => [:new]
  end

  resources :questions, :only => [:create, :index, :show, :destroy, :edit, :update] do
  	post "/markanswer/:answer_id", :to => "questions#mark_best_answer", :as => "mark_answer"
    post "/upvote", :to => "questions#upvote", :as => "upvote"
    post "/downvote", :to => "questions#downvote", :as => "downvote"

  	resources :answers, :only => [:new, :create, :index]
    resources :comments, :only => [:new, :create]
  end

  resources :answers, :only => [:edit, :update, :destroy] do
    post "/upvote", :to => "answers#upvote", :as => "upvote"
    post "/downvote", :to => "answers#downvote", :as => "downvote"
    resources :comments, :only => [:new, :create]
  end

  resources :comments, :only => [:edit, :update, :destroy] do
    post "/upvote", :to => "comments#upvote", :as => "upvote"
    post "/downvote", :to => "comments#downvote", :as => "downvote"
  end

end
