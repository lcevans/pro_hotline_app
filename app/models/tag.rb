class Tag < ActiveRecord::Base
  attr_accessible :name

  # Validations

  validates :name, :presence => true, :uniqueness => true

  # Associations

  has_many :taggings, :dependent => :destroy
  has_many :tag_followings, :dependent => :destroy
  has_many :questions, :through => :taggings, :source => :question
  has_many :users, :through => :tag_followings, :source => :user  
end
