class QuestionsController < ApplicationController
	include QuestionsHelper

	before_filter :require_current_user!, :except => [:index, :show]

	def index
		@questions = Question.includes(:author).all
		respond_to do |format|
      format.html { render :index }
      format.json 
    end
	end

	def show
		question_id = params[:id]		
		@question = Question.find(question_id)

		if hasnt_viewed(current_user, question_id)
			View.create!(:user_id => current_user_id, :question_id => question_id)
		end

		respond_to do |format|
      format.html { render :show }
      format.json 
    end
	end

	def new
		@question = Question.new
		render :new
	end

	def create
		# Only Rails for now
		@question = Question.new(params[:question])
		@question.author_id = current_user_id
		@question.tag_ids = params[:tag_ids]

		if @question.save
			redirect_to question_url(@question)
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
		# @question.tag_ids = params[:question][:tag_ids]

		if @question.update_attributes(params[:question])
			render :show
		else
			flash[:errors] = @question.errors.full_messages
			render :json => @question.errors.full_messages, :status => 422
		end
	end

	def destroy
		@question = Question.find(params[:id])
		@question.destroy
		redirect_to questions_url
	end

end
