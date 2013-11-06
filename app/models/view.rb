class View < ActiveRecord::Base
  attr_accessible :user_id, :question_id

  # Validations

  validates :user_id, :presence => true
  validates :question_id, :presence => true

  validate :view_doesnt_exist

  # Associations

  belongs_to :user
  belongs_to :question

  # Methods

  def self.exist_with_user_and_question_id?(user_id, question_id)
  	!View.where(:user_id => user_id, :question_id => question_id).empty?
  end

  def view_doesnt_exist
  	 if View.exist_with_user_and_question_id?(self.user_id, self.question_id)
  	 	errors.add(:question_id, "User has already viewed this question")
  	 end
  end
end
