"use strict";

//Models

var Place = Parse.Object.extend('place');

var Beer = Parse.Object.extend('beer');

var User = Parse.Object.extend('user');


//Collections

var PlaceCollection = Parse.Collection.extend({
	model: Place
});

var BeerCollection = Parse.Collection.extend({
	model: Beer
});

var UserCollection = Parse.Collection.extend({
	model: User
});