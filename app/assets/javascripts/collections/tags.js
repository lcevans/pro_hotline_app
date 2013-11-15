ProHotlineApp.Collections.Tags = Backbone.Collection.extend({

	url: "/tags",

  model: ProHotlineApp.Models.Tag,

  comparator: function (tag) {
  	return tag.get("name");
  }

});
