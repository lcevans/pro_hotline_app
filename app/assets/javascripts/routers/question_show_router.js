ProHotlineApp.Routers.QuestionShow = Backbone.Router.extend({

	initialize: function ($questionEl, $answersEl) {
		var that = this;
		this.$questionEl = $questionEl;
		this.$answersEl = $answersEl;
		
    this.listenTo(ProHotlineApp.question.answers, "add", function () {
    	that.renderAnswerView(ProHotlineApp.question.answers.last());
    });

    //this.listenTo(ProHotlineApp.question.comments, "add", function () {
      //alert("yoyo ma");
      //that.renderCommentView(ProHotlineApp.question.comments.last());
    //});
	},

	routes: {
		"": "display",
		//":id": "jumpToAnswer"
	},

	//jumpToAnswer: function (answerId) {
	//	this.display();
  //  window.location.hash = ("answer-id-" + answerId); 
  //  window.location.hash = (""); 
	//},

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
  		that.renderAnswerView(answer);
  	});
	},

	renderAnswerView: function (answer) {
		var answerView = new ProHotlineApp.Views.AnswerDisplay({
			model: answer
		});
		this.$answersEl.append(answerView.render().$el);
	}

});
