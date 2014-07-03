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
		var view = new MainView();
		this.swap(view);

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

	swap: function(view) {
		if (this.currentView) this.currentView.remove();
		this.currentView = view;
		this.currentView.render();
	},
})

