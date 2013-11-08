ProHotlineApp.Views.QuestionDisplay = Backbone.View.extend({

  template: JST['questions/display'],

  render: function () {
  	var that = this;

  	// Wipe the DOM clean
  	this.$el.html("");

  	// Add the question itself
  	renderedContent = this.template({
  		question: this.model
  	});
  	this.$el.append(renderedContent);

    // Add the child comments
    this.model.comments.each(function (comment) {
      that.renderCommentView(comment);
    });

    // Add the New Answer view if user logged in
    if (ProHotlineApp.currentUser) {
      this.addNewAnswerView();
    }

  	return this;
  },

  renderCommentView: function (comment) {
    var commentView = new ProHotlineApp.Views.CommentDisplay({
      model: comment
    });
    var dom = this.$el.children("div.comments");
    //commentView.setElement(dom).render();
    dom.append(commentView.render().$el);
  },

  addNewAnswerView: function () {
    newAnswerView = new ProHotlineApp.Views.AnswerNew({
      model: this.model
    });

    var dom = this.$el.children("div.new-answer");
    newAnswerView.setElement(dom).displayButton();
  }

});
