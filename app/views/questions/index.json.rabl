collection @questions

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

child :answers do
  attributes :id, :author_id, :question_id, :body
end
