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

					$('.beer-locations').click(function() {
						var locationId = (place.id)
						router.navigate('#/home/' + locationId, {trigger: true})
					})
				})
			},
			error: function(places, error) {
				console.log("nope")
			}
		})
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
