"use strict";

var MainView = Parse.View.extend({

	template: _.template($.('.main-view').text()),

	events: {

	},

	initialize: function() {
		
		this.render();
	},

	render: function() {

		var renderTemp = this.template(this.model.attributes)
		this.$el.html(renderTemp);
		return this;
	},
})