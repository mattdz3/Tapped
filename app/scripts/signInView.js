"use strict";

var SignInView = Parse.View.extend({

	template: _.template($('.sign-in-temp').text()),

	events: {
		"click .sign-in-button" : "userSignIn",
	},

	initialize: function() {
		$('.new-views').append(this.el)
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
				var token = Parse.User.current()._sessionToken;
				if (currentUser) {
					router.navigate('home', {trigger: true});
					console.log(currentUser, currentUser._sessionToken, currentUser.attributes.score)

					Parse.User.become(currentUser._sessionToken).then(function (user) {
			  			console.log("user set")
					}, function (error) {
			  			console.log("user not set")
					});

					console.log(currentUser.attributes.username)

				} else {
					console.log("what?")
				}
			},
			error: function(user, error) {
				alert("Error" + error.code + " " + error.message)
			}
		})	
	},
})

