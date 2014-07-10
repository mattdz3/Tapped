"use strict";

var currentLocation;

var SidebarView = Parse.View.extend({
	
	template: _.template($('.sidebar-temp').text()),

	events: {
		"click .beer-locations" : "setPlace",
	},

	initialize: function() {
		$('.main-sidebar').html('')
		$('.main-sidebar').append(this.el)

		this.places = new PlaceCollection();

		this.places.fetch({
			success: function(locations) {
				locations.forEach(function(place) {
					var li = '<li class="beer-locations">' + place.attributes.place + '</li>'
			    	$('.main-sidebar').append(li)
			    	console.log(place.id)
				});
			},
			error: function(collection, error) {
				console.log("error");
			}

		}).done(function(places){
			$('.beer-locations').click(function(){
				console.log(places)
				var location = ($(this).text())
				router.navigate('#/home/' + location, {trigger: true})
			})
		});
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	setPlace: function() {
		console.log(this.place.id)
	},
})