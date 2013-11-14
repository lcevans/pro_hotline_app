ProHotlineApp.Models.Tag = Backbone.Model.extend({
	urlRoot: "/tags",

	constructor: function() {
    this.questions = new ProHotlineApp.Collections.Questions();
    //this.users = new ProHotlineApp.Collections.Users();    
    Backbone.Model.apply(this, arguments);
  },

	parse: function (attributes) {
		this.questions.reset(attributes.questions, {parse: true});
		delete attributes.questions;
		//this.users.reset(attributes.users, {parse: true});
		//delete attributes.users;
	  this.userIds = attributes.userIds;
		delete attributes.userIds;

		return attributes;
	},

});
