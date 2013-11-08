ProHotlineApp.Views.AnswerForm = Backbone.View.extend({

  template: JST['answers/form'],

  events: {
  	"submit": "submit",
    "click button.cancel": "cancel"
  },

  render: function () {
    var that = this;

  	// Add the answer form
  	renderedContent = this.template();
  	this.$el.html(renderedContent);

  	return this
  },

  submit: function (event) {
  	event.preventDefault();
  	var payload = $(event.target).serializeJSON();
  	this.model.set(payload.answer);
  	var currentUserId = $("span#current-user").attr("data-id");
  	this.model.set({author_id: currentUserId});

  	this.model.save({}, {
  		error: function (model, error) {
  			$("div.errors").html("ERROR: ");
  			$("div.errors").append(error.responseText);
  		},
  		success: function (model) {
        // Update the answer collection!
  		}
  	})
  },

  cancel: function () {
    this.remove();
  }

});
