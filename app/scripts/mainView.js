"use strict";

var MainView = Parse.View.extend({

	template: _.template($('.main-view-temp').text()),

	events: {
		"click .beer-button" : "addBeer",
		"click .main-delete-button" : "deleteBeer",
		"click .main-user" : "userView",
	},

	initialize: function() {
		$('.new-views').append(this.el)
		this.render();
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	addBeer: function() {
		this.remove();
		var createBeer = new AddBeerView();
	},

	deleteBeer: function() {
		this.model.destroy();
	},

	userView: function() {
		this.remove();

		var userView = new UserView();
	}
})