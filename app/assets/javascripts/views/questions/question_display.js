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
      that.$el.children("div.comments").append('<div class="comment-body">' + 
        comment.author.username + ": " + comment.escape("body") + '</div>');
    });

    // Add the New Answer view if user logged in
    if (ProHotlineApp.currentUser) {
      this.addNewAnswerView();
    }

  	return this;
  },

  addNewAnswerView: function () {
    newAnswerView = new ProHotlineApp.Views.AnswerNew({
      model: this.model
    });

    var dom = this.$el.children("div.new-answer");
    newAnswerView.setElement(dom).displayButton();
  }

});
