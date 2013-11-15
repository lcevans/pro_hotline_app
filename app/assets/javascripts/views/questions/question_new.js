ProHotlineApp.Views.QuestionNew = Backbone.View.extend({

  template: JST['questions/form'],

  events: {
    "keydown #question_tag_input": "handleKey",
    "blur #question_tag_input": "addTag",
    "click .tag": "deleteTag",       
  	"submit #new-question-form": "createQuestion",

  },


  render: function () {
    var that = this;

    // Add the answer form
    renderedContent = this.template({
      question: this.model
    });
    this.$el.html(renderedContent);

    return this
  },

  createQuestion: function (event) {
    var that = this;
  	event.preventDefault();
  	var payload = $(event.target).serializeJSON();

    this.model.tags = this.collection;

  	this.model.save(payload.question, {
      wait: true,
  		error: function (model, errors) {
        $("div.errors").html("");
        errors.responseJSON.forEach(function (error) {
          $("div.errors").append('<div class="alert">' + error + '</div>');
        });
  		},
  		success: function (model) {
        window.location = '/questions/' + model.id;
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
    var formattedTagName = $.trim(tagName).replace(/_/g," ").toLowerCase();
    if (formattedTagName != "") {
      this.collection.add({name: formattedTagName});
      this.renderTags();
    }
    this.$("#question_tag_input").val("");
  },

  deleteTag: function (event) {
    var tagName = $(event.target).html();
    var modelToRemove = this.collection.findWhere({name: tagName});
    this.collection.remove(modelToRemove);
    this.renderTags();
  },

  renderTags: function () {
    this.$("#tag-list").html("");
    this.collection.each(function (tag) {
      this.$("#tag-list").append('<li class="tag label label-info">' + tag.get("name") + '</li>');
    });
  }

});
