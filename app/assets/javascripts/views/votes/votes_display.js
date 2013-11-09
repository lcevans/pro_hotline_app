ProHotlineApp.Views.VotesDisplay = Backbone.View.extend({

  initialize: function (options) {
    this.modelType = options.modelType;
  },

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


// REFACTOR?////////////////////////////////////////////

  upvote: function () {
    var that = this;
    var oldVote = this.model.votes.find(function (vote) {
      return (vote.get("user_id") == ProHotlineApp.currentUserId);
    });
    if (!oldVote) {
      this.makeVote("UPVOTE");
    } else if (oldVote.get("vote_type") === "DOWNVOTE"){
      oldVote.destroy({
        wait: true,
        error: function () {
          alert("error destroying old vote");
        },
        success: function () {
          that.makeVote("UPVOTE");
        }
      });
    }
  },

  downvote: function () {
    var that = this;
    var oldVote = this.model.votes.find(function (vote) {
      return (vote.get("user_id") == ProHotlineApp.currentUserId);
    });
    if (!oldVote) {
      this.makeVote("DOWNVOTE");
    } else if (oldVote.get("vote_type") === "UPVOTE"){
      oldVote.destroy({
        wait: true,
        error: function () {
          alert("error destroying old vote");
        },
        success: function () {
          that.makeVote("DOWNVOTE");
        }
      });
    }
  },

  makeVote: function (voteType) {
    var that = this;
    this.model.votes.create({
      user_id: ProHotlineApp.currentUserId,
      votable_id: this.model.get("id"),
      votable_type: this.modelType,
      vote_type: voteType,
    },{
      error: function (model, error) {
        alert(error.responseText);
      },
      success: function () {
        that.render();
      }
    })
  }

////////////////////////////////////////////

});
