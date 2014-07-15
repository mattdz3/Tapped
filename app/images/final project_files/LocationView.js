"use strict";

var LocationView = Parse.View.extend({
	
	template: _.template($('.render-location-temp').text()),

	events: {
		"click .main-delete-button" : "deleteBeer",
		"click .main-signout"       : "signout",
		"click .up-arrow"           : "upVote",
		"click .down-arrow"         : "downVote",
		"click .beer-button"        : "setPlace",
	},

	initialize: function() {
		$('.location-beer-list').append(this.el)
	},

	render: function() {
		var renderTemp = this.template(this.model)
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

	setPlace: function() {
		// beerObject = new Beer();
		// var setlocation = new Place();
		// setlocation.id = currentLocation;

		// beerObject.set("parent", setlocation)
		// console.log(beerObject)
	},
})