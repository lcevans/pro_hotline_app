ProHotlineApp.Views.CommentDisplay = Backbone.View.extend({

  initialize: function () {
    this.displayTemplate = JST['comments/display'];
    this.editTemplate = JST['comments/edit_form'];
  },

  //template: JST['comments/display'],

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
    votesView = new ProHotlineApp.Views.VotesDisplay({
      model: this.model,
      modelType: "Comment"
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