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
		@question = Question.new(params[:question])
		@question.author_id = current_user_id

		tags = params[:tags]
		tags.try(:each) do |tag|
			existing_tag = Tag.find_by_name(tag[:name])
			if existing_tag
				@question.tags << existing_tag
			else
				@question.tags.new(:name => tag[:name])
			end
		end

		if @question.save
			render :show
		else
			render :json => @question.errors.full_messages, :status => 422
		end
	end

	def edit
		@question = Question.find(params[:id])
		render :edit
	end

	def update
		@question = Question.find(params[:id])

		@question.tags = [];
		tags = params[:tags]
		tags.try(:each) do |tag|
			existing_tag = Tag.find_by_name(tag[:name])
			if existing_tag
				@question.tags << existing_tag
			else
				@question.tags.new(:name => tag[:name])
			end
		end

		if @question.update_attributes(params[:question])
			render :show
		else
			render :json => @question.errors.full_messages, :status => 422
		end
	end

	def destroy
		@question = Question.find(params[:id])
		@question.destroy
		render :json => @question
	end

end
