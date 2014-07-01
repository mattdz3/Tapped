"use strict";

var SignUpView = Parse.View.extend({

	template: _.template($('.sign-up-temp').text()),

	events: {
		"click .sign-in-button" : "createUser",

	},

	initialize: function() {
		$('.new-views').append(this.el)
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	createUser: function() {
		var user = new Parse.User();
		user.set("username", $('.email').val())
		user.set("password", $('.password').val())

		user.signUp(null, {
			success: function(user) {
				console.log("good job!")
				
			},
			error: function(user, error) {
				alert("Error" + error.code + " " + error.message);
			}
			
		})
		this.remove();
		var userView = new UserView();
	},

})