ProHotlineApp.Routers.Question = Backbone.Router.extend({

	initialize: function ($questionEl, $answersEl) {
		this.$questionEl = $questionEl;
		this.$answersEl = $answersEl;
	},

	routes: {
		"": "display"
	},

	display: function () {
		var that = this;

		// Clear DOMs
		this.$questionEl.html("");
		this.$answersEl.html("");

		// Display the Question
		var questionView = new ProHotlineApp.Views.QuestionDisplay({
			model: ProHotlineApp.question
		});
		this.$questionEl.html(questionView.render().$el);

		// Display its child Answers
  	ProHotlineApp.question.answers.each(function (answer) {
  		var answerView = new ProHotlineApp.Views.AnswerDisplay({
  			model: answer
  		});
  		that.$answersEl.append(answerView.render().$el);
  	});

	}

});
