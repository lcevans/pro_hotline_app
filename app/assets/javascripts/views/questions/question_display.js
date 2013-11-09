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

  	// Add the question itself
  	renderedContent = this.template({
  		question: this.model
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

    // Add the New Answer view if user logged in
    if (ProHotlineApp.currentUser) {
      this.addNewAnswerView();
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
    votesView = new ProHotlineApp.Views.VotesDisplay({
      model: this.model
    });

    var dom = this.$el.children("div.votes");
    votesView.setElement(dom).render();
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
  },

  addNewCommentView: function () {
    newCommentView = new ProHotlineApp.Views.CommentNew({
      model: this.model,
      parentType: "Question"
    });

    var dom = this.$el.children("div.new-comment");
    newCommentView.setElement(dom).displayButton();
  }

});
