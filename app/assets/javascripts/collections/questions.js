ProHotlineApp.Collections.Questions = Backbone.Collection.extend({

	url: "/questions",

  model: ProHotlineApp.Models.Question,

  comparator: function (question) {
  	var age = new Date() - new Date (question.get("created_at"));
  	var ageInHours = age / 1000 / 60 / 60;
  	// A brand new post counts as 20 votes, then loses 5 votes per hour down to 0
  	var ageValue = Math.max(0, 20 - 5 * ageInHours);
  	var rank = question.voteCount() + (0.1 * question.viewCount) + ageValue; 
  	return -1 * rank;
  }

});
