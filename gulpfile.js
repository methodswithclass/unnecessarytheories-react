var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'),
path = require("path"),
shell = require("gulp-shell"),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
del = require('del'),
inject = require('gulp-inject'),
filter = require("gulp-filter"),
merge = require("merge-stream"),
mainBowerFiles = require("gulp-main-bower-files"),
nodemon = require('gulp-nodemon'),
livereload = require('gulp-livereload');
sass = require("gulp-sass"),
babel = require("gulp-babel"),
jsHint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
map = require('map-stream'),
// compiler = require('webpack'),
webpack = require("webpack-stream"),
sourcemaps = require("gulp-sourcemaps"),
karma = require("karma").Server;
jest = require("gulp-jest").default;

const config = require("./config.js");

var server;

if (config.watch) {
	server = require("./server.js");
}

const babelConfig = require("./babel.config.js");
const webpackConfig = require("./webpack.config.js").dev;
const webpackTestConfig = require("./webpack.config.js").test;

const myLintReporter = map(function (file, cb) {

	if (file.jshint.success) return cb(null, file);

	console.log('JSHINT fail in', file.path);

	file.jshint.results.forEach(function (result) {

		if (!result.error) return;

		const err = result.error
		console.log(`  line ${err.line}, col ${err.character}, code ${err.code}, ${err.reason}`);
	});

	return cb(null, file);
});


var gulpReporters = [
{
	index:0,
	name:"custom",
	reporter:myLintReporter
},
{
	index:1,
	name:"stylish",
	reporter:stylish
}
]


var minify = config.gulp.minify;
var shimFile = config.gulp.shimFile;
var mainScripts = config.gulp.mainScripts;
var vendorScripts = config.gulp.vendorScripts;
var miscSrc = config.gulp.miscSrc;
var htmlDest = config.gulp.htmlDest;
var sassStyles1 = config.gulp.sassStyles1;
var sassStyles2 = config.gulp.sassStyles2;
var cssStyles = config.gulp.cssStyles;
var jestSrc = config.gulp.jestSrc;



var testPre = function (done) {


	process.env.NODE_ENV = 'test';

	console.log("env test");

	done();
}

var scriptsPre = function (done) {

	process.env.NODE_ENV = "development";

	console.log("env development");

	done();
}



var injectJS = function () {


	var important = gulp.src([
													'dist/assets/js/vendor' + (!minify.vendor.full.make && minify.vendor.min.make && minify.vendor.min.inject ? ".min" : "") + '.js'
													],
													{
										read:false
								}
								);




	var standard = gulp.src([
													"dist/assets/js/main" + (!minify.main.full.make && minify.main.min.make && minify.main.min.inject ? ".min" : "") + ".js",
													'dist/assets/**/*.css'
													],
													{
										read:false
								});



	return gulp.src('src/index.html')
	.pipe(inject(important, {
										addRootSlash : true,
										transform : function ( filePath, file, i, length ) {

												var newPath = filePath.replace( 'dist/assets/', 'source/' );

												console.log('inject js script =', newPath);

												return '<script src="' + newPath + '"></script>';
										},
										starttag: '<!-- inject:head:{{ext}} -->'
								}
								)
	)
	.pipe(inject(standard, {
										addRootSlash : true,
										transform : function ( filePath, file, i, length ) {

												var newPath = filePath.replace( 'dist/assets/', 'source/' )

												if (filePath.indexOf("css") != -1) {
													console.log('inject css script =', newPath);
													return '<link rel="stylesheet" type="text/css" href="' + newPath + '">'
												}
												else {
													console.log('inject js script =', newPath);
													return '<script src="' + newPath + '"></script>';
												}

										}
							}
							)
	)
	.pipe(gulp.dest('dist'));

}

var lint = function () {


	var gulpReporter = gulpReporters.find(function (p) {

		return p.index == config.gulp.reporter;
	})

	console.log("reporter", gulpReporter.name)

	return gulp.src(mainScripts)
	.pipe(jsHint())
	.pipe(jsHint(gulpReporter.reporter, { verbose: true }))
}


var jestTemp = function () {

	return gulp.src(jestSrc)
	.pipe(webpack(webpackTestConfig))
	.pipe(gulp.dest("temp/test"))
}

var jestRun = function () {

	var jestConfig = {
			"preprocessorIgnorePatterns": [
				"<rootDir>/dist/",
				"<rootDir>/node_modules/"
			],
			"automock": false
	}

	return gulp.src([
									'./temp/test/**/*.js',
									])
	.pipe(jest(jestConfig));
}




var scripts = function() {

	return gulp.src(mainScripts)
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest("dist/assets/js"));

};

var tempVendor = function () {


	var shim = gulp.src(shimFile)
		.pipe(concat("shim.js"))
		.pipe(gulp.dest("temp/vendor"));

	var npmSrc = gulp.src(vendorScripts)
		.pipe(concat("npm.js"))
		.pipe(gulp.dest("temp/vendor"))


	return merge(shim, npmSrc);
}

