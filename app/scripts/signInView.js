"use strict";

var SignInView = Parse.View.extend({

	template: _.template($('.sign-in-temp').text()),

	events: {
		"click .sign-in-button" : "renderWelcome",
		"click .sign-up-button" : "renderSignUp"

	},

	initialize: function() {
		$('.new-views').append(this.el)
		this.render();		
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
	},

	renderSignUp: function() {
		this.remove();
		var signUpView = new SignUpView();
	},

	renderWelcome: function() {

		var user = new Parse.User();

		Parse.User.logIn($('.email').val(), $('.password').val(), {
			success: function(user) {
				console.log("I work!")
				
			},
			error: function(user, error) {
				alert("Error" + error.code + " " + error.message)
			}
		})
		this.remove();
		var welcomeView = new MainView();
	},
})

var signIn = new SignInView();