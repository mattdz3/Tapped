"use strict";

var MainView = Parse.View.extend({

	template: _.template($('.main-view-temp').text()),

	events: {
		"click .main-delete-button" : "deleteBeer",
	},

	initialize: function() {
		$('.new-views').append(this.el)

		
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	deleteBeer: function() {
		this.model.destroy();
	},

})



