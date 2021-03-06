ProHotlineApp.Views.AnswerDisplay = Backbone.View.extend({

  initialize: function () {
    var that = this;

    this.listenTo(this.model.comments, "add", function () {
      that.renderCommentView(that.model.comments.last());
    });
  },

  displayTemplate: JST['answers/display'],
  editTemplate: JST['answers/edit_form'],

  events: {
    "click .delete-answer": "deleteAnswer",
    "click .edit-answer": "editAnswer",
    "click button.cancel": "cancel",
    "click .mark-best-answer": "markAsBest",
    "submit #edit-answer-form": "updateAnswer"
  },

  render: function () {
    var that = this;

  	// Clear the DOM
  	this.$el.html("");
    this.removeSubviews();

  	// Add the Answer itself
  	renderedContent = this.displayTemplate({
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
    ProHotlineApp.question.set("best_answer_id", this.model.id);
    ProHotlineApp.question.save({},{
      wait: true,
      error: function (model, errors) {
        alert("error");
      },
      success: function (model) {
        $("div.best").attr("class", "not-best");
        that.$("div.not-best").attr("class", "best");
        //that.render(); // DANGER!!!
      }
    });
  },

  editAnswer: function () {
    var that = this;

    // Clear the DOM
    this.$el.html("");
    this.removeSubviews();

    // Add the Edit Form
    renderedContent = this.editTemplate({
      answer: this.model,
    });
    this.$el.append(renderedContent);

    // Add the child comments
    //this.model.comments.each(function (comment) {
    //  that.renderCommentView(comment);
    //});

    // Add the Votes view
    this.renderVotes();
  },

  updateAnswer: function (event) {
    var that = this;
    event.preventDefault();
    var payload = $(event.target).serializeJSON();

    this.model.save(payload.answer, {
      wait: true,
      error: function (model, errors) {
        $("div.errors").html("");
        errors.responseJSON.forEach(function (error) {
          $("div.errors").append('<div class="alert">' + error + '</div>');
        });
      },
      success: function (model) {
        that.render(); //WARNING!!
      }
    })
  },

  cancel: function () {
    this.render();
  },

  renderVotes: function () {
    var votesView = new ProHotlineApp.Views.VotesDisplay({
      model: this.model,
      modelType: "Answer"
    });
    this.subviews.push(votesView);

    var dom = this.$("div.answer-votes");
    votesView.setElement(dom).render();
  },

  addNewCommentView: function () {
    var newCommentView = new ProHotlineApp.Views.CommentNew({
      model: this.model,
      modelType: "Answer"
    });
    this.subviews.push(newCommentView);

    var dom = this.$("div.new-comment");
    newCommentView.setElement(dom).displayButton();
  },

  renderCommentView: function (comment) {
    var commentView = new ProHotlineApp.Views.CommentDisplay({
      model: comment
    });
    this.subviews.push(commentView);

    var dom = this.$(".comments");
    dom.append(commentView.render().$el);
  },

  deleteAnswer: function () {
    if (confirm("Are you sure you want to delete this answer?")) {
      var that = this;
      this.model.destroy({
        error: function (model, errors) {
          alert(errors.responseText);
        },
        success: function (obj) {
          that.remove();
        }
      });
    }
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
