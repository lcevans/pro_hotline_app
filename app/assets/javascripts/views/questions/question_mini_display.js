ProHotlineApp.Views.QuestionMiniDisplay = Backbone.View.extend({

  template: JST['questions/mini_display'],

  render: function () {
  	var that = this;

  	// Wipe the DOM clean
  	this.$el.html("");

  	// Add the question itself
  	renderedContent = this.template({
  		question: this.model,
      answered: that.model.answers.some(function (answer) {
        return (answer.id == that.model.get("best_answer_id"));
      })
  	});
  	this.$el.html(renderedContent);

  	return this;
  },


});
