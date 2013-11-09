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

  	resources :answers, :only => [:new, :index]
    resources :comments, :only => [:new]
  end

  resources :answers, :only => [:create, :edit, :update, :destroy] do
    post "/upvote", :to => "answers#upvote", :as => "upvote"
    post "/downvote", :to => "answers#downvote", :as => "downvote"
    resources :comments, :only => [:new]
  end

  resources :comments, :only => [:create, :edit, :update, :destroy] do
    post "/upvote", :to => "comments#upvote", :as => "upvote"
    post "/downvote", :to => "comments#downvote", :as => "downvote"
  end

  resources :votes, :only => [:create, :destroy]

end
