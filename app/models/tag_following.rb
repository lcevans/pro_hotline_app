class TagFollowing < ActiveRecord::Base
  attr_accessible :user_id, :tag_id

  # Validations

  validates :user_id, :presence => true
  validates :tag_id, :presence => true

  # Associations

  belongs_to :user
  belongs_to :tag
end
