object @comment

attributes :id, :author_id, :body, :commentable_id, :commentable_type

child :author => :author do
  attributes :id, :username
end

child :votes do
  attributes :id, :user_id, :votable_id, :votable_type, :vote_type
end
