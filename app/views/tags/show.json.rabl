object @tag

attributes :id, :name

node :userIds do |t| 
  t.user_ids
end


child :questions => :questions do 

  attributes :id, :title, :body, :author_id, :best_answer_id, :created_at

  node :viewCount do |q| 
    q.views.count
  end

  child :author => :author do
  	attributes :id, :username
  end

  child :tags => :tags do
  	attributes :id, :name
  end

  child :votes do
  	attributes :id, :user_id, :votable_id, :votable_type, :vote_type
  end

  child :comments do
  	attributes :id, :author_id, :body, :commentable_id, :commentable_type

  	child :author => :author do
      attributes :id, :username
    end

    child :votes do
      attributes :id, :user_id, :votable_id, :votable_type, :vote_type
  	end
  end

  child :answers do
    attributes :id, :author_id, :question_id, :body

    child :author => :author do
      attributes :id, :username
    end

    child :votes do
      attributes :id, :user_id, :votable_id, :votable_type, :vote_type
  	end

  	child :comments do
  	  attributes :id, :author_id, :body, :commentable_id, :commentable_type

  	  child :author => :author do
  	    attributes :id, :username
  	  end

  	  child :votes do
  	    attributes :id, :user_id, :votable_id, :votable_type, :vote_type
  	  end
  	end
  end

end