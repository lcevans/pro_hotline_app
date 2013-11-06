class AnswersController < ApplicationController
	before_filter :require_current_user!, :only => [:new, :create, :edit, :update, :destroy]

	def new
		@answer = Answer.new()
		@answer.question_id = params[:question_id]
		render :new
	end

	def create
		@answer = Answer.new(params[:answer])
		@answer.question_id = params[:question_id]
		@answer.author_id = current_user_id
		if @answer.save
			redirect_to question_url(@answer.question_id)
		else
			flash[:errors] = @answer.errors.full_messages
			render :new
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
		redirect_to question_url(question_id)
	end
end
