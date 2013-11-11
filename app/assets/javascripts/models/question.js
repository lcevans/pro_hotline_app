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

	createdAt: function () {
		var timeCreated = new Date(Date.parse(this.get("created_at")));
		var currentTime = new Date();
		var secondsPassed = currentTime - timeCreated;
		var minutesPassed = secondsPassed % 60;
		var hoursPassed = minutesPassed % 60;
		var daysPassed = hoursPassed % 24;
		var weeksPassed = daysPassed % 7;
		var monthsPassed = daysPassed % 31;
		var yearsPassed = daysPassed % 365;

		if (secondsPassed < 60) {return "just now";}
		if (minutesPassed < 60) {return minutesPassed + " minutes ago";}
		if (hoursPassed < 24) {return hoursPassed + " hours ago";}
		if (daysPassed < 7) {return daysPassed + " days ago";}				
		if (weeksPassed < 5) {return weeksPassed + " weeks ago";}		
		if (monthsPassed < 12) {return monthsPassed + " months ago";}		

		return yearsPassed + "years ago";		
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

    return { question: attributes }
  },
});