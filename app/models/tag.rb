class Tag < ActiveRecord::Base
  attr_accessible :name

  # Validations

  validates :name, :presence => true, :uniqueness => true

  # Associations

  has_many :taggings, :dependent => :destroy
  has_many :questions, :through => :taggings, :source => :question
end
