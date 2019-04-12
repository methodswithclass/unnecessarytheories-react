
import * as $http from "./api.ws.service";
import * as u from "./utility.service";

var $ = u.jquery();


var files = [];
var blogs = [];

var clean = function (string) {

		return string.replace(/[‘’]/g, "\'").replace(/[“”]/g, "\'").replace(/(?!\.)(.)\1{2,}/g, "$1");
	}

var make = function (string) {

	var section = [];
	var blog = [];
	var array = string.split(/\n\n/);
	// console.log(string, array);
	var j = 0;
	var k = 0;
	var list = false;

	for (var i in array) {
		// console.log(array[i], array[i].match(/\./));
		if (array[i].match(/\./) && array[i].match(/\./).index == 0) {

			blog[k++] = section;

			section = [];
			j = 0;
		}
		else if (array[i] == "#") {
			list = !list;
		}
		else {
			section[j++] = {para:list ? "list" : "para", text:array[i]};
		}
	}

	blog[blog.length] = section;

	return blog;
}

export var process = function (url, complete) {

	console.log(url);

	// $http({url:url})
	// .then(function (response) {
	// 	var data = response.data;
	// 	var cleanData = clean(data);
	// 	files[files.length] = cleanData;
	// 	return cleanData;
	// })
	// .then(function (data) {
	// 	var blog = make(data);
	// 	blogs[blogs.length] = blog;
	// 	return blog;
	// })
	// .then(complete);

	$.ajax(url)
	.then(function (response) {
		var data = response;
		// console.log("data", response, data);
		var cleanData = clean(data);
		files[files.length] = cleanData;
		return cleanData;
	})
	.then(function (data) {
		var blog = make(data);
		blogs[blogs.length] = blog;
		return blog;
	})
	.then(complete);

}
