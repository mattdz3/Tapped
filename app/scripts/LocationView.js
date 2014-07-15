"use strict";

var LocationView = Parse.View.extend({
	
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

		// this.beerModel.save();
		// this.userModel.save();

		$('.main-container').append(this.el)
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
		var userScore = currentUser;
		var score = currentUser.attributes.score;
		
		userScore.set("score", score + 1)

		userScore.save();
	},

	downVote: function() {
		var userScore = currentUser;
		var score = currentUser.attributes.score;
		
		userScore.set("score", score - 1)

		userScore.save();
	},

	deleteBeer: function() {
		var place = new Place();
		var beer = new Beer();

		place.relation("on-tap").remove(beer);
		place.save(null, {
			success: function() {
				console.log("deleted a beer")
			},
			error: function() {
				console.log("failed")
			}
		})
	},
})