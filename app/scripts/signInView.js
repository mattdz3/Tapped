"use strict";



var SignInView = Parse.View.extend({

	template: _.template($('.sign-in-temp').text()),

	events: {
		"click .sign-in-button" : "renderWelcome",

	},

	initialize: function() {
		$('.new-views').append(this.el)		
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
	},

	renderWelcome: function() {

		var user = new Parse.User();

		Parse.User.logIn($('.email').val(), $('.password').val(), {
			success: function(user) {
				console.log("User has logged in!")
				
			},
			error: function(user, error) {
				alert("Error" + error.code + " " + error.message)
			}
		})
	},
})


