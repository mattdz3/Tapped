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
		user.set("username", $('.username').val())
		user.set("password", $('.password').val())
		user.set("score", 10)

		user.signUp(null, {
			success: function(user) {
				var currentUser = Parse.User.current();
				if (currentUser) {
					router.navigate('home', {trigger: true});
					console.log(currentUser)
				} else {
					console.log("did not sign up")
				}
			},
			error: function(user, error) {
				alert("Error" + error.code + " " + error.message);
			}	
		})
	},

})