

var mongoose = require("mongoose");
// var db = require("../../api/db.js");

var userSchema = mongoose.Schema({
	firstName:String,
	lastName:String,
	phone:String,
	email:String,
	username:String,
	password:String,
	address:{
		line1:String,
		line2:String,
		apartment:String,
		country:String,
		city:String,
		state:String,
		zip:String
	}
})


var User = mongoose.model("User", userSchema);


module.exports = User;