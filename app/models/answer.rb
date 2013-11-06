class Answer < ActiveRecord::Base
  attr_accessible :author_id, :question_id, :body

  # Validations

  validates :author_id, :presence => true
  validates :question_id, :presence => true
  validates :body, :presence => true    

  # Associations

  belongs_to :author, :class_name => "User", :foreign_key => :author_id
  belongs_to :question, :class_name => "Question", :foreign_key => :question_id

end
