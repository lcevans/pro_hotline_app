class QuestionsController < ApplicationController
	include QuestionsHelper

	before_filter :require_current_user!, :except => [:index, :show]

	def index
		@questions = Question.includes(:author).all
		render :index
	end

	def show
		question_id = params[:id]		
		if hasnt_viewed(current_user, question_id)
			View.create!(:user_id => current_user_id, :question_id => question_id)
		end
		@question = Question.includes(:votes, :views, :answers).find(question_id)

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

	# Additional control methods

	def upvote
		Vote.create_or_modify(current_user_id, params[:question_id], "Question", "UPVOTE")
		redirect_to question_url(params[:question_id])
	end

	def downvote
		Vote.create_or_modify(current_user_id, params[:question_id], "Question", "DOWNVOTE")
		redirect_to question_url(params[:question_id])
	end

end
