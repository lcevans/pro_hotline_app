module UsersHelper

	# Returns the Gravatar (http://gravatar.com/) for the given user.
  def gravatar_for(user, options = { size: 50 })
  	if user.backup_image == ""
  		gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
  		size = options[:size]
  		gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
  		image_tag(gravatar_url, alt: user.username, class: "gravatar")
  	else
  		size_string = "#{options[:size]}x#{options[:size]}"
      p "***************"
      p size_string
  		image_tag(user.backup_image, class: "gravatar", size: size_string)
  	end
  end
end
