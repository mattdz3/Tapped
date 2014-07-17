"use strict";

var location;

var AppRouter = Parse.Router.extend({

	routes: {
		''				 : "logIn",
		"login"          : "logIn",
		"signup"         : "signUp",
		"home"           : "home",
		"home/:id"       : "location",
		"add"            : "addBeer",
		"user"           : "users",
		"*actions"       : "default",
	},

	initialize: function(options) {
		this.currentView = null;

		var query = new Parse.Query(Place);
		

		query.find({
			success: function(places) {
				places.forEach(function(place) {
					new SidebarView({model: place});
				})
			},

			error: function(places, error) {
				console.log("did not get locations")
			}
		});
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
		$('.main-header-container').html('')
		$('.main-container').hide();
		$('.main-header-container').show();
		$('.main-header').show();
		$('.main-footer').show();
		$('.main-sidebar').show();
		$('.main-login').show();

		var user = Parse.User.current();
		if(!user) {
			this.TologIn();
		} else {
			var view = new MainView({model: Parse.User.current().attributes});
			
			this.swap(view);
		}

	},

	location: function(id) {
		$('.main-header-container').html('')
		new MainView({model: Parse.User.current().attributes})
		
		$('.add-beer-header').hide();
		$('.add-beer-container').hide();
		$('.add-beer-footer').hide();
		$('.add-beer-info').hide();
		$('.intro').html('');
		$('.main-contents').show();
		$('.main-user').show();
		$('.main-username').show();
		$('.beer-button').show();
		$('.main-view-container').show();
		$('.main-login').show();
		$('.selected-place').show();

		var that = this;

		var user = Parse.User.current();
		if(!user) {
			this.TologIn();
		} else {
			
			var query = new Parse.Query(Place);
			query.equalTo("objectId", id);
			query.find({
				success: function(results) {
					var beerQuery = results[0].relation('beers').query();
					beerQuery.include('parent');
					beerQuery.find().done(function(tapList) {
						$('.main-container').html('');
						tapList.forEach(function(onTap) {
						
							new LocationView({
								beerModel: onTap,
								userModel: user
							})
						})
					})						
				},

				error: function(objectId, error) {
					console.log('failed router')
				}
			})
		}


	},

	addBeer: function(id) {
		
		var user = Parse.User.current();
		if(!user) {
			this.TologIn();
		} else {
			var view = new AddBeerView({model: Parse.User.current().attributes});
			this.swap(view);
		}
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
