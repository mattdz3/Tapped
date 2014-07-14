"use strict";

var MainView = Parse.View.extend({

	template: _.template($('.main-view-temp').text()),

	events: {
		"click .main-signout"       : "signout",
	},

	initialize: function() {
		$('.main-container').append(this.el)
		$('.add-beer-container').hide();

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

