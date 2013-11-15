ProHotlineApp.Routers.QuestionShow = Backbone.Router.extend({

	initialize: function ($questionEl, $answerCountEl, $answersEl) {
		var that = this;
		this.$questionEl = $questionEl;
		this.$answerCountEl = $answerCountEl;
		this.$answersEl = $answersEl;
		
    this.listenTo(ProHotlineApp.question.answers, "add", function () {
    	that.renderAnswerView(ProHotlineApp.question.answers.last());
    	that.renderAnswerCount();
    });
	},

	routes: {
		"": "display",
		//":id": "jumpToAnswer"
	},

	jumpToAnswer: function (answerId) {
		this.display(function () {

			//location.hash = (answerId);
			alert("jump"); 
		});
	},

	display: function (callback) {
		var that = this;

		// Clear DOMs
		this.$questionEl.html("");
		this.$answersEl.html("");

		// Display the Question
		var questionView = new ProHotlineApp.Views.QuestionDisplay({
			model: ProHotlineApp.question
		});
		this.$questionEl.html(questionView.render().$el);

		// Display the Answer count
		this.renderAnswerCount();

		// Display its child Answers
  	ProHotlineApp.question.answers.each(function (answer) {
  		that.renderAnswerView(answer);
  	});

  	if (callback) { callback(); }
	},

	renderAnswerView: function (answer) {
		var answerView = new ProHotlineApp.Views.AnswerDisplay({
			model: answer
		});
		this.$answersEl.append(answerView.render().$el);
	},

	renderAnswerCount: function () {
		var answerCount = ProHotlineApp.question.answers.length;
		this.$answerCountEl.html("<h2>" + answerCount + " " + 
			                         owl.pluralize("Answer", answerCount) + "</h2>");
	}

});
