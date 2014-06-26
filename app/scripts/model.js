"use strict";

//Models

var Place = Parse.Object.extend('place');

var Beer = Parse.Object.extend('beer');

var User = Parse.Object.extend('user');


//Collections

var PlaceCollection = Parse.Collection.extend({
	model: place
});

var BeerCollection = Parse.Collection.extend({
	model: beer
});

var UserCollection = Parse.Collection.extend({
	model: user
});