ProHotlineApp.Views.AnswerDisplay = Backbone.View.extend({

  template: JST['answers/display'],

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
      that.$el.children("div.comments").append('<div class="comment-body">' + 
        comment.author.username + ": " + comment.escape("body") + '</div>');
    });

  	return this
  }

});