"use strict";

var LocationView = Parse.View.extend({
	
	template: _.template($('.render-location-view').text()),

	events: {

	},

	initialize: function() {
		$('.main-container').append(this.el)
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},
})