ProHotlineApp.Views.QuestionDisplay = Backbone.View.extend({

  initialize: function () {
    var that = this;

    this.listenTo(this.model.comments, "add", function () {
      that.renderCommentView(that.model.comments.last());
    });
  },

  template: JST['questions/display'],

  render: function () {
  	var that = this;

  	// Wipe the DOM clean
  	this.$el.html("");
    this.removeSubviews();

  	// Add the question itself
  	renderedContent = this.template({
  		question: this.model
  	});
  	this.$el.append(renderedContent);

    // Add the New Comment view if user logged in
    if (ProHotlineApp.currentUser) {
      this.renderNewCommentView();
    }

    // Add the child comments  /COMEBACK
    this.model.comments.each(function (comment) {
      that.renderCommentView(comment);
    });

    // Add the New Answer view if user logged in
    if (ProHotlineApp.currentUser) {
      this.renderNewAnswerView();
    }

    // Add the Votes view
    this.renderVotes();

  	return this;
  },

  edit: function () {
    var dom = this.$el.children("div.question-body");
    dom.html("");
  },

  renderVotes: function () {
    var votesView = new ProHotlineApp.Views.VotesDisplay({
      model: this.model,
      modelType: "Question"
    });
    this.subviews.push(votesView);

    var dom = this.$("div.question-votes");
    votesView.setElement(dom).render();
  },

  renderCommentView: function (comment) {
    var commentView = new ProHotlineApp.Views.CommentDisplay({
      model: comment
    });
    this.subviews.push(commentView);

    var dom = this.$("div.comments");
    dom.append(commentView.render().$el);
  },

  renderNewAnswerView: function () {
    var newAnswerView = new ProHotlineApp.Views.AnswerNew({
      model: this.model
    });
    this.subviews.push(newAnswerView);

    var dom = this.$("div.new-answer");
    newAnswerView.setElement(dom).displayButton();
  },

  renderNewCommentView: function () {
    var newCommentView = new ProHotlineApp.Views.CommentNew({
      model: this.model,
      modelType: "Question"
    });
    this.subviews.push(newCommentView);

    var dom = this.$("div.new-comment");
    newCommentView.setElement(dom).displayButton();
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
