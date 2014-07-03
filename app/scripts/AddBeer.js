"use strict";

var newArray;

var AddBeerView = Parse.View.extend({

	template: _.template($('.add-beer-temp').text()),

	events: {
		"click .add-beer-submit" : "addBeer",
		"input .searchField"     : "findBeer",
		"click .save-brewery"    : "findBrewery"
	},

	initialize: function() {
		$('.new-views').append(this.el)
	},

	render: function() {
		var renderTemp = this.template(this.model)
		this.$el.html(renderTemp);
		return this;
	},

	addBeer: function() {


	},

	findBeer: function() {

		var lookFor = [
		"mexican cake",
		"matt rules",
		];

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
	                top += 20;
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
		var newBrewery = $("#search-brewery").val();
		var newList = $.get('http://0.0.0.0:3000/api/search?q=' + newBrewery + '&type=beer').done(function(beer){
			console.log(beer.data);
			var setArray = beer.data;

			var array = [];
			






			// array.push(setArray.name[i])
			

			// findBrewery((setArray.name).toArray())


			
			// var newArray = $.toArray(setarray.name);
			// console.log(newArray);
		});	
	},
})

