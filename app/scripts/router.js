"use strict";

var AppRouter = Parse.Router.extend({

	routes: {
		"login"          : "logIn",
		"signup"         : "signUp",
		"home"           : "home",
		"home/:id"       : "location",
		"add"            : "addABeer",
		"user"           : "users",
		"*actions"       : "default",
	},

	initialize: function(options) {
		this.currentView = null;
	},

	logIn: function() {
		var view = new SignInView();
		this.swap(view);
	},

	signUp: function() {
		var view = new SignUpView();
		this.swap(view);
	},

	home: function() {
		$('.main-container').show();
		$('.main-header').show();
		$('.main-footer').show();
		$('.main-sidebar').show();
		$('.main-sidebar').html('')
		new SidebarView();

		var user = Parse.User.current();
		if(!user) {
			this.TologIn();
		} else {
			var view = new MainView({model: Parse.User.current().attributes});
			this.swap(view);
		}

		var query = new Parse.Query(Place);

		query.find({
			success: function(places) {
				places.forEach(function(place) {
					var li = '<li class="beer-locations">' + place.attributes.place + '</li>'
					$(".select-location").append(li)
					console.log(places)
				})
				query.find({
					success: function(objectIds) {
						$('.beer-locations').click(function() {
							objectIds.forEach(function(objectId) {
								var locationId = (objectId.id)
								router.navigate('#home/' + locationId, {trigger: true})
							})	
						})				
					},

					error: function(objectId, error) {
						console.log('nope')
					}
				})
				
			},

			error: function(places, error) {
				console.log("nope")
			}
		});

		// var place = new Place();

		// place.relation('on-tap').query().find().done(function(tapList) {
		// 	tapList.forEach(function(onTap) {
		// 		var li = '<li class="beers-on-tap">' + onTap + "</li>"
		// 		$('.location-display').append(li)
		// 	})
		// })
	},

	location: function() {
		new LocationView();
		new SidebarView();

			var user = Parse.User.current();
		if(!user) {
			this.TologIn();
		} else {
			var view = new MainView({model: Parse.User.current().attributes});
			this.swap(view);
		}
	},

	addABeer: function() {
		var view = new AddBeerView();
		this.swap(view);
	},

	users: function() {
		var view = new UserView();
		this.swap(view);
	},

	default: function() {
		var view = new MainView();
		this.swap(view);
	},

	TologIn: function(){
  		router.navigate('logIn', {trigger: true});
  	},

	swap: function(view) {
		if (this.currentView) this.currentView.remove();
		this.currentView = view;
		this.currentView.render();
	},
})

var router = new AppRouter();
Parse.history.start();
