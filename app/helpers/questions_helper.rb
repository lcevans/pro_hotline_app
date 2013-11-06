module QuestionsHelper
	
	def hasnt_viewed(user, question_id)
		!!user && !View.exist_with_user_and_question_id?(user.id, question_id)
	end

end
