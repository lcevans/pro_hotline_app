ProHotlineApp.Models.Question = Backbone.Model.extend({
	urlRoot: "/questions",


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

		//this.view_count = attributes.view.count;

		return attributes;
	},

  toJSON: function() {
    return { question: _.clone( this.attributes ) }
  },
});