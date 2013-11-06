class Vote < ActiveRecord::Base
  belongs_to :votable, polymorphic: true

  attr_accessible :user_id, :votable_id, :votable_type, :vote_type

  # Validations

  validates :user_id, :presence => true
  validates :votable_id, :presence => true
  validates :vote_type, :presence => true, :inclusion => {:in => ["UPVOTE", "DOWNVOTE"]}
  validates :votable_type, :presence => true, :inclusion => {:in => ["Question", "Answer", "Comment"]}

  validate :vote_doesnt_already_exist, :on => :create

  # Associations

  belongs_to :user

  # Methods

  def self.create_or_modify(user_id, votable_id, votable_type, vote_type)
  	vote = Vote.where(:user_id => user_id, 
  		                :votable_id => votable_id, 
  		                :votable_type => votable_type).first
  	if !!vote
  		vote.update_attributes!(:vote_type => vote_type)
  	else
  		vote = Vote.create!(:user_id => user_id, 
  			                  :votable_id => votable_id, 
  			                  :votable_type => votable_type, 
  			                  :vote_type => vote_type)
  	end
  end

  def vote_doesnt_already_exist
  	unless Vote.where(:user_id => self.user_id, 
  		                :votable_id => self.votable_id, 
  		                :votable_type => self.votable_type).empty?
  		errors.add(:votable_id, "User has already voted")
  	end
  end
end
