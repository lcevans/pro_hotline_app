class CommentsController < ApplicationController

	before_filter :require_current_user!

	def new
		@comment = Comment.new()
		if !!params[:question_id]
			@action = question_comments_url(params[:question_id])
		elsif !!params[:answer_id]
			@action = answer_comments_url(params[:answer_id])
		end
		render :new
	end

	def create
		@comment = Comment.new(params[:comment])
		@comment.author_id = current_user_id

		# Ugly... refactor later?
		if !!params[:question_id]
			@comment.commentable_id = params[:question_id]
			@comment.commentable_type = "Question"
			success_action = question_url(params[:question_id])
			failure_action = question_comments_url(params[:question_id])
		elsif !!params[:answer_id]
			@comment.commentable_id = params[:answer_id]
			@comment.commentable_type = "Answer"
			question_id = Answer.find(params[:answer_id]).question_id
			success_action = question_url(question_id)
			failure_action = answer_comments_url(params[:answer_id]) 
		end

		if @comment.save
			redirect_to success_action
		else
			flash[:errors] = @comment.errors.full_messages
			@action = failure_action
			render :new
		end
	end

	def edit
		@comment = Comment.find(params[:id])
		@action = comment_url(@comment)
		render :edit
	end

	def update
		@comment = Comment.find(params[:id])
		if @comment.update_attributes(params[:comment])
			redirect_to question_url(@comment.question_id)
		else
			flash[:errors] = @comment.errors.full_messages
			@action = comment_url(@comment)
			render :edit
		end
	end

	def destroy
		@comment = Comment.find(params[:id])
		question_id = @comment.question_id
		@comment.destroy
		respond_to do |format|
			format.html { redirect_to question_url(question_id) }
			format.json { render :json => @comment }
		end
	end

	# Additional control methods

	def upvote
		@comment = Comment.find(params[:comment_id])
		Vote.create_or_modify(current_user_id, @comment.id, "Comment", "UPVOTE")
		redirect_to question_url(@comment.question_id)
	end

	def downvote
		@comment = Comment.find(params[:comment_id])
		Vote.create_or_modify(current_user_id, @comment.id, "Comment", "DOWNVOTE")
		redirect_to question_url(@comment.question_id)
	end
end
