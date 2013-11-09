class Question < ActiveRecord::Base
  attr_accessible :title, :body, :author_id, :best_answer_id

  # Validations

  validates :title, :presence => true
  validates :body, :presence => true
  validates :author_id, :presence => true

  # Associations

  belongs_to :author, :class_name => "User", :foreign_key => :author_id
  has_many :answers, :class_name => "Answer", :foreign_key => :question_id, :dependent => :destroy
  has_many :taggings, :dependent => :destroy
  has_many :tags, :through => :taggings, :source => :tag
  has_many :views, :dependent => :destroy

  has_many :votes, :as => :votable, :dependent => :destroy
  has_many :comments, :as => :commentable, :dependent => :destroy

end
