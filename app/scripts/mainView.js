"use strict";

var MainView = Parse.View.extend({

	template: _.template($('.main-view-temp').text()),

	events: {
		"click .main-delete-button" : "deleteBeer",
		"click .main-signout"       : "signout",
		"click .beer-location"      : "renderBeerLocation",
		"click .up-arrow"           : "upVote",
		"click .down-arrow"         : "downVote",
	},

	initialize: function() {
		$('.main-container').append(this.el)

	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	upVote: function() {
		console.log(currentUser.attributes.score)
	},

	downVote: function() {
		console.log(currentUser.attributes.score)
	},

	renderBeerLocation: function() {

	},

	deleteBeer: function() {
		this.model.destroy();
	},

	signout: function() {
		Parse.User.logOut();
	},
})