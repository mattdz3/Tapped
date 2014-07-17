"use strict";

var LocationView = Parse.View.extend({
	
	className: "all-the-beers",

	template: _.template($('.render-location-temp').text()),

	events: {
		"click .main-delete-button" : "deleteBeer",
		"click .main-signout"       : "signout",
		"click .up-arrow"           : "upVote",
		"click .down-arrow"         : "downVote",
	},

	initialize: function(options) {

		this.beerModel = options.beerModel;
		this.userModel = options.userModel;

		$('.main-container').prepend(this.el);
		this.render();
	},

	render: function() {
		var renderTemp = this.template({
			beer: this.beerModel, 
			user: this.userModel,
		})

		this.$el.html(renderTemp);
		return this;
	},

	signout: function() {
		Parse.User.logOut();
	},

	upVote: function() {
		var userScore = Parse.User.current();
		var score = userScore.attributes.score;
		
		userScore.set("score", score + 1)

		userScore.save();
	},

	downVote: function() {
		var userScore = Parse.User.current();
		var score = userScore.attributes.score;
		
		userScore.set("score", score - 1)

		userScore.save();
	},

	deleteBeer: function() {
		// console.log(currentPlace)
		// currentPlace.relation("beers").remove(beerObject);
		// currentPlace.save(null, {
		// 	success: function() {
		// 		console.log("deleted a beer")
		// 	},
		// 	error: function() {
		// 		console.log("failed")
		// 	}
		// })
	},
})