ProHotlineApp.Collections.Comments = Backbone.Collection.extend({

  model: ProHotlineApp.Models.Comment,

  comparator: function (comment) {
  	var age = new Date() - new Date (comment.get("created_at"));
  	console.log(comment.get("body"));
  	console.log(age);
  	return -1 * age;
  }
});
