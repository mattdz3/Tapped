"use strict";

var beerObject;
var makeArray;
var setArray;
var newList;

var AddBeerView = Parse.View.extend({

	template: _.template($('.add-beer-temp').text()),

	events: {
		"click .add-beer-submit" : "addBeer",
		"input .searchField"     : "findBeer",
		"click .save-brewery"    : "findBrewery",
		"click .back-to-brew"    : "goBack",
	},

	initialize: function() {
		$('.new-views').append(this.el)
		$('.main-container').hide();
		$('.main-header').hide();
		$('.main-footer').hide();
		$('.main-sidebar').hide();
		$('.main-login').hide();
		$('.add-beer-container').show();
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	goBack: function() {
		$('.beer-style').slideUp("slow");
		$('#results').html('');
	},

	findBeer: function() {

		var lookFor = makeArray;

	    var form = document.getElementById("theForm");
	    var resultsDiv = document.getElementById("results");
	    var searchField = form.search;
	      
	    // attach the keyup handler to the search field
	    searchField.onkeyup = function() {
	        var txt = this.value.toLowerCase();
	        if ( txt.length == 0 ) return;

	        var txtRE = new RegExp( "(" + txt + ")", "ig" );
	        
	        // any matches?
	        var top = 0;
	        for ( var i = 0; i < lookFor.length; ++i ) {
	            var srch = lookFor[i];

	            if ( srch.toLowerCase().indexOf(txt) >= 0 ) {
	                srch = srch.replace( txtRE, "<span>$1</span>" );
	                var div = document.createElement("div");
	                div.innerHTML = srch;

	                div.onclick = function() {
	                    searchField.value = this.innerHTML.replace(/\<\/?span\>/ig,"");
	                    resultsDiv.style.display = "none";
	                };
	                
	                div.style.top = top + "px";
	                top += 28;
	                resultsDiv.appendChild(div);
	                resultsDiv.style.display = "block";
	            }
	        }
	    };
	      // keydown handler
	    searchField.onkeydown = function() {
	        while ( resultsDiv.firstChild != null ) {
	            resultsDiv.removeChild( resultsDiv.firstChild );
	        }
	        
	        resultsDiv.style.display = "none";
	    }();
	},

	findBrewery: function() {
		$('.beer-style').slideDown("slow");

		var newBrewery = $("#search-brewery").val();
		newList = $.get('http://0.0.0.0:3000/api/search?q=' + newBrewery + '&type=beer').done(function(beers) {
			
			setArray = beers.data;
			makeArray = _.pluck(setArray, "name")
			console.log(makeArray);

			console.log(setArray);

		});
	},

	addBeer: function() {
		$('.beer-style').slideUp("slow");

		var newBeer = $('.searchField').val();

		

		var newBeerObject = _.findWhere(setArray, {name: newBeer})
		console.log(newBeerObject)

		beerObject.set("beers", newBeerObject);
		beerObject.save(null, {		
			success: function(beer) {
				console.log("added a beer! Yeah!")
			},
			error: function(beer, error) {
				console.log("fail, sad face...")
			}
		}).done(function() {
			Parse.User.current().relation("beers").add(beerObject);
			Parse.User.current().save(null, {
				success: function() {
					console.log("saved a beer to current user")
				},
				error: function() {
					console.log("failed to save a beer to a user")
				}
			}).done(function() {
				console.log(currentPlace)
				currentPlace.relation("beers").add(beerObject);
				currentPlace.save(null, {
					success: function() {
						console.log("beer saved to place")
					},
					error: function() {
						console.log("failed to saved beer to place")
					}
				})
			})
		})
	},
})


