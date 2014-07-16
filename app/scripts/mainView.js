"use strict";

var MainView = Parse.View.extend({

	className: 'title',

	template: _.template($('.main-view-temp').text()),

	events: {
		"click .main-signout" : "signout",
	},

	initialize: function() {
		$('.main-header-container').append(this.el)
		this.render();
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

