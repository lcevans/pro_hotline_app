class CommentsController < ApplicationController

	before_filter :require_current_user!

	def create
		@comment = Comment.new(params[:comment])
		if @comment.save
			render :show
		else
			render :json => @comment.errors.full_messages, :status => 422
		end
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
		@comment.destroy
		render :json => @comment
	end
end
