class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true

  attr_accessible :author_id, :body, :commentable_id, :commentable_type

  # Validations

  validates :author_id, :presence => true
  validates :body, :presence => true    
  validates :commentable_id, :presence => true    
  validates :commentable_type, :presence => true    

  # Associations

  belongs_to :author, :class_name => "User", :foreign_key => :author_id
  
  has_many :votes, :as => :votable, :dependent => :destroy

  # Methods

  def question_id
		(self.commentable_type == "Question" ? self.commentable_id
			                                   : Answer.find(self.commentable_id).question_id)
	end
end
