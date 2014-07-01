"use strict";

var UserView = Parse.View.extend({

	template: _.template($('.user-view-temp').text()),

	events: {
		"click .user-home-button" : "renderHome",
	},

	initialize: function() {
		$('.new-views').append(this.el)
		// this.render();
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp); 
		return this;
	},

	renderHome: function() {
		this.remove();

		var welcomeView = new MainView();
	}
})