var vendor = function () {


	var js = gulp.src([
										"temp/vendor/shim.js",
										"temp/vendor/**/*.js"
										])
	.pipe(concat("vendor.js"))

	if (minify.vendor.full.make) {
		js.pipe(gulp.dest("dist/assets/js"))
	}

	var jsMin;

	if (minify.vendor.min.make) {
		jsMin = js
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/assets/js"))
	}

	// var css = gulp.src("./bower.json")
	// .pipe(mainBowerFiles())
	// .pipe(filter("**/*.css"))
	// .pipe(concat("vendor.css"))
	// .pipe(gulp.dest("dist/assets/css"));


	// if (minify) {
	// 	return merge(js, jsMin, css);
	// }
	// else {
	// 	return merge(js, css);
	// }

	return minify.vendor.min.make ? jsMin : js;

};

var apiSass1 = function () {
	return gulp.src(sassStyles1)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest("temp/css"));
}


var apiSass2 = function () {
	return gulp.src(sassStyles2)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest("temp/css2"));
}


var styles = function() {


	// middleware.compileSass();


	var cssSrc = gulp.src(cssStyles)
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'));


	var css = cssSrc
	.pipe(concat("classes.css"))
	.pipe(gulp.dest('dist/assets/css'));

	return css;
};



var html = function () {

	return gulp.src('src/**/*.html')
	.pipe(gulp.dest(htmlDest))
};

var images = function() {
	return gulp.src('src/assets/img/**/*')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('dist/assets/img'));
};


var fonts = function () {

	var mainFonts = gulp.src("src/assets/fonts/**/*.*")
	.pipe(gulp.dest("dist/assets/fonts"))

	var vendorFonts = gulp.src("node_modules/@fortawesome/fontawesome-free/webfonts/*.*")
	.pipe(gulp.dest("dist/assets/webfonts"))

	return merge(mainFonts, vendorFonts);
};

var index = function () {

	return gulp.src([
		"./favicon.ico",
		"./src/index.html"
		]).pipe(gulp.dest("dist"));
}

var misc = function() {
	// return gulp.src(miscSrc)
	// .pipe(gulp.dest('dist/assets'));

	// return merge(miscSrc);

	if (typeof miscSrc === "function") {
		return miscSrc();
	}
	else if (miscSrc) {
		return gulp.src(miscSrc)
		.pipe(gulp.dest('dist/assets'));
	}
	else return new Promise(function (resolve) {
		resolve();
	})
};

var clean = function() {
	return del(['dist', "temp"]);
}


var serveFunc = function (done) {

	console.log("serve task");

	// livereload.listen({port:config.livereloadPort});

	var stream = nodemon({
		script: path.join(__dirname, "server.js"),
		ext:"js html css scss json",
		watch:["./src", "config.js", "./backend"]
	});


	stream.on("start", function () {

		done();
	})

	stream.on("restart", function () {

		setTimeout(function () {

			try {
				// livereload.reload();
			}
			catch (err) {
				console.log("cannot livreload at this time", err);
			}

			done();

		}, 2000);

	})

	// stream.on("exit", function (code) {
	// 	console.log("exit nodemon");
	// 	nodemon.emit('quit');
 //    	process.exit(code);
	// })

	stream.on('SIGINT', function () {
			console.log("ctrl+c nodemon");
			nodemon.emit('quit');
			process.exit(0);
	});

	stream.on("crash", function () {

		stream.emit('restart', 10);
	})

	return stream;

}


var serveFuncListen = function (done) {


	var listener = server.app.listen(server.port, function () {

		console.log("listening on port", listener.address().port);
	});


	done();

}


var watch = function () {
	livereload.listen({port:config.livereloadPort });
	return gulp.watch([
										"./src/**/*.*",
										"./backend/**/*.js",
										"!./src/app/**/*.test.js"
										], gulp.series("listen"));
}


var jestTask = gulp.series(jestTemp, jestRun);


var testRunner = function (done) {

	done();
}


// testRunner = gulp.series(testPre, jestTask);


var copy = gulp.parallel(index, images, fonts)
var compile = gulp.parallel(gulp.series(tempVendor, vendor), gulp.series(lint, scripts));
var stylesTask = gulp.series(apiSass1, styles);





var buildTask = gulp.series(clean, stylesTask, copy, misc, testRunner, scriptsPre, compile, injectJS);



var serveTask = gulp.series(buildTask, serveFunc);
var serveTaskListen = gulp.series(buildTask);
var serveWatch = gulp.series(serveTaskListen, serveFuncListen, watch);





gulp.task("build", buildTask);
gulp.task("serve", serveTask);
gulp.task("listen", serveTaskListen);
gulp.task("watch", serveWatch);
