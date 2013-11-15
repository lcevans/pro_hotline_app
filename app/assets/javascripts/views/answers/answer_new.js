ProHotlineApp.Views.AnswerNew = Backbone.View.extend({

  template: JST['answers/form'],

  events: {
  	"submit #new-answer-form": "createAnswer",
    "click button.new-answer": "displayForm",
    "click button.cancel": "displayButton"
  },

  displayButton: function () {
  	this.$el.html('<button class="new-answer btn btn-info">New Answer</button>');

  	return this
  },

  displayForm: function () {
    var that = this;

    // Add the answer form
    renderedContent = this.template();
    this.$el.html(renderedContent);

    return this
  },

  createAnswer: function (event) {
    var that = this;
  	event.preventDefault();
  	var payload = $(event.target).serializeJSON();
  	payload.answer.author_id = ProHotlineApp.currentUserId
    payload.answer.question_id = this.model.id;

  	this.model.answers.create(payload.answer, {
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
