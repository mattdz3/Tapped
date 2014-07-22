"use strict";

var currentUser;

var SignInView = Parse.View.extend({

	template: _.template($('.sign-in-temp').text()),

	events: {
		"click .sign-in-button" : "userSignIn",
	},

	initialize: function() {
		$('.new-views').append(this.el)
		$('.main-container').hide();
		$('.main-header').hide();
		$('.main-login').hide();
		$('.main-footer').hide();
		$('.main-sidebar').hide();
		$('.main-signout').hide();
		$('.add-beer-container').hide();
		$('.main-header-container').hide();

	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
	},

	userSignIn: function() {

		var user = new Parse.User();

		Parse.User.logIn($('.username').val(), $('.password').val(), {
			success: function(user) {

				currentUser = Parse.User.current();
				router.navigate('home', {trigger: true});
				$('.main-header').show();
				$('.main-login').show();
				$('.main-footer').show();
				$('.main-sidebar').show();
				$('.add-beer-container').show();
				$('.main-header-container').show();

			},

			error: function(user, error) {
				alert("Error" + error.code + " " + error.message)
			}
		})	
	},
})


