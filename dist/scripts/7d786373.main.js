"use strict";var beerObject;Parse.initialize("ydeAeqU5zqST1JSp3SnmRnB8u6FmMsf2upM4GzWn","D8QYFvztU3R2E9uZSaKzby7ZXpJGSHJ2skfECzmC");var Place=Parse.Object.extend("place"),Beer=Parse.Object.extend("beer"),User=Parse.Object.extend("User"),PlaceCollection=Parse.Collection.extend({model:Place}),BeerCollection=Parse.Collection.extend({model:Beer}),UserCollection=Parse.Collection.extend({model:User}),currentUser,SignInView=Parse.View.extend({template:_.template($(".sign-in-temp").text()),events:{"click .sign-in-button":"userSignIn"},initialize:function(){$(".new-views").append(this.el),$(".main-container").hide(),$(".main-header").hide(),$(".main-login").hide(),$(".main-footer").hide(),$(".main-sidebar").hide(),$(".main-signout").hide(),$(".add-beer-container").hide(),$(".main-header-container").hide()},render:function(){var a=this.template(this.model);this.$el.html(a)},userSignIn:function(){new Parse.User;Parse.User.logIn($(".username").val(),$(".password").val(),{success:function(){currentUser=Parse.User.current(),router.navigate("home",{trigger:!0}),$(".main-header").show(),$(".main-login").show(),$(".main-footer").show(),$(".main-sidebar").show(),$(".add-beer-container").show(),$(".main-header-container").show()},error:function(a,b){alert("Error"+b.code+" "+b.message)}})}}),SignUpView=Parse.View.extend({template:_.template($(".sign-up-temp").text()),events:{"click .sign-in-button":"createUser"},initialize:function(){$(".new-views").append(this.el),$(".main-container").hide(),$(".main-header").hide(),$(".main-footer").hide(),$(".main-sidebar").hide(),$(".add-beer-container").hide(),$(".main-header-container").hide()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},createUser:function(){var a=new Parse.User;a.set("username",$(".username").val()),a.set("password",$(".password").val()),a.set("score",10),a.signUp(null,{success:function(){var a=Parse.User.current();a?(router.navigate("home",{trigger:!0}),console.log(a)):console.log("did not sign up")},error:function(a,b){alert("Error"+b.code+" "+b.message)}})}}),MainView=Parse.View.extend({className:"title",template:_.template($(".main-view-temp").text()),events:{"click .main-signout":"signout"},initialize:function(){$(".main-signout").show(),$(".main-header-container").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},signout:function(){Parse.User.logOut()}}),currentPlace,currentLocation,SidebarView=Parse.View.extend({className:"beer-locations",template:_.template($(".sidebar-temp").text()),events:{click:"findId"},initialize:function(){$(".main-sidebar").append(this.el),this.render()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},findId:function(){beerObject=new Beer,currentPlace=this.model,currentLocation=this.model.id,router.navigate("#home/"+currentLocation,{trigger:!0});var a=new Place;a.id=currentLocation,beerObject.set("parent",a),Parse.User.current().set("parent",a)}}),LocationView=Parse.View.extend({className:"all-the-beers",template:_.template($(".render-location-temp").text()),events:{"click .main-delete-button":"deleteBeer","click .main-signout":"signout","click .up-arrow":"upVote","click .down-arrow":"downVote"},initialize:function(a){this.beerModel=a.beerModel,this.userModel=a.userModel,$(".main-container").show(),$(".main-header-container").show(),$(".main-view-header").show(),$(".main-header").show(),$(".main-footer").show(),$(".main-sidebar").show(),$(".main-login").show();var b=this.beerModel.get("parent").get("place");$(".selected-place").html(""),$(".selected-place").append(b),$(".main-container").prepend(this.el),this.render()},render:function(){var a=this.template({beer:this.beerModel,user:this.userModel});return this.$el.html(a),this},signout:function(){Parse.User.logOut()},upVote:function(){var a=Parse.User.current(),b=a.attributes.score;a.set("score",b+1),a.save()},downVote:function(){var a=Parse.User.current(),b=a.attributes.score;a.set("score",b-1),a.save()},deleteBeer:function(){}}),beerObject,makeArray,setArray,newList,AddBeerView=Parse.View.extend({template:_.template($(".add-beer-temp").text()),events:{"click .add-beer-submit":"addBeer","input .searchField":"findBeer","click .save-brewery":"findBrewery","click .back-to-brew":"goBack"},initialize:function(){$(".new-views").append(this.el),$(".main-container").hide(),$(".main-header-container").hide(),$(".main-view-header").hide(),$(".main-header").hide(),$(".main-footer").hide(),$(".main-sidebar").hide(),$(".main-login").hide(),$(".add-beer-container").show()},render:function(){var a=this.template(this.model);return this.$el.html(a),this},goBack:function(){$(".beer-style").slideUp("slow"),$("#results").html("")},findBeer:function(){var a=makeArray,b=document.getElementById("theForm"),c=document.getElementById("results"),d=b.search;d.onkeyup=function(){var b=this.value.toLowerCase();if(0!=b.length)for(var e=new RegExp("("+b+")","ig"),f=0,g=0;g<a.length;++g){var h=a[g];if(h.toLowerCase().indexOf(b)>=0){h=h.replace(e,"<span>$1</span>");var i=document.createElement("div");i.innerHTML=h,i.onclick=function(){d.value=this.innerHTML.replace(/\<\/?span\>/gi,""),c.style.display="none"},i.style.top=f+"px",f+=28,c.appendChild(i),c.style.display="block"}}},d.onkeydown=function(){for(;null!=c.firstChild;)c.removeChild(c.firstChild);c.style.display="none"}()},findBrewery:function(){$(".beer-style").slideDown("slow");var a=$("#search-brewery").val();newList=$.get("http://0.0.0.0:3000/api/search?q="+a+"&type=beer").done(function(a){setArray=a.data,makeArray=_.pluck(setArray,"name"),console.log(makeArray),console.log(setArray)})},addBeer:function(){var a=$(".searchField").val(),b=_.findWhere(setArray,{name:a});console.log(b),beerObject.set("beers",b),beerObject.save(null,{success:function(){console.log("added a beer! Yeah!")},error:function(){console.log("fail, sad face...")}}).done(function(){Parse.User.current().relation("beers").add(beerObject),Parse.User.current().save(null,{success:function(){console.log(beerObject)},error:function(){console.log("failed to save a beer to a user")}}).done(function(){console.log(currentPlace),currentPlace.relation("beers").add(beerObject),currentPlace.save(null,{success:function(){console.log("beer saved to place")},error:function(){console.log("failed to saved beer to place")}}).done(function(){router.navigate("#home/"+currentLocation,{trigger:!0})})})})}}),UserView=Parse.View.extend({template:_.template($(".user-view-temp").text()),events:{},initialize:function(){$(".user-view").append(this.el),$(".main-container").hide(),$(".main-header").hide(),$(".main-footer").hide(),$(".main-sidebar").hide()},render:function(){var a=this.template(this.model);return this.$el.html(a),this}}),location,AppRouter=Parse.Router.extend({routes:{"":"logIn",login:"logIn",signup:"signUp",home:"home","home/:id":"location",add:"addBeer",user:"users","*actions":"default"},initialize:function(){this.currentView=null;var a=new Parse.Query(Place);a.find({success:function(a){a.forEach(function(a){new SidebarView({model:a})})},error:function(){console.log("did not get locations")}})},logIn:function(){var a=new SignInView;this.swap(a)},signUp:function(){var a=new SignUpView;this.swap(a)},home:function(){$(".main-header-container").html(""),$(".main-container").hide(),$(".main-header-container").show(),$(".main-header").show(),$(".main-footer").show(),$(".main-sidebar").show(),$(".main-login").show();var a=Parse.User.current();if(a){var b=new MainView({model:Parse.User.current().attributes});this.swap(b)}else this.TologIn()},location:function(a){$(".main-header-container").html(""),new MainView({model:Parse.User.current().attributes}),$(".add-beer-header").hide(),$(".add-beer-container").hide(),$(".add-beer-footer").hide(),$(".add-beer-info").hide(),$(".intro").html(""),$(".main-contents").show(),$(".main-user").show(),$(".main-username").show(),$(".beer-button").show(),$(".main-view-container").show(),$(".main-login").show(),$(".selected-place").show();var b=Parse.User.current();if(b){var c=new Parse.Query(Place);c.equalTo("objectId",a),c.find({success:function(a){var c=a[0].relation("beers").query();c.include("parent"),c.find().done(function(a){$(".main-container").html(""),a.forEach(function(a){new LocationView({beerModel:a,userModel:b})})})},error:function(){console.log("failed router")}})}else this.TologIn()},addBeer:function(){var a=Parse.User.current();if(a){var b=new AddBeerView({model:Parse.User.current().attributes});this.swap(b)}else this.TologIn()},users:function(){var a=new UserView;this.swap(a)},"default":function(){var a=new MainView;this.swap(a)},TologIn:function(){router.navigate("logIn",{trigger:!0})},swap:function(a){this.currentView&&this.currentView.remove(),this.currentView=a,this.currentView.render()}}),router=new AppRouter;Parse.history.start();