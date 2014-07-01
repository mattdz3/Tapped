"use strict";

var MainView = Parse.View.extend({

	template: _.template($('.main-view-temp').text()),

	events: {
		"click .main-delete-button" : "deleteBeer",
	},

	initialize: function() {
		$('.render-main-view').append(this.el)

	// 	var placeCollection = new PlaceCollection();

	// 	placeCollection.fetch({add: true}).done(function() {
	// 		placeCollection.each(function(placeModel) {
	// 			new PlaceView({model: placeModel});
	// 		})
	// 	})
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



