class TagsController < ApplicationController
	def index
		@tags = Tag.includes(:users, :questions).all
	end

	def show
		@tag = Tag.find(params[:id])

		respond_to do |format|
			format.html { render :show }
			format.json 
		end
	end
end
