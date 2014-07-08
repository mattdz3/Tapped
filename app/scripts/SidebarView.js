"use strict";

var SidebarView = Parse.View.extend({
	
	template: _.template($('.sidebar-temp').text()),

	events: {

	},

	initialize: function() {
		$('.main-sidebar').html('')
		$('.main-sidebar').append(this.el)

		this.places = new PlaceCollection();

		this.places.fetch({
			success: function(locations) {
				locations.forEach(function(place) {
					var li = '<li class="beer-location">' + place.attributes.place + '</li>'
			    	$('.main-sidebar').append(li)
			    	console.log(place.attributes.place)
				});
			},
			error: function(collection, error) {
				console.log("error");
			}	
		}).done(function(){
			$('.beer-location').click(function(){
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


})