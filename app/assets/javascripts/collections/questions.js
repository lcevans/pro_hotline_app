ProHotlineApp.Collections.Questions = Backbone.Collection.extend({

	url: "/questions",

  model: ProHotlineApp.Models.Question,

  comparator: function (question) {
  	return -1 * question.viewCount;
  }

});
