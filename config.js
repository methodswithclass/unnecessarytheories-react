
var gulp = require("gulp");
var merge = require("merge-stream");
var imagemin = require('gulp-imagemin');


var reporters = [
{
	index:0,
	name:"custom"
},
{
	index:1,
	name:"stylish"
}
]

var whichReporter = 1;

var htmlDest = "dist/";


var mainScripts = [
	"src/app/services/api.ws.service.js",
	"src/app/services/api.client.js",
	"src/app/services/api.http.service.js",
	"src/app/services/api.service.js",
	"src/app/**/*.js",
	"!src/app/**/*.test.js"
]


var sassStyles1 = [
	"src/assets/css/**/*.scss"
]

var sassStyles2 = [
	"src/assets/css/main.scss"
]


var cssStyles = [
	'temp/**/*.css',
	"node_modules/@fortawesome/fontawesome-free/css/all.css"
]


var shimFile = "node_modules/@babel/polyfill/dist/polyfill.js";


var vendorScripts = [
	//npm packages for front end use
	"node_modules/jquery/dist/jquery.js",
	"node_modules/jquery.scrollto/jquery.scrollTo.js",
	"node_modules/@methodswithclass/shared/dist/shared.js"
]


var miscSrc = [
	'src/assets/config/**/*.*'
]


// var minify = process.env.NODE_ENV == "production";

var minify = {
	main:{
		full:{
			make:true,
			inject:true
		},
		min:{
			make:false,
			inject:true
		}
	},
	vendor:{
		full:{
			make:true,
			inject:true
		},
		min:{
			make:false,
			inject:false
		}
	}
}




var livereloadPort = 3840;


module.exports = {
	gulp:{
		shimFile:shimFile,
		htmlDest:htmlDest,
		mainScripts:mainScripts,
		vendorScripts:vendorScripts,
		sassStyles1:sassStyles1,
		sassStyles2:sassStyles2,
		cssStyles:cssStyles,
		miscSrc:miscSrc,
		minify:minify,
		reporters:reporters,
		reporter:whichReporter
	},
	livereloadPort:livereloadPort
}



