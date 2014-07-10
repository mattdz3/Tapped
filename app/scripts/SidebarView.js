"use strict";

var currentLocation;

var SidebarView = Parse.View.extend({

	tagName: "ul",

	className: "select-location",
	
	template: _.template($('.sidebar-temp').text()),

	events: {
		"click .beer-locations" : "setPlace",
	},

	initialize: function() {
		$('.main-sidebar').append(this.el)
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	setPlace: function() {
		console.log(this.el)
	},
})