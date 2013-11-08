ProHotlineApp.Views.QuestionDisplay = Backbone.View.extend({

  template: JST['questions/display'],

  events: {
    "click button.new-answer": "newAnswer"
  },

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

  	return this;
  },

  newAnswer: function (event) {

    var answer = new ProHotlineApp.Models.Answer({question_id: this.model.get("id")});
    formView = new ProHotlineApp.Views.AnswerForm({
      model: answer
    });

    this.$el.children("div.new-answer").html(formView.render().$el);

  }

});
