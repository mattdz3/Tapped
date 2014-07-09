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
		$('.main-footer').hide();
		$('.main-sidebar').hide();
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
	},

	userSignIn: function() {

		var user = new Parse.User();

		Parse.User.logIn($('.username').val(), $('.password').val(), {
			success: function(user) {
				user.set("username", $('.username').val())
				user.set("password", $('.password').val())
				user.save(null, {
					success: function(user) {
						var query = new Parse.Query(Parse.User);
        				query.get(user.id, {
        					success: function() {
        						console.log("yeah user set!")
        					},
        					error: function() {
        						console.log("failed")
        					}
        				})
					},
					error: function(user, error) {
						console.log("nope")
					}
				})
				currentUser = Parse.User.current();
				var token = Parse.User.current()._sessionToken;
				if (currentUser) {

					Parse.User.become(currentUser._sessionToken).then(function(user) {
						Parse.User._saveCurrentUser(user);
			  			console.log(user.id)
					}, function (error) {
			  			console.log("user not set")
					});

					router.navigate('home', {trigger: true});
					console.log(currentUser, currentUser._sessionToken, currentUser.attributes.score)

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

// var user = Parse.User.logIn("my_username", "my_password", {
//   success: function(user) {
//     user.set("username", "my_new_username");  // attempt to change username
//     user.save(null, {
//       success: function(user) {
//         // This succeeds, since the user was authenticated on the device
 
//         // Get the user from a non-authenticated method
//         var query = new Parse.Query(Parse.User);
//         query.get(user.objectId, {
//           success: function(userAgain) {
//             userAgain.set("username", "another_username");
//             userAgain.save(null, {
//               error: function(userAgain, error) {
//                 // This will error, since the Parse.User is not authenticated
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// });

