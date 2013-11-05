class QuestionsController < ApplicationController
	def index
		@questions = Question.all
		render :index
	end

	def new
		@question = Question.new
		render :new
	end

	def create
		@question = Question.new(params[:question])
		@question.user_id = current_user.id

		if @question.save
			redirect_to questions_url
		else
			flash[:errors] << @question.errors.full_messages
			render :new
		end
	end

	def show

	end
end
