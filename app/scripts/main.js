"use strict";

Parse.initialize("ydeAeqU5zqST1JSp3SnmRnB8u6FmMsf2upM4GzWn", "D8QYFvztU3R2E9uZSaKzby7ZXpJGSHJ2skfECzmC");


var router = new AppRouter();
Parse.history.start();

placeObj = new Place();
beerObj = new Beer();
userObj = new User();

var placeCollection = new PlaceCollection();
// var beerCollection = new BeerCollection();
// var userCollection = new UserCollection();

// placeCollection.fetch({add: true}).done(function() {
// 	placeCollection.each(function(placeModel) {
// 		new placeView = ({model: placeModel})
// 	})
// })


var barleys = new Parse.GeoPoint({ latitude: 34.850808, longitude: -82.399283 });

var communityTap = new Parse.GeoPoint({ latitude: 34.862134, longitude: -82.385456 });

var gvilleBeerEx = new Parse.GeoPoint({ latitude: 34.850597, longitude: -82.399983 })

placeObj.set("location", barleys); 
placeObj.set("location", communityTap);
placeObj.set("location", gvilleBeerEx);