ProHotlineApp.Views.CommentDisplay = Backbone.View.extend({

  template: JST['comments/display'],

  events: {
    "click button.delete-comment": "deleteComment"
  },

  render: function () {
    var that = this;

  	// Clear the DOM
  	this.$el.html("");

  	// Add the Comment itself
  	renderedContent = this.template({
  		comment: this.model
  	});
  	this.$el.append(renderedContent);

    // Add the Votes view
    this.renderVotes();

  	return this
  },

  renderVotes: function () {
    votesView = new ProHotlineApp.Views.VotesDisplay({
      model: this.model
    });

    var dom = this.$el.children("div.votes");
    votesView.setElement(dom).render();
  },

  deleteComment: function () {
    var that = this;
    this.model.destroy({
      error: function (model, errors) {
        alert(errors.responseText);
      },
      success: function (obj) {
        that.destroyView();
      }
    });
  },

  destroyView: function () {
    this.remove();
  }

});