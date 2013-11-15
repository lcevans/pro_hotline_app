object @question

attributes :id, :title, :body, :author_id, :best_answer_id, :created_at

node :viewCount do |q| 
  q.views.count
end

child :author => :author do
	attributes :id, :username, :email, :backup_image
end

child :tags => :tags do
	attributes :id, :name
end

child :votes do
	attributes :id, :user_id, :votable_id, :votable_type, :vote_type
end

child :comments do
	attributes :id, :author_id, :body, :commentable_id, :commentable_type, :created_at

	child :author => :author do
    attributes :id, :username, :email, :backup_image
  end

  child :votes do
    attributes :id, :user_id, :votable_id, :votable_type, :vote_type
	end
end

child :answers do
  attributes :id, :author_id, :question_id, :body, :created_at

  node :isBest do |a| 
    a.question.best_answer_id == a.id
  end

  child :author => :author do
    attributes :id, :username, :email, :backup_image
  end

  child :votes do
    attributes :id, :user_id, :votable_id, :votable_type, :vote_type
	end

	child :comments do
	  attributes :id, :author_id, :body, :commentable_id, :commentable_type, :created_at

	  child :author => :author do
	    attributes :id, :username
	  end

	  child :votes do
	    attributes :id, :user_id, :votable_id, :votable_type, :vote_type
	  end
	end
end
