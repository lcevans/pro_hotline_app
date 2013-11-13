ProHotlineApp.Views.Profile = Backbone.View.extend({

  template: JST['users/profile'],
  editTemplate: JST['users/edit_profile'],

  events: {
  	"click #edit-profile": "edit",
  	"submit": "updateProfile",
  	"click .cancel": "render"
  },

  render: function () {
    var that = this;

    // Clear the DOM
    this.$el.html("");

    // Add the profile
    renderedContent = this.template({
      user: this.model
    });
    this.$el.append(renderedContent);

    return this;
  },

  edit: function () {
    var that = this;

    // Clear the DOM
    this.$el.html("");

    // Add the profile
    renderedContent = this.editTemplate({
      user: this.model
    });
    this.$el.append(renderedContent);

    return this;
  },

  updateProfile: function (event) {
    var that = this;
    event.preventDefault();
    var payload = $(event.target).serializeJSON();

    this.model.save(payload.user, {
      wait: true,
      error: function (model, error) {
        $("div.errors").html("ERROR: ");
        $("div.errors").append(error.responseText);
      },
      success: function (model) {
        that.render();
      }
    })
  },

});
