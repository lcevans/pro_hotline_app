ProHotlineApp.Views.QuestionMiniDisplay = Backbone.View.extend({

  template: JST['questions/mini_display'],

  render: function () {
  	var that = this;

  	// Wipe the DOM clean
  	this.$el.html("");

  	// Add the question itself
  	renderedContent = this.template({
  		question: this.model
  	});
  	this.$el.append(renderedContent);

  	return this;
  },


});
