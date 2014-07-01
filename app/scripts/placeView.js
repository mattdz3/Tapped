"use strict";

var PlaceView = Parse.View.extend({

	template: _.template($('.place-view-temp').text()),

	events: {

	},

	initialize: function() {
		$('.render-location-view').append(this.el)
		// this.render();
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp)
		return this;
	},
})