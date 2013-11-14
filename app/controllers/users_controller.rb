class UsersController < ApplicationController
	#before_filter :require_current_user!, :only => [:show]
  before_filter :require_no_current_user!, :only => [:create, :new]

  def create
    @user = User.new(params[:user])

    if @user.save
      self.current_user = @user
      redirect_to :root
    else
      render :json => @user.errors.full_messages
    end
  end

  def new
    @user = User.new
  end

  def index
    @users = User.all
  end

  def show
    if params.include?(:id)
      @user = User.includes([{:authored_questions => :votes}, {:authored_answers => :votes}, :tags]).find(params[:id])
    else
      redirect_to user_url(current_user)
    end

    respond_to do |format|
      format.html { render :show }
      format.json { render :json => @user }
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      render :json => @user
    else
      render :json => @comment.errors.full_messages, :status => 422
    end
  end

  # Additional Controller Methods

  def add_tag
    @user = User.find(params[:user_id])
    tag = Tag.find(params[:tag_id])
    @user.tags << tag unless @user.tags.include?(tag)

    if @user.save
      render :json => @user
    else
      render :json => @comment.errors.full_messages, :status => 422
    end    
  end

  def remove_tag
    @user = User.find(params[:user_id])
    tag = Tag.find(params[:tag_id])
    @user.tags -= [tag]

    if @user.save
      render :json => @user
    else
      render :json => @comment.errors.full_messages, :status => 422
    end    
  end
end
