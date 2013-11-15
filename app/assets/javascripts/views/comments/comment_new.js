ProHotlineApp.Views.CommentNew = Backbone.View.extend({

  initialize: function (options) {
    this.modelType = options.modelType
  },

  template: JST['comments/form'],

  events: {
  	"submit #new-comment-form": "createComment",
    "click button.new-answer": "displayForm",
    "click button.cancel": "displayButton"
  },

  displayButton: function () {
  	this.$el.html('<button class="new-answer btn">New Comment</button>');

  	return this
  },

  displayForm: function () {
    var that = this;

    // Add the answer form
    renderedContent = this.template();
    this.$el.html(renderedContent);

    return this
  },

  createComment: function (event) {
    var that = this;
  	event.preventDefault();
  	var payload = $(event.target).serializeJSON();
  	payload.comment.author_id = ProHotlineApp.currentUserId
    payload.comment.commentable_id = this.model.id;
    payload.comment.commentable_type = this.modelType;

  	this.model.comments.create(payload.comment, {
      wait: true,
  		error: function (model, errors) {
        $("div.errors").html("");
        errors.responseJSON.forEach(function (error) {
          $("div.errors").append('<div class="alert">' + error + '</div>');
        });
  		},
  		success: function (model) {
        that.displayButton();
  		}
  	})
  },

});
