class User < ActiveRecord::Base
  attr_accessible :username, :password, :email, :profile, :backup_image
  attr_reader :password

  validates :password_digest, :presence => { :message => "Password can't be blank" }
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :session_token, :presence => true
  validates :username, :presence => true

  after_initialize :ensure_session_token

  # Associations

  has_many :authored_questions, :class_name => "Question", :foreign_key => :author_id 
  has_many :authored_answers, :class_name => "Answer", :foreign_key => :author_id
  has_many :authored_comments, :class_name => "Comment", :foreign_key => :author_id
  has_many :views
  has_many :question_votes
  has_many :answer_votes
  has_many :tag_followings, :dependent => :destroy
  has_many :tags, :through => :tag_followings, :source => :tag

  # Methods

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)

    return nil if user.nil?

    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  private
  
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
