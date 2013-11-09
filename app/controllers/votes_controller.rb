class VotesController < ApplicationController
	def create
		@vote = Vote.new(params[:vote])
		if @vote.save
			render :json => @vote
		else
			render :json => @vote.errors.full_messages, :status => 422
		end
	end

	def destroy
		@vote = Vote.find(params[:id])
		@vote.destroy
		render :json => @vote
	end
end
