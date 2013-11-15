ProHotlineApp.Models.Comment = Backbone.Model.extend({
	
	urlRoot: "/comments",

	voteCount: function () {
		var upvotes = this.votes.filter( function (vote) { 
			return vote.escape("vote_type") === "UPVOTE";
		}).length ;

    var downvotes = this.votes.filter( function (vote) { 
    	return vote.escape("vote_type") === "DOWNVOTE";
    }).length;

    return upvotes - downvotes;
	},

	constructor: function() {
    this.votes = new ProHotlineApp.Collections.Votes();
    Backbone.Model.apply(this, arguments);
  },

	parse: function (attributes) {
		this.votes.reset(attributes.votes, {parse: true});
		delete attributes.votes;

		this.author = attributes.author;
		delete attributes.author;
		
		return attributes;
	},

  toJSON: function() {
  	var attributes = _.clone(this.attributes);
  	
  	// Remove attributes that we should not modify on the server
  	delete attributes.created_at;

    return { comment: attributes }
  },
});
