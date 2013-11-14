ProHotlineApp.Views.TagDisplay = Backbone.View.extend({

  initialize: function(options){
    this.followed = options.followed;
  },

  template: JST['tags/display'],

  tagName: 'li class="tag-index-list-item"',

  events: {
    "click .follow": "follow",
    "click .unfollow": "unfollow",
  },

  render: function () {
  	var that = this;

  	// Wipe the DOM clean
  	this.$el.html("");

  	// Add the question itself
  	renderedContent = this.template({
  		tag: this.model,
      followed: this.followed,
  	});
  	this.$el.html(renderedContent);

  	return this;
  },

  follow: function () {
    var that = this;
    $.ajax({
      url: "/users/" + ProHotlineApp.currentUserId + "/add_tag",
      method: "POST",
      data: {tag_id: this.model.id},
      error: function () {
        alert("error");
      },
      success: function () {
        that.followed = true;
        that.render();
      },
    });
  },

  unfollow: function () {
    var that = this;
    $.ajax({
      url: "/users/" + ProHotlineApp.currentUserId + "/remove_tag",
      method: "DELETE",
      data: {tag_id: this.model.id},
      error: function () {
        alert("error");
      },
      success: function () {
        that.followed = false;
        that.render();
      },
    });
  },

});
