"use strict";

var MainView = Parse.View.extend({

	template: _.template($('.main-view-temp').text()),

	events: {
		"click .main-signout" : "signout",
	},

	initialize: function() {
		$('.main-header-container').append(this.el)
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	signout: function() {
		Parse.User.logOut();
	},
})

