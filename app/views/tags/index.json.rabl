collection @tags

attributes :id, :name

node :userIds do |t| 
  t.user_ids
end

child :questions => :questions do 

  attributes :id, :title, :body, :author_id, :best_answer_id, :created_at

end