class TagsController < ApplicationController
	def index
		@tags = Tag.includes(:users, :questions).all
	end

	def show
		@tag = Tag.find(params[:id])
	end
end
