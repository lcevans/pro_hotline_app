ProHotlineApp.Models.Tag = Backbone.Model.extend({
	urlRoot: "/tags",

	constructor: function() {
    this.questions = new ProHotlineApp.Collections.Questions();
    Backbone.Model.apply(this, arguments);
  },

	parse: function (attributes) {
		this.questions.reset(attributes.questions, {parse: true});
		delete attributes.questions;

		return attributes;
	},

});
