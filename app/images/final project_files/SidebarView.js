"use strict";

var currentLocation;

var SidebarView = Parse.View.extend({

	className: "beer-locations",
	
	template: _.template($('.sidebar-temp').text()),

	events: {
		"click" : "findId",
	},

	initialize: function() {
		$('.main-sidebar').append(this.el)
		this.render();
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	findId: function() {
		beerObject = new Beer();
		var currentLocation = this.model.id
		console.log(currentLocation)
		router.navigate('#home/' + currentLocation, {trigger: true})

		var setlocation = new Place();
		setlocation.id = currentLocation;

		beerObject.set("parent", setlocation)
		console.log(beerObject)
	},
})