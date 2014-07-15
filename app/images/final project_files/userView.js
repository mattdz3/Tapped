"use strict";

var UserView = Parse.View.extend({

	template: _.template($('.user-view-temp').text()),

	events: {
		
	},

	initialize: function() {
		$('.user-view').append(this.el)
		$('.main-container').hide();
		$('.main-header').hide();
		$('.main-footer').hide();
		$('.main-sidebar').hide();
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp); 
		return this;
	},

})