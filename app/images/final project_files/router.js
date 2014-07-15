"use strict";

var location;

var AppRouter = Parse.Router.extend({

	routes: {
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
					new SidebarView({model: place});
				})
			},

			error: function(places, error) {
				console.log("did not get locations")
			}
		});
	},

	location: function(id) {

		var user = Parse.User.current();
		if(!user) {
			this.TologIn();
		} else {
			var view = new LocationView({model: Parse.User.current().attributes});
			this.swap(view);
		}

		var query = new Parse.Query(Place);
		query.equalTo("objectId", id);
		query.find({
			success: function(results) {
				// console.log(results)
				// var beersArray = results.beers
				// beersArray.forEach(function(beer){
				// 	new LocationView({model: beer})
				// })

				console.log('results[0] is', results[0])

				results[0].relation('beers').query().find().done(function(tapList) {
					console.log('tapList is', tapList);
					tapList.forEach(function(onTap) {
						new LocationView({model: beers})
					})
				})
										
			},

			error: function(objectId, error) {
				console.log('did not get id')
			}
		})

		var place = new Place();

		// place.relation('beers').query().find().done(function(tapList) {
		// 	tapList.forEach(function(onTap) {
		// 		new LocationView({model: beers})
		// 	})
		// })
		// place.save();

		

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
