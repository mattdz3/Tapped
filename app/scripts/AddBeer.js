"use strict";

var AddBeerView = Parse.View.extend({

	template: _.template($('.add-beer-temp').text()),

	events: {

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


})