"use strict";

var MainView = Parse.View.extend({

	template: _.template($('.main-view-temp').text()),

	events: {
		"click .main-delete-button" : "deleteBeer",
		"click .main-signout" : "signout",
	},

	initialize: function() {
		$('.new-views').append(this.el)

	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	deleteBeer: function() {
		this.model.destroy();
	},

	signout: function() {
		Parse.User.logOut();
		var currentUser = Parse.User.current();
		console.log("user logged out")
	},

})



