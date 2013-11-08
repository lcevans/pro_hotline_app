ProHotlineApp.Views.VotesDisplay = Backbone.View.extend({

  template: JST['votes/display'],

  events: {
    "click button.upvote": "upvote",
    "click button.downvote": "downvote",   
  },

  render: function () {
    var that = this;

  	// Clear the DOM
  	this.$el.html("");

  	// Add the content
  	renderedContent = this.template({
  		candidate: this.model
  	});
  	this.$el.append(renderedContent);

  	return this
  },

  upvote: function () {

  },

  downvote: function () {

  }


});
