ProHotlineApp.Views.QuestionDisplay = Backbone.View.extend({

  initialize: function () {
    var that = this;

    this.listenTo(this.model.comments, "add", function () {
      that.renderCommentView(that.model.comments.last());
    });
  },

  events: {
    "click .delete-question": "deleteQuestion",
    "click .edit-question": "editQuestion",
    "keydown #question_tag_input": "handleKey",
    "blur #question_tag_input": "addTag",
    "click #edit-tag-list .tag": "deleteTag",     
    "click button.cancel": "cancel",
    "submit #edit-question-form": "updateQuestion"
  },

  template: JST['questions/display'],
  editTemplate: JST['questions/edit_form'],

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

    var dom = this.$(".comments");
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

  // Edit/Delete//////////////////////////////////////////

  deleteQuestion: function () {
    if (confirm("Are you sure you want to delete this question?")) {
    this.model.destroy({
      error: function (model, errors) {
        alert("error deleting question");
      },
      success: function () {
        window.location = '/questions';
      }
    })
    }
  },

  editQuestion: function () {
    var that = this;

    // Clear the DOM
    this.$el.html("");
    this.removeSubviews();

    // Add the Edit Form
    renderedContent = this.editTemplate({
      question: this.model,
    });
    this.$el.append(renderedContent);

    // Render Tags
    this.renderTags();

    // Add the Votes view
    this.renderVotes();
  },

  updateQuestion: function (event) {
    var that = this;
    event.preventDefault();
    var payload = $(event.target).serializeJSON();

    this.model.save(payload.question, {
      wait: true,
      error: function (model, error) {
        $("div.errors").html("ERROR: ");
        $("div.errors").append(error.responseText);
      },
      success: function (model) {
        that.render(); //WARNING!!
      }
    })
  },

  handleKey: function (key) {
    if (key.which == 13 || key.which == 32) {
      this.addTag();
    }    
  },

  addTag: function () {
    var tagName = this.$("#question_tag_input").val()
    var formattedTagName = $.trim(tagName).replace("_"," ").toLowerCase();
    if (formattedTagName != "") {
      this.model.tags.add({name: formattedTagName});
      this.renderTags();
    }
    this.$("#question_tag_input").val("");
  },

  deleteTag: function (event) {
    var tagName = $(event.target).html();
    var modelToRemove = this.model.tags.findWhere({name: tagName});
    this.model.tags.remove(modelToRemove);
    this.renderTags();
  },

  renderTags: function () {
    this.$("#edit-tag-list").html("");
    this.model.tags.each(function (tag) {
      this.$("#edit-tag-list").append('<li class="tag label label-info">' + tag.get("name") + '</li>');
    });
  },

  cancel: function () {
    this.render();
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
