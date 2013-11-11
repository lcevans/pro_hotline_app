class AnswersController < ApplicationController
	before_filter :require_current_user!

	def create
		@answer = Answer.new(params[:answer])
		if @answer.save
				render :show
		else
				render :json => @answer.errors.full_messages, :status => 422
		end
	end

	def update
		@answer = Answer.find(params[:id])
		if @answer.update_attributes(params[:answer])
			render :show
		else
			render :json => @answer.errors.full_messages, :status => 422
		end
	end

	def destroy
		@answer = Answer.find(params[:id])
		@answer.destroy
		render :json => @answer
	end

end
