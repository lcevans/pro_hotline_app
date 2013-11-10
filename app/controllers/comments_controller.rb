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

		if @comment.save
			render :show
		else
			render :json => @comment.errors.full_messages, :status => 422
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
			render :show
		else
			render :json => @comment.errors.full_messages, :status => 422
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
