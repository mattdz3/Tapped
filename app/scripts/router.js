"use strict";

var AppRouter = Parse.Router.extend({

	routes: {
		"login"          : "logIn",
		"signup"         : "signUp",
		"home"           : "home",
		"home/:location" : "location",
		"add"            : "addABeer",
		"user"           : "users",
		"*acitons"       : "default",
	},

	initialize: function(options) {
		this.currentView = null;
		this.places = new PlaceCollection();
		this.users = new UserCollection();
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
		$('.place-list').html('')

		var user = Parse.User.current();
		if(!user) {
			this.TologIn();
		} else {
			var view = new MainView({model: Parse.User.current().attributes});
			this.swap(view);
		}

		this.places.fetch({
			success: function(locations) {
				locations.forEach(function(place) {
					var li = '<li>' + place.attributes.place + '</li>'
			    	$('.place-list').append(li)
				});
			},
			error: function(collection, error) {
				console.log("error");
			}	
		});
	},

	location: function() {

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
