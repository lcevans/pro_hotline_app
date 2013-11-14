ProHotlineApp.Models.Question = Backbone.Model.extend({
	urlRoot: "/questions",

	voteCount: function () {
		var upvotes = this.votes.filter( function (vote) { 
			return vote.escape("vote_type") === "UPVOTE";
		}).length ;

    var downvotes = this.votes.filter( function (vote) { 
    	return vote.escape("vote_type") === "DOWNVOTE";
    }).length;

    return upvotes - downvotes;
	},

	createdAgo: function () {
		var timeCreated = new Date(this.get("created_at"));
		return $.timeago(timeCreated);	
	},

	constructor: function() {
    this.answers = new ProHotlineApp.Collections.Answers();
    this.comments = new ProHotlineApp.Collections.Comments();
    this.tags = new ProHotlineApp.Collections.Tags();
    this.votes = new ProHotlineApp.Collections.Votes();
    Backbone.Model.apply(this, arguments);
  },

	parse: function (attributes) {
		this.answers.reset(attributes.answers, {parse: true});
		delete attributes.answers;
		this.comments.reset(attributes.comments, {parse: true});
		delete attributes.comments;		
		this.tags.reset(attributes.tags, {parse: true});
		delete attributes.tags;
		this.votes.reset(attributes.votes, {parse: true});
		delete attributes.votes;

		this.author = attributes.author;
		delete attributes.author;
		this.viewCount = attributes.viewCount;
		delete attributes.viewCount;

		return attributes;
	},

  toJSON: function() {
  	var attributes = _.clone(this.attributes);
  	
  	// Remove attributes that we should not modify on the server
  	delete attributes.created_at;

    return { question: attributes, tags: this.tags }
  },
});