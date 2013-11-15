ProHotlineApp.Collections.Answers = Backbone.Collection.extend({

  model: ProHotlineApp.Models.Answer,

  comparator: function (answer) {
  	var rank = answer.voteCount(); 
  	if (answer.isBest) { rank += 30; }
  	return -1 * rank;
  }


});
