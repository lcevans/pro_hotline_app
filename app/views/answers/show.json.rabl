object @answer

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