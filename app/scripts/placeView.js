"use strict";

var PlaceView = Parse.View.extend({

	template: _.template($('.place-view-temp').text()),

	className: "location-list",

	tagName: "li",

	events: {

	},

	initialize: function() {
		$('.render-location-view').append(this.el)
	},

	render: function() {
		var renderTemp = this.template(this.model.attributes)
		this.$el.html(renderTemp)
		return this;
	},
})