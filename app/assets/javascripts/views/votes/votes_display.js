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


// NEED TO FIX THE VOTING!////////////////////////////////////////////

  upvote: function () {
    var that = this;
    var oldVote = this.model.votes.find(function (vote) {
      return (vote.author_id == ProHotlineApp.currentUserId);
    });
  },

  downvote: function () {

  },

  makeVote: function (voteType) {
  }

//////////////////////////////////////////////////////////////

});
