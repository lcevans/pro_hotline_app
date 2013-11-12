ProHotlineApp.Views.CommentDisplay = Backbone.View.extend({

  displayTemplate: JST['comments/display'],
  editTemplate: JST['comments/edit_form'],

  events: {
    "click button.delete-comment": "deleteComment",
    "click button.edit-comment": "editComment",
    "click button.cancel": "cancel",
    "submit": "updateComment"
  },

  render: function () {
    var that = this;

  	// Clear the DOM
  	this.$el.html("");
    this.removeSubviews();

  	// Add the Comment itself
  	renderedContent = this.displayTemplate({
  		comment: this.model
  	});
  	this.$el.append(renderedContent);

    // Add the Votes view
    this.renderVotes();

  	return this
  },

  editComment: function () {
    var that = this;

    // Clear the DOM
    this.$el.html("");
    // DANGER DANGER DANGER

    // Add the Edit Form
    renderedContent = this.editTemplate({
      comment: this.model,
    });
    this.$el.append(renderedContent);
  },

  updateComment: function (event) {
    var that = this;
    event.preventDefault();
    var payload = $(event.target).serializeJSON();

    this.model.save(payload.comment, {
      wait: true,
      error: function (model, error) {
        $("div.errors").html("ERROR: ");
        $("div.errors").append(error.responseText);
      },
      success: function (model) {
        that.render(); ///WARNING!
      }
    })
  },

  cancel: function () {
    this.render();
  },

  renderVotes: function () {
    var votesView = new ProHotlineApp.Views.VotesDisplay({
      model: this.model,
      modelType: "Comment",
      inline: true
    });
    this.subviews.push(votesView);

    var dom = this.$(".comment-votes");
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
  },

  // Dealing with garbage collection

  remove: function () {
    this.removeSubviews();
    Backbone.View.prototype.remove.call(this);
  },

  removeSubviews: function () {
    if (this.subviews) {
      this.subviews.forEach( function (subview) {
        subview.remove();
      });
    }
    this.subviews = [];
  }
});