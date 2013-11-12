ProHotlineApp.Routers.QuestionsIndex = Backbone.Router.extend({

	initialize: function ($questionsEl) {
		var that = this;
		this.$questionsEl = $questionsEl;
	},

	routes: {
		"": "display"
	},

	display: function () {
		var that = this;

		// Clear DOM
		this.$questionsEl.html("");

		// Display the Questions
  	ProHotlineApp.questions.each(function (question) {
  		that.renderQuestionMiniView(question);
  	});
	},

	renderQuestionMiniView: function (question) {

		var questionView = new ProHotlineApp.Views.QuestionMiniDisplay({
			model: question,
		});
		this.$questionsEl.append(questionView.render().$el);
	}

});
