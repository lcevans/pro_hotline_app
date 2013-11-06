class Tagging < ActiveRecord::Base
  attr_accessible :question_id, :tag_id

  # Validations

  validates :question_id, :presence => true
  validates :tag_id, :presence => true

  # Associations

  belongs_to :question
  belongs_to :tag
end
