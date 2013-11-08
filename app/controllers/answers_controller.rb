class AnswersController < ApplicationController
	before_filter :require_current_user!

	def new
		@answer = Answer.new()
		@answer.question_id = params[:question_id]
		render :new
	end

	def create
		# No longer gets the question_id from the params!
		@answer = Answer.new(params[:answer])
		@answer.author_id = current_user_id
		if @answer.save
				render :show
		else
				render :json => @answer.errors.full_messages, :status => 422
		end
	end

	def edit
		@answer = Answer.find(params[:id])
		render :edit
	end

	def update
		@answer = Answer.find(params[:id])
		if @answer.update_attributes(params[:answer])
			redirect_to question_url(@answer.question_id)
		else
			flash[:errors] = @answer.errors.full_messages
			render :edit
		end
	end

	def destroy
		@answer = Answer.find(params[:id])
		question_id = @answer.question_id
		@answer.destroy
		
		respond_to do |format|
			format.html { redirect_to question_url(question_id) }
			format.json { render :json => @answer }
		end
	end

	# Additional control methods

	def upvote
		@answer = Answer.find(params[:answer_id])
		Vote.create_or_modify(current_user_id, @answer.id, "Answer", "UPVOTE")
		redirect_to question_url(@answer.question_id)
	end

	def downvote
		@answer = Answer.find(params[:answer_id])
		Vote.create_or_modify(current_user_id, @answer.id, "Answer", "DOWNVOTE")
		redirect_to question_url(@answer.question_id)
	end
end
