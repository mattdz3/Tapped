"use strict";

var PlaceView = Parse.View.extend({

	template: _.template($('.place-view-temp').text()),

	events: {

	},

	initialize: function() {
		$('.main-sidebar').append(this.el)
		this.render();
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp)
		return this;
	},
})