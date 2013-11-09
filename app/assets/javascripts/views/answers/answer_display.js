ProHotlineApp.Views.AnswerDisplay = Backbone.View.extend({

  initialize: function () {
    var that = this;

    this.listenTo(this.model.comments, "add", function () {
      that.renderCommentView(that.model.comments.last());
    });
  },

  template: JST['answers/display'],

  events: {
    "click button.delete-answer": "deleteAnswer",
    "click button.edit-answer": "edit",
    "click button.mark-best-answer": "markAsBest"
  },

  render: function () {
    var that = this;

  	// Clear the DOM
  	this.$el.html("");

  	// Add the Answer itself
  	renderedContent = this.template({
  		answer: this.model,
      question: ProHotlineApp.question
  	});
  	this.$el.append(renderedContent);

    // Add the New Comment view if user logged in
    if (ProHotlineApp.currentUser) {
      this.addNewCommentView();
    }

    // Add the child comments
    this.model.comments.each(function (comment) {
      that.renderCommentView(comment);
    });

    // Add the Votes view
    this.renderVotes();

  	return this
  },

  markAsBest: function () {
    var that = this;
    ProHotlineApp.question.set("best_answer_id", this.model.get("id"));
    ProHotlineApp.question.save({},{
      wait: true,
      error: function (model, error) {
        alert (error.responseText);
      },
      success: function (model) {
        $("div.best").attr("class", "not-best");
        that.$el.children("div.not-best").attr("class", "best");
      }
    });
  },

  edit: function () {
    var dom = this.$el.children("div.answer-body");
    dom.html("");
  },

  renderVotes: function () {
    votesView = new ProHotlineApp.Views.VotesDisplay({
      model: this.model
    });

    var dom = this.$el.children("div.votes");
    votesView.setElement(dom).render();
  },

  addNewCommentView: function () {
    newCommentView = new ProHotlineApp.Views.CommentNew({
      model: this.model,
      parentType: "Answer"
    });

    var dom = this.$el.children("div.new-comment");
    newCommentView.setElement(dom).displayButton();
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
