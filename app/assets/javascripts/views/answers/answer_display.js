ProHotlineApp.Views.AnswerDisplay = Backbone.View.extend({

  template: JST['answers/display'],

  events: {
    "click button.delete-answer": "deleteAnswer"
  },

  render: function () {
    var that = this;

  	// Clear the DOM
  	this.$el.html("");

  	// Add the Answer itself
  	renderedContent = this.template({
  		answer: this.model
  	});
  	this.$el.append(renderedContent);

    // Add the child comments
    this.model.comments.each(function (comment) {
      that.renderCommentView(comment);
    });

  	return this
  },

  renderCommentView: function (comment) {
    var commentView = new ProHotlineApp.Views.CommentDisplay({
      model: comment
    });
    var dom = this.$el.children("div.comments");
    //commentView.setElement(dom).render();
    dom.append(commentView.render().$el);
  },

  deleteAnswer: function () {
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
