"use strict";

var UserView = Parse.View.extend({

	template: _.template($('.user-view-temp').text()),

	events: {
		
	},

	initialize: function() {
		$('.new-views').append(this.el)
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp); 
		return this;
	},

})