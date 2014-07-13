"use strict";

var currentLocation;

var SidebarView = Parse.View.extend({

	tagName: "li",

	className: "beer-locations",
	
	template: _.template($('.sidebar-temp').text()),

	events: {
		"click .beer-locations" : "findId",
	},

	initialize: function() {
		$('.main-sidebar').append(this.el)
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	findId: function() {
		// query.find({
		// 	success: function(objectIds) {
		// 		$('.beer-locations').click(function() {

		// 			objectIds.forEach(function(objectId) {
		// 				console.log(objectId)
		// 				var locationId = (objectId.id)
		// 				router.navigate('#home/' + locationId, {trigger: true})
		// 			})	
		// 		})				
		// 	},

		// 	error: function(objectId, error) {
		// 		console.log('did not get id')
		// 	}
		// })
	},
})