ProHotlineApp.Models.Answer = Backbone.Model.extend({
	urlRoot: "/answers",

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
    this.comments = new ProHotlineApp.Collections.Comments();
    Backbone.Model.apply(this, arguments);
  },

	parse: function (attributes) {

		this.votes.reset(attributes.votes, {parse: true});
		delete attributes.votes;
		this.comments.reset(attributes.comments, {parse: true});
		delete attributes.comments;

		this.author = attributes.author;
		delete attributes.author;

		return attributes;
	},

  toJSON: function() {
    return { answer: _.clone( this.attributes ) }
  },
});
