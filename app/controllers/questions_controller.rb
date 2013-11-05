class QuestionsController < ApplicationController
	def index
		@questions = Question.all
		render :index
	end

	def show
		@question = Question.find(params[:id])
		render :show
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
			flash[:errors] = @question.errors.full_messages
			render :new
		end
	end

	def edit
		@question = Question.find(params[:id])
		render :edit
	end

	def update
		@question = Question.find(params[:id])
		if @question.update_attributes(params[:question])
			redirect_to questions_url
		else
			flash[:errors] = @question.errors.full_messages
			render :edit
		end
	end

	def destroy
		@question = Question.find(params[:id])
		@question.destroy
		redirect_to questions_url
	end
end
